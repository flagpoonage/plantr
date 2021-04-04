import cls from './Main.m.css';
import { ReactElement } from 'react';

export function Main(): ReactElement {
  return <div className={cls.hello}>{'Orange'}</div>;
}
