export type BulkOperationRunQuery = {
    bulkOperationRunQuery: {
        bulkOperation: {
            id: string
            status: string
        },
        userErrors: Array<{ field: string, message }>
    }
}

export type BulkOperationRetrieveQuery = {
    node: {
        url: string
        type: string
        fileSize: number
        objectCount: number
        rootObjectCount: number
        partialDataUrl: string
    }
}

export type VariantResourceNode = {
    id: string,
    price: string,
    displayName: string,
    barcode: string,
    __parentId?: string,
}

export type CollectionResourceNode = {
    id: string,
    description: string,
    handle: string,
    title: string,
    __parentId?: string,
}

export type ProductResourceNode = {
    id: string,
    title: string,
    handle: string,
    description: string,
    tags: string[],
    status: string,
    vendor: string,
    seo: {
        title: string,
        description: string,
    }
    variantsCount: {
        count: number,
        precision: string,
    },
    priceRangeV2: {
        maxVariantPrice: {
            amount: string,
            currencyCode: string
        },
        minVariantPrice: {
            amount: string,
            currencyCode: string
        }
    }
    variants: VariantResourceNode[],
    options: {
        id: string,
        name: string,
        optionValues: {
            id: string
            name: string
        }[],
        value: string[],
        position: number
    }[],
    category: {
        name: string,
        fullName: string,
        level: number,
        isArchived: boolean,
    },
    collections: CollectionResourceNode[],
}