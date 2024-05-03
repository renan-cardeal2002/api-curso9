import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('finish', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (responseTime > 1000) {
        console.log(
          `Request ${req.method} ${req.url} - Response Time: ${responseTime}ms`,
        );
      }
    });

    next();
  }
}
