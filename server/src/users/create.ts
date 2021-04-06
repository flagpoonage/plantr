import { createUserEntity, CreateUserDto } from '@plantr/domain/create';
import { createCredentialFromUser, User } from '@plantr/domain/entity';
import { Credentials } from '../db/credentials';
import { Users } from '../db/users';

export function createUser(data: CreateUserDto): User {
  const user = Users.create(createUserEntity(data));
  const crendentials = createCredentialFromUser(user, data.password);

  Credentials.create(crendentials);

  console.log('Validated successfully', data);
  return user;
}
