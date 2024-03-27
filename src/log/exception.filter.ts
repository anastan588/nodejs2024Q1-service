import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { LogService } from './log.service';

@Catch(HttpException)
export class ExceptFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LogService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    this.loggingService.log(exception);

    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      path: request.url,
    });
  }
}
