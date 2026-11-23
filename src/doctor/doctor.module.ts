import { Module } from '@nestjs/common';
import { doctorController } from './doctor.controller.js';
import { DoctorService } from './doctor.service.js';

@Module({
  controllers: [doctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
