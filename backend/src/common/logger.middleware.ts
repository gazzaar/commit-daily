import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LOGGER } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;

    if (originalUrl === '/graphql' && method === 'GET') {
      return next();
    }

    if (
      originalUrl === '/graphql' &&
      method === 'POST' &&
      body?.operationName === 'IntrospectionQuery'
    ) {
      return next();
    }

    const start = Date.now();
    const logData: Record<string, any> = { method, url: originalUrl };

    if (originalUrl === '/graphql' && method === 'POST' && body) {
      const { operationName, variables, query } = body;
      logData.operationName = operationName || 'UnnamedOperation';
      logData.variables = variables;
      if (query) {
        const firstLine = query.trim().split('\n')[0];
        logData.query =
          firstLine.length > 120 ? firstLine.slice(0, 120) + '...' : firstLine;
      }
    } else {
      logData.body = body;
    }

    LOGGER.info(logData, 'Incoming request');

    res.on('finish', () => {
      const duration = Date.now() - start;
      LOGGER.info(
        {
          ...logData,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        },
        'Request completed',
      );
    });

    next();
  }
}
