import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;
  private readonly index = 'products';

  constructor() {
    this.client = new Client({ node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200' });
  }

  async indexProduct(product: any) {
    await this.client.index({
      index: this.index,
      id: product.id.toString(),
      document: product,
    });
  }

  async searchProducts(query: string) {
    const { hits } = await this.client.search({
      index: this.index,
      query: {
        multi_match: {
          query,
          fields: ['title', 'body_html', 'vendor', 'product_type'],
        },
      },
    });
    return hits.hits.map((hit: any) => hit._source);
  }
} 