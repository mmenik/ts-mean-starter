import { PasswordCrypt } from './password-crypt.interface';
import { hashSync, compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordCryptService implements PasswordCrypt {
    async doHash(plaintextPassword: string): Promise<string> {
        return await hashSync(plaintextPassword, 10);
    }

    async doCompare(plaintextPassword: string, hash: string): Promise<boolean> {
        return await compareSync(plaintextPassword, hash);
    }
}
