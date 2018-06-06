import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiModelProperty()
    public readonly _id?: string;
    @ApiModelProperty()
    public readonly username: string;
    @ApiModelProperty()
    public readonly password: string;
    @ApiModelProperty()
    public readonly firstname: string;
    @ApiModelProperty()
    public readonly lastname: string;
}
