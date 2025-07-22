import {Injectable, Logger} from '@nestjs/common';
import {shopifyGraphqlFetch} from "../shopify.helper";
import {ShopifyShopResource} from "./shop.type";

@Injectable()
export class ShopifyShopService {
    private readonly logger = new Logger(ShopifyShopService.name);

    async getShop(domain: string, accessToken:string) {
        try {
            const query = `
                query {
                    shop {
                        id
                        currencyCode
                        email
                        primaryDomain {
                            host
                        }
                        url
                        currencyFormats {
                            moneyFormat
                        }
                    }
                }
            `
            const res = await shopifyGraphqlFetch<ShopifyShopResource>(domain, accessToken, {
                query: query,
            });
            return res.data?.shop;
        } catch (e) {
            this.logger.error(e);
        }
    }
}
