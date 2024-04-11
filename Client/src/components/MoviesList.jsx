import useSWR from "swr"
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"

const fetcher = (...args) => fetch(...args).then((response)=> response.json())

const MoviesList = () => {
  const {data} = useSWR("http://localhost:5000/api/v1/movies", fetcher);
  console.log(data);
  if(isEmpty(data)){
    return null
  }
  return (
    <div className="px-4 md:px-12 space-y-8 mt-4">
        <div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">Tranding Now</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
            {
                data?.map((movie)=> (
                    <MovieCard key={movie._id} data={movie}/>
                ))
            }
        </div>
    </div>
  )
}

export default MoviesList