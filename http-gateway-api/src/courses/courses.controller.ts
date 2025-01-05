import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Query, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('courses')
export class CoursesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async findOneCourse(@Param('slug') id: string) {
    return this.natsClient.send("getInforCourse", { id });
  }

  @HttpCode(HttpStatus.OK)
  @Post('active')
  async findAllCourseActive(
    @Body() body: { userId: string; courseId?: Array<string> },
  ) {
    return await firstValueFrom(this.natsClient.send("getAllCourseActive", body));
  }
}
