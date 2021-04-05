import { IRouter } from 'express';
import { addCreateUserRoute } from './create';

export function addUserRoutes(app: IRouter): void {
  addCreateUserRoute(app);
}
