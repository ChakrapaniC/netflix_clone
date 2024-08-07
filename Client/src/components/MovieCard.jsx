import React, {useState} from "react";
import { BsPlayFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useInfoModel from "../hook/useInfoModel";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({ data }) => {
  const {openModel} = useInfoModel()
  const [isActive, setIsActive] = useState(false);

  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]" onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}>
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        src={data.thumbnailUrl}
        alt="thumbnail"
      ></img>
      <div
        
        className={`
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        ${isActive ? 'scale-110 translate-y-[-6vw] translate-x-[2vw] opacity-100' : ''}
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100

      `}
      >
        <img
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={data.thumbnailUrl}
          alt="thumbnail"
        ></img>
        <div className="absolute bg-zinc-800 p-2 lg:p-4 transition z-10 shadow-md rounded-b-md w-full">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer
            w-6
            h-6
            lg:w-10
            lg:h-10
            rounded-full
            hover:bg-neutral-300
            bg-white
            flex 
            justify-center
            items-center
            transition
           "
              onClick={() => {}}
            >
              <BsPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?._id}/>
            <div className="
              cursor-pointer
              ml-auto
              flex
              justify-center
              items-center
              w-6
              h-6
              lg:w-10 lg:h-10
              rounded-full
              group/item
              hover:bg-neutral-600
              transition
              border-2
              border-white
            ">
              <MdOutlineKeyboardArrowDown onClick={()=> openModel(data?._id)} size={25} className="text-white"/>
            </div>
          </div>

          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2024</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
