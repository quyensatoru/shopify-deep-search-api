import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Get()
  async search(@Query('q') query: string) {
    return this.elasticsearchService.searchProducts(query);
  }
} 