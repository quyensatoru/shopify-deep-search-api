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