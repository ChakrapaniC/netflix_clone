import Billboard from "../../components/Billboard";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";


const HomePage = () => {
  return (
    <>
     <div className="w-full ">
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MoviesList />
      </div>
      </div>
    </>
  );
};

export default HomePage;
