import {
  BadRequestException, ForbiddenException,
  Injectable, NotFoundException,
} from "@nestjs/common";
import { AppointmentRepository }    from "./appointment.repository";
import { NotificationService }     from "../notifications/notifications.service";
import { CreateAppointmentDto }     from "./dto/create-appointment.dto";
import { RescheduleAppointmentDto } from "./dto/reschedule-appointment.dto";
import { CancelAppointmentDto }     from "./dto/cancel-appointment.dto";
import { FilterAppointmentDto }     from "./dto/filter-appointment.dto";
import { AppointmentStatus }        from "../../generated/prisma";

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepo: AppointmentRepository,
    private readonly notifications:   NotificationService,
  ) {}

  async book(patientId: string, dto: CreateAppointmentDto) {
    // check slot availability
    const conflict  = await this.appointmentRepo.findByDoctorAndDate(
      dto.doctorId, new Date(dto.date)
    );
    const slotTaken = conflict.some(
      (a) => a.time === dto.time && a.status !== AppointmentStatus.cancelled
    );
    if (slotTaken) throw new BadRequestException("This time slot is already taken");

    const appointment = await this.appointmentRepo.create({
      date:    new Date(dto.date),
      time:    dto.time,
      type:    dto.type,
      notes:   dto.notes,
      status:  AppointmentStatus.pending,
      patient: { connect: { id: patientId }    },
      doctor:  { connect: { id: dto.doctorId } },
    });

    await this.notifications.sendAppointmentBooked(appointment);
    return appointment;
  }

  async confirm(id: string, doctorId: string) {
    const appt = await this.findOrThrow(id);

    if (appt.doctorId !== doctorId)
      throw new ForbiddenException("You can only confirm your own appointments");
    if (appt.status !== AppointmentStatus.pending)
      throw new BadRequestException("Only pending appointments can be confirmed");

    await this.appointmentRepo.updateStatus(id, AppointmentStatus.confirmed);
    await this.notifications.sendAppointmentConfirmed(appt);
    return { message: "Appointment confirmed" };
  }

  async cancel(id: string, userId: string, dto: CancelAppointmentDto) {
    const appt    = await this.findOrThrow(id);
    const isOwner = appt.patientId === userId || appt.doctorId === userId;

    if (!isOwner)
      throw new ForbiddenException("You can only cancel your own appointments");
    if (appt.status === AppointmentStatus.completed)
      throw new BadRequestException("Cannot cancel a completed appointment");
    if (appt.status === AppointmentStatus.cancelled)
      throw new BadRequestException("Appointment is already cancelled");

    await this.appointmentRepo.updateStatus(id, AppointmentStatus.cancelled, dto.reason);
    await this.notifications.sendAppointmentCancelled(appt);
    return { message: "Appointment cancelled" };
  }

  async reschedule(id: string, patientId: string, dto: RescheduleAppointmentDto) {
    const appt = await this.findOrThrow(id);

    if (appt.patientId !== patientId)
      throw new ForbiddenException("You can only reschedule your own appointments");
    if (appt.status === AppointmentStatus.completed)
      throw new BadRequestException("Cannot reschedule a completed appointment");
    if (appt.status === AppointmentStatus.cancelled)
      throw new BadRequestException("Cannot reschedule a cancelled appointment");

    // check new slot availability
    const conflict  = await this.appointmentRepo.findByDoctorAndDate(
      appt.doctorId, new Date(dto.date)
    );
    const slotTaken = conflict.some(
      (a) => a.time === dto.time &&
             a.status !== AppointmentStatus.cancelled &&
             a.id !== id   // exclude current appointment
    );
    if (slotTaken) throw new BadRequestException("This time slot is already taken");

    await this.appointmentRepo.update(id, {
      date:   new Date(dto.date),
      time:   dto.time,
      status: AppointmentStatus.pending,  // resets to pending after reschedule
    });
    return { message: "Appointment rescheduled successfully" };
  }

  async forceConfirm(id: string) {
    const appt = await this.findOrThrow(id);
    if (appt.status === AppointmentStatus.completed)
      throw new BadRequestException("Cannot confirm a completed appointment");

    await this.appointmentRepo.updateStatus(id, AppointmentStatus.confirmed);
    return { message: "Appointment force confirmed by admin" };
  }

  async getByPatient(patientId: string, page = 1, limit = 10) {
    return this.appointmentRepo.findByPatient(patientId, page, limit);
  }

  async getByDoctor(doctorId: string, page = 1, limit = 10) {
    return this.appointmentRepo.findByDoctor(doctorId, page, limit);
  }

  async getAll(filters?: FilterAppointmentDto, page = 1, limit = 20) {
    return this.appointmentRepo.findAll(
      {
        status:    filters?.status,
        doctorId:  filters?.doctorId,
        patientId: filters?.patientId,
      },
      page,
      limit,
    );
  }

  async findById(id: string) {
    return this.findOrThrow(id);
  }

  private async findOrThrow(id: string) {
    const appt = await this.appointmentRepo.findById(id);
    if (!appt) throw new NotFoundException("Appointment not found");
    return appt;
  }
}