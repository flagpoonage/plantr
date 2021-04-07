import { BaseEntity } from './base';

export interface Session extends BaseEntity {
  token: string;
}
