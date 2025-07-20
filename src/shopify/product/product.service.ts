import {Injectable, Logger} from '@nestjs/common';
import {shopifyGraphqlFetch} from "../shopify.helper";
import {BulkOperationRunQuery} from "./product.type";
import {GraphQL} from "@bss-sbc/shopify-api-fetcher";
import {ConfigService} from "@nestjs/config";
import {AllConfig} from "../../config/config.type";

@Injectable()
export class ProductService {
    private readonly logger= new Logger(ProductService.name);
    constructor(private readonly configService: ConfigService<AllConfig>) {
        GraphQL.setConfig({
            version: this.configService.get('shopify.apiVersion', { infer: true })
        })
    }

    async bulkOperationProduct(domain: string, accessToken: string) {
        try {
            const query = `
            mutation {
                bulkOperationRunQuery(
                    query: """
                    {
                        products {
                            edges {
                                node {
                                    id
                                    title
                                    handle
                                    description
                                    tags
                                    status
                                    vendor
                                    seo {
                                        title
                                        description
                                    }
                                    variantsCount {
                                        count
                                        precision
                                    }
                                    priceRangeV2 {
                                        maxVariantPrice {
                                            amount
                                            currencyCode
                                        }
                                        minVariantPrice {
                                            amount
                                            currencyCode
                                        }
                                    }
                                    variants {
                                        edges {
                                            node {
                                                id
                                                price
                                                displayName
                                                barcode
                                            }
                                        }
                                    }
                                    options {
                                        id
                                        name
                                        optionValues {
                                            id
                                            name
                                        }
                                        values
                                        position
                                    }
                                    category {
                                        name
                                        fullName
                                        level
                                        isArchived
                                    }
                                    collections {
                                        edges {
                                            node {
                                                description
                                                handle
                                                title
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    """
                ) {
                    bulkOperation {
                        id
                        status
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
            `;
            const res = await shopifyGraphqlFetch<BulkOperationRunQuery>(
                domain, accessToken,
                {
                    query: query,
                }
            )

            return res.data?.bulkOperationRunQuery;
        } catch (e) {
            this.logger.error(e);
            throw e
        }
    }
}
