import { ApiModelProperty } from '@nestjs/swagger';

export class ConfigDto {
    @ApiModelProperty()
    readonly language: string;
    @ApiModelProperty()
    readonly theme: string;
}