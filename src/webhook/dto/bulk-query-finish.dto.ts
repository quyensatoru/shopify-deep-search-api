import { IsString, IsOptional } from "class-validator";

export class BulkQueryFinishDto {
    @IsString()
    admin_graphql_api_id: string;

    @IsString()
    completed_at: string;

    @IsString()
    created_at: string;

    @IsString()
    @IsOptional()
    error_code: any;

    @IsString()
    status: string;

    @IsString()
    type: string
}