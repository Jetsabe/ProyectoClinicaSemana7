import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';

import { PrismaModule } from './prisma/prisma.module.js';
import { PatientModule } from './patient/patient.module.js';

import { DoctorModule } from './doctor/doctor.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'proyecto-semana7',
    }),
    PrismaModule,
    PatientModule,
    DoctorModule,
  ],
  
})
export class AppModule {}
