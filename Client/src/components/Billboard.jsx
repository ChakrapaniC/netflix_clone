import useSWR from "swr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useNavigate } from 'react-router-dom';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Billboard = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/v1/randomMovies",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  const navigate = useNavigate();
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl lg:text-6xl h-full w-[50%] font-bold drop-shadow-xl">
            {data?.title}
        </p>
        <p className="text-white text-[10px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
            {data?.description}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?._id}/>
          <button className="
             flex
             flex-row
             items-center
             text-white
             bg-white
             bg-opacity-30
             text-sm
             md:text-lg
             py-1 md:py-2
             px-2 md:px-2
             rounded-md
             hover:bg-opacity-20
             transition
             w-auto
             font-semibold

          ">
            <AiOutlineInfoCircle className="mr-1"/>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
