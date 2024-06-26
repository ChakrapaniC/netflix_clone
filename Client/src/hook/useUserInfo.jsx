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

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, []);

  const { data, mutate, error } = useSWR(
    token ? `https://netflix-watch-web.vercel.app/api/v1/userProfile` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  if(data){
    console.log("data fetch by request" , data);
  }

  return {
    user: data,
    mutate,
    error
  }
}

export default useUserInfo;