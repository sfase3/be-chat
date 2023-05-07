import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private msgRepository: typeof Message) {}

  async getAll() {
    const users = await this.msgRepository.findAll();
    return users;
  }
}
