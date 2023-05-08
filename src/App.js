import {BrowserRouter , Routes , Route , Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost';
import './App.css';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './Helper/AuthContext';
import { useState , useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authstate , setAuthstate] = useState({ userName : "" , id : 0 , status : false }) ;

  useEffect(()=>{
    axios.get("http://localhost:3001/Users/valid" , {
      Headers : {
        accessToken : localStorage.getItem("accessToken")
      }
    }).then((Response) => {
      if (Response.data.error) {
        setAuthstate({...authstate , status : false})
      }
      else{
        setAuthstate({ userName : Response.data.userName , id : Response.data.id , status : true })
      }
    } )
  }, [])

  const logout = ()=>{
    localStorage.removeItem("accessToken");
    setAuthstate({...authstate , status : false});
  }
 
  return (
    <>
    <AuthContext.Provider value={{authstate , setAuthstate}} >
      <BrowserRouter>
      <nav>
        <li><Link to = '/' > Home </Link></li>
        <li><Link to = '/CreatePost' >Create a Post </Link></li>
        {
          !authstate.status ? (<>
            <li><Link to = '/Login' >Login </Link></li>
            <li><Link to = '/Registration' >Registration </Link></li>
          </>) :
          (<>
            <li><a onClick={logout} >Log Out</a> </li> 
            <li> <a> {authstate.userName} </a> </li>
          </>)
        }
        
      </nav>
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/CreatePost' element= {<CreatePost/>} />
          <Route path='/Posts/:id' element= {<Post/>} />
          <Route path='/Login' element= {<Login/>} />
          <Route path='/Registration' element= {<Registration/>} />
        </Routes>      
      </BrowserRouter>
     </AuthContext.Provider>
    </>
  );
}

export default App;
