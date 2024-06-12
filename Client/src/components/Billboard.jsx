import useSWR from "swr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useInfoModel from "../hook/useInfoModel";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const Billboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { data } = useSWR(
    `${apiUrl}/randomMovies`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { openModel, isOpen } = useInfoModel();
  console.log(openModel);

  const handleOpenModel = useCallback(() => {
    openModel(data?._id);
  }, [openModel, data?._id]);

  return (
    <div className="relative h-[56.25vw] lg:h-[50.25vw]">
      <video
        className="w-full h-[56.25vw] lg:h-[50.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>

      <div className="absolute top-[30%] md:top-[35%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl lg:text-6xl h-full w-[50%] font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[10px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3 ">
          <PlayButton movieId={data?._id} />
          <button
            onClick={handleOpenModel}
            className="
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
             cursor-pointer

          "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
