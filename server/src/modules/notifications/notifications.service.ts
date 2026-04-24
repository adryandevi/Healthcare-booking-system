// src/modules/notifications/notification.service.ts
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService }                          from "../../config/prisma.service";
import { TEMPLATES }                             from "./notification.templates";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getByUser(userId: string) {
    return this.prisma.db.notification.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.db.notification.count({
      where: { userId, read: false },
    });
    return { count };
  }

  async markRead(id: string, userId: string) {
    const notification = await this.prisma.db.notification.findUnique({
      where: { id },
    });

    if (!notification)
      throw new NotFoundException("Notification not found");
    if (notification.userId !== userId)
      throw new NotFoundException("Notification not found");

    return this.prisma.db.notification.update({
      where: { id },
      data:  { read: true },
    });
  }

  async markAllRead(userId: string) {
    await this.prisma.db.notification.updateMany({
      where: { userId, read: false },
      data:  { read: true },
    });
    return { message: "All notifications marked as read" };
  }

  async sendAppointmentBooked(appointment: any) {
    const msg = TEMPLATES.APPOINTMENT_BOOKED(
      appointment.patient?.firstName ?? "Patient",
      new Date(appointment.date).toDateString(),
      appointment.time,
    );
    await this.save(appointment.patientId, msg, "appointment_booked");
    this.logger.log(`[BOOKED] ${msg}`);
  }

  async sendAppointmentConfirmed(appointment: any) {
    const msg = TEMPLATES.APPOINTMENT_CONFIRMED(
      appointment.patient?.firstName ?? "Patient",
      new Date(appointment.date).toDateString(),
      appointment.time,
    );
    await this.save(appointment.patientId, msg, "appointment_confirmed");
    this.logger.log(`[CONFIRMED] ${msg}`);
  }

  async sendAppointmentCancelled(appointment: any) {
    const msg = TEMPLATES.APPOINTMENT_CANCELLED(
      appointment.patient?.firstName ?? "Patient",
      appointment.cancelReason,
    );
    await this.save(appointment.patientId, msg, "appointment_cancelled");
    this.logger.log(`[CANCELLED] ${msg}`);
  }

  async sendAppointmentReminder(appointment: any) {
    const msg = TEMPLATES.APPOINTMENT_REMINDER(
      appointment.patient?.firstName ?? "Patient",
      new Date(appointment.date).toDateString(),
      appointment.time,
    );
    await this.save(appointment.patientId, msg, "appointment_reminder");
    this.logger.log(`[REMINDER] ${msg}`);
  }

  private async save(userId: string, message: string, type: string) {
    await this.prisma.db.notification.create({
      data: { userId, message, type },
    });
  }
}