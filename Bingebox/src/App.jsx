import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Episode from './components/Episodes/Episode'
import SearchPage from './components/SearchPage/SearchPage'
import SeriesPage from './components/SeriesPage/SeriesPage'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Player from './pages/Player/Player'
import SeriesPlayer from "./pages/seriesPlayer/SeriesPlayer"


const App = () => {

  

  const navigate = useNavigate();

  // useEffect (()=>{
  //   onAuthStateChanged(auth,async(user)=>{
  //     if(user){
        
  //       navigate('/');
        
  //     }else{
        
  //       navigate('/login');
       
  //     }
  //   })
  // },[])


  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/series/:id' element={<SeriesPage/>}/>
        <Route path='/SeriesPlayer/:id/:season/:episode' element={<SeriesPlayer/>}/>
        <Route path='/episodes' element={<Episode/>}/>
       
      </Routes>
     
     
    </div>
  )
}

export default App
