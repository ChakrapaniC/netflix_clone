import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const token =  localStorage.getItem("jwtToken");
   return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  }).then(res => res.json());
};

const useUserInfo = () => {
  const [token, setToken] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, []);

  const { data, mutate, error } = useSWR(
    token ? `${apiUrl}/userProfile` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    user: data,
    mutate,
    error
  }
}

export default useUserInfo;