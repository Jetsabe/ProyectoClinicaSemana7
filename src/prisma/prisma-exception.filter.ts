import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // <-- 1. Importar Response
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // 2. Obtener el objeto response desde host/ no se extrajo el response del host
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        // 3. Cerrar y enviar la respuesta HTTP con status 409/ no enviaba respuesta http
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Ya existe un registro con ese valor único',
          error: 'Conflict',
        });
        break;

      case 'P2025':
        // 3. Cerrar y enviar la respuesta HTTP con status 404/se repetia el error
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Registro no encontrado',
          error: 'Not Found',
        });
        break;

      default:
        // 4. Responder con 500 para cualquier otro error de Prisma sin colgar la petición/dejar un trow dentro del Exception la dejaba carganado infinitamente
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error interno en la base de datos',
          error: 'Internal Server Error',
        });
        break;
    }
  }
}