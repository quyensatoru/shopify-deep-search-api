import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;
  private readonly index = 'products';

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    });
  }

  async indexProduct(product: any) {
    await this.client.index({
      index: this.index,
      id: product.id.toString(),
      document: product,
    }, {
      headers: {
        Accept: 'application/vnd.elasticsearch+json; compatible-with=8',
        'Content-Type': 'application/vnd.elasticsearch+json; compatible-with=8',
      }
    });
  }

  async searchProducts(query: string, from = 0, size = 100) {
    const { hits, profile } = await this.client.search({
      index: this.index,
      from,
      size,
      query: {
        multi_match: {
          query,
          fields: ['title^3'],
          type: 'most_fields',
        },
      },
      _source: ['title', 'priceRangeV2','variants', 'collections', 'options'],
      profile: true,
    }, {
      headers: {
        Accept: 'application/vnd.elasticsearch+json; compatible-with=8',
        'Content-Type': 'application/vnd.elasticsearch+json; compatible-with=8',
      }
    });
    console.log("profile: ", profile)
    return hits.hits.map((hit: any) => hit._source);
  }
} 