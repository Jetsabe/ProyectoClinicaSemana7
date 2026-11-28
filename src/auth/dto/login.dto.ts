import { ApiProperty} from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { Role } from '../../generated/prisma/enums.js'


export class LoginDto{
    @ApiProperty({example: "exampledoc@gmail.com" })
     @IsEmail({}, { message: 'El correo no tiene un formato válido' })
      email!: string
   
  @ApiProperty({example: "12456abcde"})
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string
}