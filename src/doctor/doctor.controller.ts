import { Controller, 
  Get, 
  Post, 
  Body, 
  Param,
Delete, 
ParseIntPipe,
NotFoundException,
Patch} from '@nestjs/common'
import { DoctorService } from './doctor.service.js';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';
import { isNumber } from '@nestjs/common/internal';


 @Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const doctor = await this.doctorService.findOne(id);
    if (!doctor) {
      throw new NotFoundException(`El doctor con ID ${id} no existe`);
    }
    return doctor;
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, UpdateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(+id);
  }
} 