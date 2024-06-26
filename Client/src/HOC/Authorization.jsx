import React ,  { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router";
// import useSWR from "swr";

// const fetcher = (url, options) => fetch(url, options).then(response => response.json());

const Authorization = (Component) => {
  const HigherComponent = () => {

   useEffect(() => {
     console.log("auth component called");
   }, [])
   
    let token =  localStorage.getItem("jwtToken");
    const [data, setData] = useState(null);

  
    const fetchData = useCallback(async () => {

      try {
        const response = await fetch(`https://netflix-watch-web.vercel.app/api/v1/login`, {
          method: 'GET',
          headers: {
            Authorization: token, // Use the token directly as per your backend's expectation
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("after login " , result);
        setData(result);
        localStorage.setItem('username', result.username)

      } catch (error) {
        console.log(error);
      } 
    }, [token]);

    useEffect(() => {
      fetchData();
    }, [token, fetchData]);


    if(!token ){
        return <Navigate to='/'/>
    }
    return <Component user={data?.username} />
  };
  return HigherComponent;
};

export default Authorization;
