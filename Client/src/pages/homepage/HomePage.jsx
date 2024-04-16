import Billboard from "../../components/Billboard";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";
import InfoModel from "../../components/InfoModel";
import useInfoModel from "../../hook/useInfoModel";


const HomePage = () => {
  const { isOpen, closeModel } = useInfoModel();
  return (
    <>
     <div className="w-full ">
      <InfoModel visible={isOpen} onClose={closeModel} />
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
