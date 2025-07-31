import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';
import { SearchProduct, SearchProductDocument } from './schemas/search-product.schema';
import { ElasticsearchService } from './elasticsearch.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(SearchProduct.name) private searchProductModel: Model<SearchProductDocument>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async saveAndIndexProduct(product: any) {
    // Save to MongoDB
    const doc = await this.searchProductModel.findOneAndUpdate(
      { id: product.id },
      product,
      { upsert: true, new: true }
    );
    // Index to Elasticsearch
    const obj = doc.toObject();
    obj.id = obj._id;
    delete obj._id;
    await this.elasticsearchService.indexProduct(obj);
    return doc;
  }

  find(filter: FilterQuery<SearchProduct>) {
    return this.searchProductModel.find(filter)
  }
} 