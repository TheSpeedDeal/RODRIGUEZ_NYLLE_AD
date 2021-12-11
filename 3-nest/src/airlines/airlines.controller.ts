import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common';

import { AirlinesService } from './airlines.service';

@Controller('airlines')
export class AirlinesController {
    constructor(private readonly airlineService: AirlinesService) {}

    @Post('/register')
    register(@Body() body: any) {
      return this.airlineService.register(body);
    }

    @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.airlineService.deleteAirlines(id);
  }

  @Put('/:id')
  replaceValuePut(@Param('id') id: string, @Body() body: any) {
    return this.airlineService.replaceValuePut(id, body);
  }
  
  @Patch('/:id')
  replaceValuePatch(@Param('id') id: string, @Body() body: any) {
    return this.airlineService.replaceValuePatch(id, body);
  }
  
}
