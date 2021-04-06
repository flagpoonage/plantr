import { CreateSessionDto, createSessionFormValidation } from '@plantr/domain/create';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { apiPublic } from '../api';

export function Login(): ReactElement {
  const { register, handleSubmit, formState } = useForm<CreateSessionDto>();

  const { errors } = formState;

  async function onSubmit(data: CreateSessionDto) {
    try {
      const value = await apiPublic('/sessions').post(data).json();
    } catch (exception) {
      console.log('Error', exception);
    }
  }

  return (
    <div>
      <h1>{'Plantr'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" autoComplete="username" {...register('username', createSessionFormValidation.username)} />
        <p>{errors.username?.message}</p>
        <input
          type="password"
          autoComplete="current-password"
          {...register('password', createSessionFormValidation.password)}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">{'Login'}</button>
        <a href="/signup">Signup</a>
      </form>
    </div>
  );
}
