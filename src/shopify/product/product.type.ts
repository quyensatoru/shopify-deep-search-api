export type BulkOperationRunQuery = {
    bulkOperationRunQuery: {
        bulkOperation: {
            id: string
            status: string
        },
        userErrors: Array<{ field: string, message }>
    }
}