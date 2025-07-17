import {IsString} from "class-validator";

export class CreateShopDto {
    @IsString()
    shop: string;

    @IsString()
    accessToken: string;
}