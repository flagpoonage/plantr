import { Session, User } from '@plantr/domain/entity';
import { Credentials } from '../db/credentials';
import { Users } from '../db/users';
import { encode } from '../middleware';
import { v4 as uuid } from 'uuid';

export async function createSessionFromLogin(username: string, password: string): Promise<Session | null> {
  const user_id = Credentials.check(username, password);

  if (!user_id) {
    return null;
  }

  const user = Users.getById(user_id);

  if (!user) {
    throw new Error(`Could not find user ${user_id}`);
  }

  return await createSessionFromUser(user);
}

export async function createSessionFromUser(user: User): Promise<Session> {
  const token = await encode({
    sub: user.id,
  });

  if (!token) {
    throw new Error('Unable to create token for user');
  }

  const time = new Date().getTime();

  return {
    id: uuid(),
    created_at: time,
    updated_at: time,
    token,
  };
}
