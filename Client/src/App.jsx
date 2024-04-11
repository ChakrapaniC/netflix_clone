
import './App.css'
import Billboard from './components/Billboard'
import MoviesList from './components/MoviesList'
import Navbar from './components/Navbar'
import Auth from './pages/auth/Auth'
import Profile from './pages/profile/Profile'


function App() {


  return (
    <>
    <div className='w-full '>
      {/* <Auth/> */}
      {/* <Profile/> */}
      <Navbar/>
      <Billboard/>
      <div className='pb-40'>
        <MoviesList/>
      </div>
    </div>
    </>
  )
}

export default App
