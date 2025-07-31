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
    const start = Date.now();
    const data =  await this.elasticsearchService.searchProducts(query);
    console.log('time reponse', Date.now() - start, 'ms');
    return data;
  }
} 