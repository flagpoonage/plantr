import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormValues {
  username: string;
  password: string;
}

export function Login(): ReactElement {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();

  const { errors } = formState;

  function onSubmit(data: any) {
    console.log('Submitting', data);
  }

  console.log(errors);

  return (
    <div>
      <h1>{'Plantr'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          autoComplete="username"
          {...register('username', { required: 'Please enter your username' })}
        />
        <p>{errors.username?.message}</p>
        <input
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Please enter your password',
          })}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">{'Login'}</button>
        <a href="/signup">Signup</a>
      </form>
    </div>
  );
}
