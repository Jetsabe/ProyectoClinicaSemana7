import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, NotFoundException, Patch } from '@nestjs/common';
import { PatientService } from './patient.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }
 
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientService.findOne(id);
    if (!patient) {
      throw new NotFoundException(`El paciente con ID ${id} no existe`);
    }
    return patient;
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