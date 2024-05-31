import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import useSWR from 'swr';

const token = localStorage.getItem("jwtToken");
const fetcher = (...args) => fetch(...args , {
    method: 'GET',
    headers: {
      Authorization: token
    }
}).then(res => res.json());
const FavoriteButton = ({movieId}) => {
 const {data} = useSWR('http://localhost:5000/api/v1/userProfile',fetcher);
 if(data){
    console.log(data.favoriteIds)
 }
  return (
    <div className='
      cursor-pointer
      w-6
      h-6
      lg:w-10
      lg:h-10
      flex
      justify-center
      items-center
      border-white
      border-2
      rounded-full
      group/item
      transition
      hover:border-neutral-300
    '>
       <AiOutlinePlus className='text-white' size={25}/> 
    </div>
  )
}

export default FavoriteButton