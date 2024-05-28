import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router";
// import useSWR from "swr";

// const fetcher = (url, options) => fetch(url, options).then(response => response.json());
const Authorization = (Component) => {
  const HigherComponent = () => {
    let token =  localStorage.getItem("jwtToken");
    const [data, setData] = useState(null);

    // const headers = {
    //   Authorization: token,
    // };
    // const requestOptions = {
    //   method: "GET",
    //   headers: headers,
    // };

    // const {data , error} = useSWR(['http://localhost:5000/api/v1/userProfile', requestOptions] , fetcher, {
    //   revalidateIfStale: false,
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    
    // })
    const fetchData = useCallback(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/userProfile', {
          method: 'GET',
          headers: {
            Authorization: token, // Use the token directly as per your backend's expectation
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result.username)
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
    return <Component user={data} />
  };
  return HigherComponent;
};

export default Authorization;
