import { registerAs } from "@nestjs/config"

export type ShopifyConfig = {
    apiVersion?: string;
}

export default registerAs<ShopifyConfig>('shopify', () => ({
    apiVersion: process.env.API_VERSION,
}))