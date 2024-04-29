import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.setTimeout(1000, () => {
      console.log('Tempo acima do normal');
    });
    next();
  }
}
