import { createUserFormValidation } from '@plantr/domain/create';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

interface SignupFormValues {
  username: string;
  password: string;
  name: string;
  email: string;
}

export function Signup(): ReactElement {
  const { register, handleSubmit, formState } = useForm<SignupFormValues>();

  const { errors } = formState;

  function onSubmit(data: any) {
    console.log('Submitting', data);
  }

  console.log(errors);

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
