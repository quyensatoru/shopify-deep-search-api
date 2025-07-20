export interface ThemeResponse {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    role: string;
    theme_store_id: number;
    previewable: boolean;
    processing: boolean;
    admin_graphql_api_id: string;
}

export interface ListThemesResponse {
    themes: Array<ThemeResponse>;
}

export interface ShopifyAsset {
    asset: {
        key: string;
        public_url: null | string;
        value: string;
        created_at: string | Date;
        updated_at: string | Date;
        content_type: string;
        size: number;
        checksum: unknown;
        theme_id: number;
    };
}

interface Location {
    line: number;
    column: number;
}
interface Error {
    message: string;
    locations: Location[];
    path?: Array<string>;
    extensions?: {
        code: string;
        typeName: string;
    };
}

export interface GraphqlResult<T> {
    error?: Array<Error>;
    data?: T;
    extensions: {
        cost: {
            requestedQueryCost: number;
            actualQueryCost: number;
            throttleStatus: {
                maximumAvailable: number;
                currentlyAvailable: number;
                restoreRate: number;
            };
        };
    };
}

export interface UserError {
    field: string;
    message: string;
}

type BulkOperationType = {
    id: string;
    status: string;
};

type UserErrorFieldQL = {
    field: Array<string>;
    message: string;
};

type UserErrors = Array<UserErrorFieldQL> | [];

type ThrottleStatusQL = {
    maximumAvailable: number;
    currentlyAvailable: number;
    restoreRate: number;
};

type CostGraphQL = {
    requestedQueryCost: number;
    actualQueryCost: number;
    throttleStatus: ThrottleStatusQL;
};

type ExtensionsQL = {
    cost: CostGraphQL;
};

type BulkOperationRunQueryObject = {
    bulkOperation: BulkOperationType;
    userErrors: UserErrors;
};

type MutationBulkOperationData = {
    bulkOperationRunQuery: BulkOperationRunQueryObject;
};

export type ResponseCreateBulkOperation = {
    data: MutationBulkOperationData;
    extensions: ExtensionsQL;
};
