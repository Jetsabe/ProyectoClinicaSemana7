import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  name!: string
  
  @IsString()
  phone!: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string

  @IsNumber({}, { message: 'El id debe ser un id válido' })
  idSpecialty!: number

 
}
