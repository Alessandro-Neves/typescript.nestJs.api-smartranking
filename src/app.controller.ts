import { Controller, Get } from '@nestjs/common';

interface IPing {
  message: string,
  date: Date
}

@Controller()
export class AppController {
  // constructor() {}

  @Get()
  getHello(): IPing {
    const ping = {
      message: 'API is running!',
      date: new Date()
    }

    return ping;
  }
}
