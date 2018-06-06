import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { getModelToken } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { LogService } from '../log/log.service';
import { PasswordCryptService } from '../auth/password/password-crypt.service';
import { LogModule } from '../log/log.module';
import { AuthModule } from '../auth/auth.module';

describe('User service', () => {
    let userService: UserService;
    let userModel: Model<UserModel>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            components: [
                UserService,
                {
                    provide: getModelToken('User'),
                    useValue: {
                        create: () => { },
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        console.log('create userService:', userService);
        userModel = module.get(getModelToken('User'));
        console.log('create userModel', userModel);
    });

    it('should behave...', async () => {
        // jest.spyOn(userModel, 'create').mockImplementation(model => model);
        // const addUser = await userService.createOne({
        //     username: 'prova',
        //     password: 'prova',
        //     firstname: 'prova',
        //     lastname: 'prova'
        // });

        // console.log(addUser);
        expect(1).toEqual(1);
    });
});
