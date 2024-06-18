import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './resources/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { AlterValueMiddleware } from './logger/alter-value';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/prova'),
    UserModule,
    CourseModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AlterValueMiddleware)
      .forRoutes({ path: 'course', method: RequestMethod.POST });
  }
}
