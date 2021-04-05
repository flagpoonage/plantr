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
          {...register('name', {
            required: 'Please enter your name',
            maxLength: {
              value: 100,
              message:
                'Your name can be at most 50 characters long. If your name is longer, please provide a short alias that we can address you by.',
            },
          })}
        />
        <p>{errors.name?.message}</p>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="text"
          placeholder="Email address"
          autoComplete="email"
          aria-invalid={!!errors.name?.message}
          {...register('email', {
            required: 'Please enter your email address',
            pattern: {
              value: /S+@S+.S+/,
              message: 'The email address you entered is not valid',
            },
          })}
        />
        <p aria-describes>{errors.email?.message}</p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          {...register('username', {
            required: 'Please enter a username',
            minLength: { value: 3, message: 'Your username must be at least 3 characters long' },
            maxLength: { value: 20, message: 'Your username must be at most 20 characters long' },
          })}
        />
        <p>{errors.username?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Please enter a password',
            minLength: { value: 12, message: 'Your password must be at least 12 characters long' },
          })}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">{'Signup'}</button>
        <a href="/login">Login</a>
      </form>
    </div>
  );
}
