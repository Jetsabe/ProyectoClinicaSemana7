import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateDoctorDto } from './dto/create-doctor.dto.js'
import { UpdateDoctorDto } from './dto/update-doctor.dto.js'

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.doctor.findMany()
  }


findOne(id: number) { 
 return this.prisma.doctor.findUnique({
  where: { id }
 })
}

async create(data: CreateDoctorDto) {
   const doctor = await this.prisma.doctor.findUnique({
    where: {email: data.email},
    });
    if (doctor){
      throw new BadRequestException('Este correo ya existe en otro usuario');
    }
    return this.prisma.doctor.create({data})
}

update(id: number, data: UpdateDoctorDto) {
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