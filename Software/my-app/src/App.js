import './App.css'; // Global styles
import {LoginSignup} from './Components/Login_signup/Login_signup'; // Match PascalCase
import {ChatComponent} from './Components/Emergency_Page/Chat_Page';
import  HomeComponent from './Components/Home/homePage.js';
import {MapComponent} from "./Components/Map_Page/Map_Page.js"
// import { MapComponent } from './Components/Map_Page/Map_Page';
import { BrowserRouter, Routes, Route } from "react-router";


function App() 
{
  return (
     <BrowserRouter>
        <Routes>
           <Route path="/" element={<LoginSignup/>}/>
           <Route path="/Home" element={<HomeComponent/>}/>
           <Route path="/Location" element={<MapComponent/>}/>
           <Route path="/Emergency" element={<ChatComponent/>}/>
        </Routes>
     </BrowserRouter>
   )
}

export default App;
