import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';

export default function MyShows() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const { data, error } = useSWR(
    isLoading || !isAuthenticated ? null : '/api/my/shows',
    async (url) => {
      const accessToken = await getAccessTokenSilently({
        audience: 'https://api/tv-shows',
        scope: 'read:shows',
      });
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      return res.json();
    }
  );

  if (isLoading) {
    return <div>Loading your user information...</div>;
  }

  if (!isAuthenticated) {
    return <div>You must first sign in to access your subscriptions.</div>;
  }

  if (error) {
    return <div>There was an error loading your subscriptions.</div>;
  }

  if (!data) {
    return (
      <div>
        <h1>Subscriptions for {user.email}</h1>
        <div>Loading your subscriptions ...</div>
      </div>
    );
  }
  return (
    <div>
      <h1>Subscriptions for {user.email}</h1>
      <div>You have subscribed to a total of {data.length} shows...</div>
    </div>
  );
}