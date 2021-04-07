import { createUserEntity, CreateUserDto } from '@plantr/domain/create';
import { createCredentialFromUser, User } from '@plantr/domain/entity';
import { Credentials } from '../db/credentials';
import { Users } from '../db/users';

export async function createUser(data: CreateUserDto): Promise<User> {
  const user = createUserEntity(data);
  await Users.create(user);
  const crendentials = createCredentialFromUser(user, data.password);

  Credentials.create(crendentials);

  console.log('Validated successfully', data);
  return user;
}
