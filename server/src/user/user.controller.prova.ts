import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';

// describe('User controller', () => {
//     let userController: UserController;
//     let userService: UserService;

//     beforeAll(async () => {
//         const module = await Test.createTestingModule({
//             controllers: [UserController],
//             components: [UserService]
//         }).compile();

//         userController = module.get<UserController>(UserController);
//         userService = module.get<UserService>(UserService);
//     });

//     describe('findAll', () => {
//         it('should return an array of users', async () => {
//             // jest.spyOn(userService, 'findAll').mockImplementation(() => result);
//             // expect(await userController.findAll()).toBe(result);
//         });
//     });
// });
