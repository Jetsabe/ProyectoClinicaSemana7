import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany()
  }

  findOne(id: number) { 
    return this.prisma.patient.findUnique({
      where: { id }
    })
  }

  create(data: { name: string, dateBirth: Date, phone: string, email: string }) {
    return this.prisma.patient.create({ data });
  }

  update(id: number, data: { name?: string, phone?: string, email?:string, idSpecialty?: number }) {
    return this.prisma.doctor.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.doctor.delete({
      where: {id},
    });
  }
}
