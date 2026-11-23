import { Controller, Get } from '@nestjs/common'
import { DoctorService } from './doctor.service.js'

@Controller('doctor')
export class doctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll()
  }
}