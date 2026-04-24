import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService }        from "@nestjs/jwt";
import * as bcrypt           from "bcrypt";
import { UserRepository }    from "../users/user.repository";
import { PatientRepository } from "../patients/patient.repository";
import { DoctorRepository }  from "../doctors/doctor.repository";
import { LoginDto }          from "./dto/login.dto";
import { RegisterDto }       from "./dto/register.dto";
import { Role }              from "../../common/enums/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo:    UserRepository,
    private readonly patientRepo: PatientRepository,
    private readonly doctorRepo:  DoctorRepository,
    private readonly jwtService:  JwtService,
  ) {}

  // ── Login ──────────────────────────────────────────────────────────────────

  async login(dto: LoginDto) {
    // 1. find user by email
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    // 2. check if account is active
    if (!user.isActive)
      throw new UnauthorizedException("Your account has been deactivated");

    // 3. compare password
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException("Invalid credentials");

    // 4. sign token
    const token = this.signToken(user.id, user.role);

    return {
      token,
      user: {
        id:    user.id,
        email: user.email,
        role:  user.role,
      },
    };
  }

  // ── Register ───────────────────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    // 1. check email uniqueness
    const exists = await this.userRepo.findByEmail(dto.email);
    if (exists) throw new ConflictException("Email already in use");

    // 2. split name into first + last
    const [firstName, ...rest] = dto.name.trim().split(" ");
    const lastName             = rest.join(" ") || firstName;

    // 3. hash password
    const hashed = await bcrypt.hash(dto.password, 10);

    // 4. create user
    const user = await this.userRepo.create({
      email:    dto.email,
      password: hashed,
      role:     dto.role as Role,
    });

    // 5. create role profile
    await this.createRoleProfile(user.id, firstName, lastName, dto.role as Role);

    // 6. sign token
    const token = this.signToken(user.id, user.role);

    return {
      token,
      user: {
        id:    user.id,
        email: user.email,
        role:  user.role,
      },
    };
  }

  // ── Get Me ─────────────────────────────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UnauthorizedException("User not found");

    // return profile based on role
    if (user.role === Role.PATIENT) {
      const patient = await this.patientRepo.findByUserId(userId);
      return { ...user, profile: patient };
    }

    if (user.role === Role.DOCTOR) {
      const doctor = await this.doctorRepo.findByUserId(userId);
      return { ...user, profile: doctor };
    }

    // admin — just return user, no extra profile
    return { ...user, profile: null };
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private signToken(userId: string, role: string): string {
    return this.jwtService.sign({
      sub:  userId,
      role,
    });
  }

  private async createRoleProfile(
    userId:    string,
    firstName: string,
    lastName:  string,
    role:      Role,
  ): Promise<void> {
    if (role === Role.PATIENT) {
      await this.patientRepo.create({
        firstName,
        lastName,
        user: { connect: { id: userId } },
      });
      return;
    }

    if (role === Role.DOCTOR) {
      await this.doctorRepo.create({
        firstName,
        lastName,
        specialty: "General Practice",  // default — updated via profile page
        user: { connect: { id: userId } },
      });
      return;
    }

  }
}