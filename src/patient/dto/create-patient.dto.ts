import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty({ message: 'Este campo es obligatorio' })
  name!: string

  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email!: string

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida' })
  dateBirth!: Date

  @IsString()
  phone!: string
}


