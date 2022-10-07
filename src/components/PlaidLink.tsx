
import { useEffect, useCallback, useState } from 'react';

import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import { API_BASE_URL } from '../config';

const SimplePlaidLink = () => {
  const [token, setToken] = useState<string | null>(null);

  // get link_token from your server when component mounts
  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch(API_BASE_URL + '/create_link_token', { method: 'POST' });
      const { "token": link_token } = await response.json();
      setToken(link_token);
      console.log(link_token)
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    console.log(publicToken, metadata);
  }, []);
  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default SimplePlaidLink;
