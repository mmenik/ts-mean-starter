import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { PasswordCryptService } from '../auth/password/password-crypt.service';
import { LogService } from '../log/log.service';
import { UserModel } from './user.model';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly model: Model<UserModel>) { }

    // constructor(
    //     @InjectModel(UserSchema) private readonly model: Model<UserModel>,
    //     private readonly passwordCryptService: PasswordCryptService,
    //     private readonly log: LogService) { }

    public async findAll(): Promise<UserModel[]> {
        // this.log.info(`Find all users`);

        const result: UserModel[] = await this.model.find().exec();
        // result.map(user => this.log.info(`User ${JSON.stringify(user)}`));

        return result;
    }

    public async findById(id: number | string): Promise<UserModel> {
        // this.log.info(`Find user by id: ${id}`);

        const result: UserModel = await this.model.findById(id);
        // this.log.info(`User found: ${JSON.stringify(result)}`);

        return result;
    }

    public async findByUsername(username: string): Promise<UserModel> {
        // this.log.info(`Find user by username: ${username}`);

        const result: UserModel = await this.model.findOne({
            username,
        });
        // this.log.info(`User found: ${JSON.stringify(result)}`);

        return result;
    }

    public async createOne(user: UserDto): Promise<UserModel> {
        // this.log.info(`User to create ${JSON.stringify(user)}`);

        const userModel: UserModel = await new this.model({ ...user, password: user.password });
        // const userModel: UserModel = await new this.model({ ...user, password: await this.passwordCryptService.doHash(user.password) });
        // this.log.info(`User model ${JSON.stringify(userModel)}`);

        let result: UserModel;
        try {
            result = await this.model.create(userModel);
            // this.log.debug(`User created ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Validation failed', error);
        }
        return result;
    }

    public async createMany(users: UserDto[]): Promise<UserModel[]> {
        // this.log.info(`Users to create ${JSON.stringify(users)}`);

        const userMapped: UserModel[] = await Promise.all(users.map(async user =>
            await new this.model({ ...user, password: user.password }),
            // await new this.model({ ...user, password: await this.passwordCryptService.doHash(user.password) }),
        ));

        // this.log.debug(`Users mapped ${JSON.stringify(userMapped)}`);

        let result: UserModel[];
        try {
            result = await this.model.create(userMapped);
            // this.log.debug(`Users created ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Validation failed', error);
        }

        return result;
    }

    public async updateOne(user: UserDto): Promise<UserModel> {
        // this.log.info(`User to update ${JSON.stringify(user)}`);

        let result: UserModel;
        try {
            result = await this.model.findByIdAndUpdate(user._id, user, { new: true }).exec();
            // this.log.debug(`Users updated ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Duplicate code', error);
        }

        return result;
    }

    public async deleteOne(id: number | string): Promise<UserModel> {
        // this.log.info(`User id to delete ${id}`);

        let result: UserModel;
        try {
            result = await this.model.findByIdAndRemove(id);
            // this.log.debug(`User removed ${JSON.stringify(result)}`);
        } catch (error) {

        }

        return result;
    }
}
