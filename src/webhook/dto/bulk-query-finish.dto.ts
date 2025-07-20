import { IsString } from "class-validator";
import { Optional } from "@nestjs/common";

export class BulkQueryFinishDto {
    @IsString()
    admin_graphql_api_id: string;

    @IsString()
    completed_at: string;

    @IsString()
    created_at: string;

    @IsString()
    @Optional()
    error_code: any;

    @IsString()
    status: string;

    @IsString()
    type: string
}