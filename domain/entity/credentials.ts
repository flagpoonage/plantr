import { BaseEntity } from './base';
import { User } from './user';

export interface LoginCredentials extends BaseEntity {
  username: string;
  email: string;
  password: string;
}

export function createCredentialFromUser(user: User, password: string): LoginCredentials {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    password,
  };
}
