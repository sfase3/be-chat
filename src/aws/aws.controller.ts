import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AWSService } from './aws.service';

@Controller('aws')
export class AWSController {
  constructor(private readonly AwsService: AWSService) {}
  @Get()
  async c() {
    return process.env.AWS_KEY;
  }
  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.AwsService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
