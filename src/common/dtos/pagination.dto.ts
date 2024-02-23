import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'How many rows do you need'
    })
    @IsOptional()
    @IsPositive()
    //transformar a numero // puede usar a nivel global los transformers enabledImplicitConversions:true
    @Type(() => Number)
    limit?: number;

    
    @ApiProperty({
        default: 1,
        description: 'How many rows do you want to skeep'
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;


}