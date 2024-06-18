import { useEffect,useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useSWR from "swr";
import useInfoModel from "../hook/useInfoModel";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const InfoModel = ({visible , onClose}) => {
  const [isVisible, setisVisible] = useState(!!visible);
  const {movieId} = useInfoModel();
  console.log(visible);
  console.log(movieId);
  const { data = {} } = useSWR(
    movieId ? `https://netflix-watch-web.vercel.app/api/v1/singleMovie/${movieId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  
  useEffect(() => {
    setisVisible(!!visible)
  }, [visible])
  
  const handleClose = useCallback(()=> {
    setisVisible(false);
    setTimeout(()=> {
        onClose();
    },300)
  },[onClose]);

  return (
    <div className={`
      ${isVisible ? 'scale-100' : ' scale-0 duration-200'}
      trasnform 
      flex
      justify-center
      items-center
      inset-0
      z-50
      h-screen
      bg-black
      bg-opacity-0
      overflow-x-hidden
      overflow-y-auto
      fixed
    `}>
        <div className='
          relative
          w-auto
          mx-auto
          max-w-3xl
          overflow-hidden
          rounded-md
        '>
            <div className={`
              
              relative
              flex-auto
              transform
              duration-300
              bg-zinc-900
              drop-shadow-md
            `}>
                <div className='relative h-96'>
                    <video className='w-full h-full brghtness-[60%] object cover' autoPlay loop muted poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
                    <div  className='
                      cursor-pointer
                      w-10
                      h-10
                      rounded-full
                      bg-black
                      bg-opacity-70
                      flex
                      items-center
                      justify-center
                      absolute
                      top-3
                      right-3
                    '
                    onClick={handleClose}
                    >
                       <AiOutlineClose className="text-white cursor-pointer" />
                    </div>
                    <div className="
                      absolute
                      bottom-[10%]
                      left-10
                    ">
                        <p className="
                          text-white
                          text-3xl
                          md:text-4xl
                          lg:text-5xl
                          h-full
                          font-bold
                          mb-7

                        ">
   
                        </p>
                        <div className="
                          flex
                          flex-row
                          items-center
                          gap-4
                          mb-3
                        ">
                            <PlayButton/>
                        </div>
                    </div>
                </div>

                <div className="px-12 py-8">
                    <p className="text-lg font-semibold text-green-400 mb-2">New</p>
                    <p className="text-lg text-white mb-1">{data?.duration}</p>
                    <p className="text-lg text-white mb-1">{data?.description}</p>
                    <p className="text-lg text-red-400">{data?.genre}</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default InfoModel