
import { isEmpty } from "lodash"
import MovieCard from "./MovieCard"



const MoviesList = ({title , movies}) => {

  if(isEmpty(movies)){
    return null
  }
  return (
    <div className="px-4 md:px-12 space-y-8 mt-4">
        <div>
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
            {
                movies?.map((movie)=> (
                    <MovieCard key={movie._id} data={movie}/>
                ))
            }
        </div>
    </div>
  )
}

export default MoviesList