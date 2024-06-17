import Billboard from "../../components/Billboard";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import InfoModel from "../../components/InfoModel";
import useInfoModel from "../../hook/useInfoModel";
import Authorization from "../../HOC/Authorization";
import useSWR from "swr";
import {  useMemo } from "react";
import useUserInfo from "../../hook/useUserInfo";


const fetcher = (...args) => fetch(...args).then((response)=> response.json())
const HomePage = () => {
  const { isOpen, closeModel } = useInfoModel();
  const {user} = useUserInfo();
  const {data} = useSWR(`https://netflix-clone-five-flax.vercel.app/api/v1/movies`, fetcher,{
  
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false

});

const favId = user?.favoriteIds;
const favoriteMovies = useMemo(() => {
  if (!data) return [];
  return data.filter(movie => favId?.includes(movie._id));
}, [data, favId]);
console.log(favoriteMovies);

  return (
    <>
     <div className="w-full ">
      <InfoModel visible={isOpen} onClose={closeModel} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MoviesList title={"Trendind Now"} movies={data}/>
        <MoviesList title={"My List"} movies={favoriteMovies}/> 
      </div>
      </div>
    </>
  );
};

export default Authorization(HomePage);
