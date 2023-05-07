import { Module } from '@nestjs/common';
import { AWSService } from './aws.service';
import { AWSController } from './aws.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AWSController],
  providers: [AWSService],
  exports: [AWSService],
})
export class AWSModule {}
