import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LOGGER } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;

    const start = Date.now();

    LOGGER.info({ method, url: originalUrl, body }, 'Incoming request');

    res.on('finish', () => {
      const duration = Date.now() - start;
      LOGGER.info(
        {
          method,
          url: originalUrl,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        },
        'Request completed',
      );
    });

    next();
  }
}
