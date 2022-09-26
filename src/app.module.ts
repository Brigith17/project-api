import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './modules/github/github.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EjemploController } from './ejemplo/ejemplo.controller';
import { MorganModule } from 'nest-morgan';

@Module({
  imports: [
    UserModule,
    GithubModule,
    MorganModule,
    MongooseModule.forRoot('mongodb://localhost/githubdb'),
  ],
  controllers: [AppController, EjemploController],
  providers: [AppService],
})
export class AppModule {}
