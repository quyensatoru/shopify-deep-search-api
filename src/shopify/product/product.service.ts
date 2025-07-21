import {Injectable, Logger} from '@nestjs/common';
import {shopifyGraphqlFetch} from "../shopify.helper";
import {BulkOperationRetrieveQuery, BulkOperationRunQuery} from "./product.type";
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

    async bulkOperationRunQuery(domain: string, accessToken: string) {
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
    async bulkOperationRetrieveQuery(domain: string, accessToken: string, id: string) {
        try {
            const query = `
            query BulkOperationQuery($id: ID!) {
                node(id: $id) {
                    ... on BulkOperation {
                        url
                        type
                        fileSize
                        objectCount
                        rootObjectCount
                        partialDataUrl
                    }
                }
            }
            `
            const res = await shopifyGraphqlFetch<BulkOperationRetrieveQuery>(domain, accessToken, {
                query: query,
                variables: {
                    id
                }
            })
            return res.data?.node;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
