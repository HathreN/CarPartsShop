import { useRouter } from 'next/router';
import { Auth0Provider } from '@auth0/auth0-react';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

export default function Test() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  console.log(router.toString() + '/logo.jpg');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  useEffect(() => {
    if (!user) {
      router.push('/api/auth/login') // redirects if there is no user
    }
  }, [user])
  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return (
    <div>
    <Auth0Provider
      domain={'sandrino-dev.auth0.com'}
      clientId={'9f6ClmBt37ZGCXNqToPbefKmzVBSOLa2'}
      redirectUri={'http://localhost:3000/'}>
    </Auth0Provider>

    <a href="http://localhost:3000/api/auth/login">Login</a>
    </div>
  );
}