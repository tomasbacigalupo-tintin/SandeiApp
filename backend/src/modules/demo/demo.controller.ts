import { Controller, Post, UseGuards } from '@nestjs/common';
import { DemoService } from './demo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('demo')
export class DemoController {
  constructor(private readonly demo: DemoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createDemo() {
    return this.demo.createDemoData();
  }
}
