import { BaseEntity } from './base';

export interface User extends BaseEntity {
  name: string;
  email: string;
  username: string;
}
