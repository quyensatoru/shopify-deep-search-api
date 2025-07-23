import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async create(data: Partial<Template>) {
    return this.templateModel.create(data);
  }

  async findAll() {
    return this.templateModel.find();
  }

  async findById(id: string) {
    return this.templateModel.findById(id);
  }

  async update(id: string, data: Partial<Template>) {
    return this.templateModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.templateModel.findByIdAndDelete(id);
  }
} 