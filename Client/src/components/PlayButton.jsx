import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const PlayButton = ({movieId}) => {
  const navigate = useNavigate();
  return (
    <button onClick={()=> navigate(`/watchMovie/${movieId}`)} className="
      bg-white
      py-1 md:py-2
      px-2 md:px-4
      rounded-md
      w-auto
      text-sm lg:text-lg
      flex
      flex-row
      items-center
      hover:bg-neutral-300
      transition
      font-semibold
    ">
      <BsPlayFill size={25} className="mr-1"/>
      Play
    </button>
  )
}

export default PlayButton