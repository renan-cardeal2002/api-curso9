import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AlterValueMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.route == 'course') {
      req.body.value = Number(req.body.value) * 0.5;
      console.log('Request...');
    }
    next();
  }
}
