import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { ApiError } from '@jirakli/shared';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: ApiError['errors'] = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) ?? message;

        // Handle validation errors
        if (Array.isArray(responseObj.message)) {
          message = 'Validation failed';
          errors = responseObj.message.map((msg: string) => ({
            field: 'unknown',
            message: msg,
          }));
        }
      }
    }

    this.logger.error(
      `${request.method} ${request.url} - ${status}: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    const errorResponse: ApiError = {
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
