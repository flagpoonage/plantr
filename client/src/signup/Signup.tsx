import { CreateUserDto, createUserFormValidation } from '@plantr/domain/create';
import { errorResponseToFormValidation } from '@plantr/domain/responses';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { apiPublic } from '../api';

export function Signup(): ReactElement {
  const { register, handleSubmit, formState, setError } = useForm<CreateUserDto>();

  const { errors } = formState;

  async function onSubmit(data: CreateUserDto) {
    try {
      const value = await apiPublic('/users').post(data).json();
      console.log(value);
    } catch (exception) {
      errorResponseToFormValidation(exception.json).forEach(([key, error]) =>
        setError(key as keyof CreateUserDto, error)
      );
    }
  }

  return (
    <div>
      <h1>{'Plantr - Signup'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          {...register('name', createUserFormValidation.name)}
        />
        <p>{errors.name?.message}</p>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="text"
          placeholder="Email address"
          autoComplete="email"
          aria-invalid={!!errors.name?.message}
          {...register('email', createUserFormValidation.email)}
        />
        <p aria-describes>{errors.email?.message}</p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          {...register('username', createUserFormValidation.username)}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register('password', createUserFormValidation.password)}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">{'Signup'}</button>
        <a href="/login">Login</a>
      </form>
    </div>
  );
}
