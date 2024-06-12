
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

import { useCallback , useMemo } from 'react';
import useUserInfo from '../hook/useUserInfo';



const FavoriteButton = ({movieId}) => {

const {user , mutate} =  useUserInfo();

const token = localStorage.getItem("jwtToken");
 
  const addFavorite = useCallback(async () => {
   
    if (!movieId) return;
    try {
      const newFavoriteIds = [...user.favoriteIds, movieId];
      await mutate({ ...user, favoriteIds: newFavoriteIds }, false); //it updates the cache without immediately revalidating it (hence the false argument).
      await fetch(`${apiUrl}/favoriteMovies/${movieId}`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      await mutate(); // Revalidate the cache
    } catch (err) {
      console.error("Error adding favorite:", err);
      mutate(); // Revert optimistic update
    }
  }, [movieId, user, mutate, token]);

  const removeFavorite = useCallback(async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    if (!movieId) return;
    try {
      const newFavoriteIds = user.favoriteIds.filter(id => id !== movieId);
      await mutate({ ...user, favoriteIds: newFavoriteIds }, false);
      await fetch(`${apiUrl}/favoriteMovies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      await mutate(); // Revalidate the cache
    } catch (err) {
      console.error("Error removing favorite:", err);
      mutate(); // Revert optimistic update
    }
  }, [movieId, user, mutate, token]);


  const isFavorite = useMemo(() => user?.favoriteIds?.includes(movieId), [user, movieId]);
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={isFavorite ? removeFavorite : addFavorite} className='
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
       <Icon className='text-white' size={25}/> 
    </div>
  )
}

export default FavoriteButton