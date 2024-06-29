import Authorization from '../../HOC/Authorization';
import profileImg from '../../assets/images/default-blue.png'
import { useNavigate  } from 'react-router';


const Profile = ({user}) => {
 const navigate = useNavigate();
 if(user){
   console.log("username is", user?.username)
 }
  const loginProfile = () => {
    let token = localStorage.getItem('jwtToken');
    if(token){
       navigate('/home')
    }
  }
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-6xl text-white text-center">
            Who&#39;s watching?
          </h1>
          <div className="flex items-center justify-center gap-7 mt-10" onClick={loginProfile}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  draggable={false}
                  className="w-max h-max object-contain"
                  src={profileImg}
                  alt="...loading"
                />
              </div>
              <h2 className='text-center text-white mt-2 text-2xl'>{user?.username}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorization(Profile);
