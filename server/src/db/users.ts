import { User } from '@plantr/domain';
import { DatabasePersist } from './persist';

class UserDatabase extends DatabasePersist<User> {
  constructor() {
    super('users');
  }

  create = async (user: User): Promise<User> => {
    await this.add(user);
    return user;
  };

  getById = (id: string): User | undefined => {
    return this.find((a) => a.id === id);
  };

  getByUsername = (username: string): User | undefined => {
    return this.find((a) => a.username === username || a.email === username);
  };

  update = (user: Partial<User>): User | undefined => {
    if (!user.id) {
      return undefined;
    }

    const current = this.getById(user.id);

    if (!current) {
      return undefined;
    }

    const time = new Date().getTime();

    const updated: User = {
      ...current,
      ...user,
      created_at: current.created_at,
      updated_at: time,
    };

    this.update(updated);

    return updated;
  };
}

export const Users = new UserDatabase();
