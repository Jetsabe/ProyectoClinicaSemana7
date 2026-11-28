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
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Roles } from '../auth/decorator/roles.decorator.js';

@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('RECEPTION')
export class DoctorsController {
  // ...
}



 @Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.findOne(id);
    
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, UpdateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(id);
  }
} 