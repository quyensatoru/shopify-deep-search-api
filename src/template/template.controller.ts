import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { ShopifySessionGuard } from '../auth/shopify-session.guard';

@UseGuards(ShopifySessionGuard)
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Body() body: any) {
    return this.templateService.create(body);
  }

  @Get()
  async findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.templateService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.templateService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.templateService.delete(id);
  }
} 