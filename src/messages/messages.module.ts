import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatGateway } from './chat.gateway';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [ChatGateway, MessagesService],
  imports: [SequelizeModule.forFeature([Message])],
})
export class MessagesModule {}
