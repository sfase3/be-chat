import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from './messages.model';
import { InjectModel } from '@nestjs/sequelize';

@WebSocketGateway(3002, { cors: true })
export class ChatGateway {
  constructor(@InjectModel(Message) private msgRepository: typeof Message) {}
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() msg: any): Promise<void> {
    await this.msgRepository.create(msg.data);
    this.server.emit('message', msg.data);
  }
}
