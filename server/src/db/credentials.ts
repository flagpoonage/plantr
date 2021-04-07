import { LoginCredentials } from '@plantr/domain';
import { DatabasePersist } from './persist';

export class ExistingUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class CredentialsDatabase extends DatabasePersist<LoginCredentials> {
  constructor() {
    super('credentials');
  }

  async create(credential: LoginCredentials) {
    this.add(credential);
    await this.save();
  }

  check = (user: string, password: string): string | undefined => {
    return this.find((a) => (a.email === user || a.username === user) && a.password === password)?.id;
  };
}
export const Credentials = new CredentialsDatabase();
