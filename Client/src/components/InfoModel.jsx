import { useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useSWR from "swr";
import useInfoModel from "../hook/useInfoModel";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const InfoModel = ({visible , onClose}) => {
  const [isVisible, setisVisible] = useState(visible);
  const {movieId} = useInfoModel();
  const { data} = useSWR(`http://localhost:5000/api/v1/singleMovie/${movieId}`,fetcher);

  const handleClose = useCallback(()=> {
    setisVisible(!!visible);
    setTimeout(()=> {
        onClose();
    },300)
  },[onClose , visible]);

  return (
    <div className='
      flex
      justify-center
      items-center
      inset-0
      z-50
      transition
      duration-300
      bg-black
      bg-opacity-0
      overflow-x-hidden
      overflow-y-auto
      fixed
    '>
        <div className='
          relative
          w-auto
          mx-auto
          max-w-3xl
          overflow-hidden
          rounded-md
        '>
            <div className={`
              ${isVisible ? 'scale-100' : 'scale-0'}
              relative
              flex-auto
              transform
              duration-300
              bg-zinc-900
              drop-shadow-md
            `}>
                <div className='relative h-96'>
                    <video className='w-full h-full brghtness-[60%] object cover' autoPlay loop muted poster={data?.thumbnailUrl} src={data?.videoUrl}></video>
                    <div className='
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
                    onClick={()=> {}}
                    >
                       <AiOutlineClose className="text-white" onClick={handleClose}/>
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
                        ">
                            <PlayButton/>
                        </div>
                    </div>
                </div>

                <div className="px-12 py-6">
                    <p className="text-lg font-semibold text-green-400">New</p>
                    <p className="text-lg text-white">{data?.duration}</p>
                    <p className="text-lg text-white">{data?.description}</p>
                    <p className="text-lg text-white">{data?.genre}</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default InfoModel