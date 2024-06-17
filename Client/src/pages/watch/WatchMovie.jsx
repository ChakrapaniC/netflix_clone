import useSWR from "swr";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const WatchMovie = () => {
  const { id } = useParams();
  const {data} = useSWR(
    `https://netflix-clone-five-flax.vercel.app/api/v1/singleMovie/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-black'>
        <nav className='
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
        '>
          <FaArrowLeft className="text-white cursor-pointer " size={30} onClick={()=> navigate("/home")}/>
          <p className="text-white text-1xl md:text-3xl">
            <span>
                Watching:
            </span>
            {data?.title}
          </p>
        </nav>
        <video autoPlay controls src={data?.videoUrl} className="w-full h-full"></video>
    </div>
  )
}

export default WatchMovie