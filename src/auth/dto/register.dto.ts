import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { Role } from '../../generated/prisma/enums.js'


export class RegisterDto{
    @ApiProperty({example: "exampledoc@gmail.com" })
     @IsEmail({}, { message: 'El correo no tiene un formato válido' })
      email!: string
   
  @ApiProperty({example: "12456abcde"})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string

  @ApiPropertyOptional({enum: Role, example:  "DOCTOR"})
  @IsOptional()
  @IsEnum(Role)
  role?: Role
}