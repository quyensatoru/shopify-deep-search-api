export type ShopifyShopResource = {
    shop: {
        id: string
        currencyCode: string
        email: string
        primaryDomain: {
            host: string
        }
        url: string
        currencyFormats: {
            moneyFormat: string
        }
    }
}