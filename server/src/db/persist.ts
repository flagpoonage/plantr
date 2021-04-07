import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { BaseEntity } from '@plantr/domain/entity';

export class DatabasePersist<T extends BaseEntity> {
  _name: string;
  _path: string;

  _data: T[];

  constructor(name: string) {
    if (!process.env.DB_PATH) {
      throw new Error('No DB path was specified');
    }
    this._name = name;
    this._data = [];

    this._path = path.join(process.env.DB_PATH, `${this._name}.db.json`);
  }

  async add(...args: T[]): Promise<number> {
    const length = this._data.push(...args);
    await this.save();
    return length;
  }

  async change(v: T): Promise<void> {
    const index = this._data.findIndex((a) => a.id === v.id);

    if (index < 0) {
      throw new Error(`Cannot update missing item [${v.id}]`);
    }

    this._data[index] = v;
    await this.save();
  }

  find(v: (a: T) => boolean): T | undefined {
    return this._data.find(v);
  }

  filter(v: (a: T) => boolean): T[] {
    return this._data.filter(v);
  }

  async save(): Promise<void> {
    await this.write(this._data);
  }

  async load(): Promise<T[]> {
    const data = await readFile(this._path, 'utf-8');
    this._data = JSON.parse(data) as T[];
    return this._data;
  }

  async write(data: unknown): Promise<void> {
    return writeFile(this._path, JSON.stringify(data));
  }
}
