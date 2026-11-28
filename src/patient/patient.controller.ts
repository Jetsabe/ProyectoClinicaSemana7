import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, NotFoundException, Patch } from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Roles } from '../auth/decorator/roles.decorator.js';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPTION')
export class PatientsController {
  // ...
}

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }
 
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
    
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
 return this.patientService.create(createPatientDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto, 
  ) {
   
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }
}