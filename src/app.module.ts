import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkModule } from './work/work.module';

@Module({
  imports: [WorkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
