
import {useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import Events from "./events"
import Login from "./login"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AddEvent from "./createEvent"
import {getEvent} from "./redux/eventSlice"
import ImageCarousel from "./ImageCarousel"
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchData=async()=>{
   try{
    const response=await axios.get("http://localhost:3002");
    dispatch(getEvent(response.data))
   }
   catch(err){
   console.log(err)
   }
    }
   fetchData()
},[])

  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>


        <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>}/>
        <Route path="/image-gallery" element={<ImageCarousel/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/add-event" element={<AddEvent/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
      
      </Routes>
      <Footer/>
      </BrowserRouter>
       
  )
}

export default App
