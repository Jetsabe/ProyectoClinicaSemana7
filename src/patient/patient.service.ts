import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreatePatientDto } from './dto/create-patient.dto.js'
import { UpdatePatientDto } from './dto/update-patient.dto.js'
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany()
  }

  findOne(id: number) { 
    return this.prisma.patient.findUniqueOrThrow({
      where: { id }
    })
  }

  async create(CreatePatientDto: CreatePatientDto) {
    const dateBirth = new Date (CreatePatientDto.dateBirth);
    const now = new Date();
if (dateBirth > now) {
      throw new BadRequestException('La fecha de nacimiento no puede ser una fecha futura');
    }

    return this.prisma.patient.create({
      data: {
        ...CreatePatientDto,
        dateBirth: dateBirth,
          },
    });
  }

  

  update(id: number, data: UpdatePatientDto) {
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
