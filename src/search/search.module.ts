import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchProduct, SearchProductSchema } from './schemas/search-product.schema';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: SearchProduct.name, schema: SearchProductSchema }])],
  providers: [SearchService, ElasticsearchService],
  controllers: [SearchController],
  exports: [SearchService]
})
export class SearchModule {} 