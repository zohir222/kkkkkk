import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useState } from 'react';
import { AuthContext } from '../Helper/AuthContext';
import { useContext } from 'react';

function Post() {

    const [postState , setPostState] = useState({}) ;
    const [comments , setComments] = useState([]) ;
    const [newComments , setNewComments] = useState("") ;

    const {authstate} = useContext(AuthContext);

    let {id} = useParams();

    useEffect(()=>{
        axios.get(`https://kkkkkbackend-production.up.railway.app/Posts/Byid/${id}`).then( (responce)=> {
        setPostState(responce.data) ;
        } );
        axios.get(`https://kkkkkbackend-production.up.railway.app/Comments/${id}`).then( (responce)=> {
          setComments(responce.data) ;
        } )
    } , [id ])

    const addComment = ()=>{
      axios.post(`https://kkkkkbackend-production.up.railway.app/Comments/` , 
      { commentBody : newComments , username : authstate.userName , PostId : id  } ,
      {headers : { accessToken : localStorage.getItem ("accessToken") }} )
      .then ( (responce) => {
        if (responce.data.error){
          alert(responce.data.error);
        }
        else {     
          axios.get(`https://kkkkkbackend-production.up.railway.app/Comments/${id}`).then( (responce)=> {
            setComments(responce.data) ;})
          setNewComments("");
          
        }
        
      } )  
    }

    const deleteComment = (idd)=>{
      axios.delete(`https://kkkkkbackend-production.up.railway.app/Comments/${idd}`, {
        headers : { accessToken : localStorage.getItem("accessToken") }
      } ).then( (responce)=> {
        setComments(comments.filter( (val)=> {return val.id !== idd } ));
       alert(responce.data)
      } )
    }
    return (
      <div className='Home' >
      <h1>Post : {id} </h1>
      <div className='containerWithComment'  >
      
          <div className='post' >
            <div className='title' >
                <h4>{ postState.title }</h4> 
            </div>
            <div className='content' >
                { postState.postText }
            </div>
            <div className='author' >
                <h4><i>Author :</i> { postState.userName }</h4> 
            </div>
          </div>

          <div className='commentSection' >
            <p>Comment section : </p>
            {
              comments.map((comm) => {
                return(
                  <>
                  <textarea key={comm.id} defaultValue ={comm.commentBody +"by...."+ comm.username} />
                  { authstate.userName === comm.username && (<button onClick={ ()=> {deleteComment(comm.id)  }} >delete</button>) }
                  </>
                );
              })
            }
            <textarea 
            id = "commentArea" 
            type="text" 
            aria-multiline = "true" 
            placeholder='Comments' 
            autoComplete='off' 
            value={newComments } 
            onChange = {(e)=> {setNewComments(e.target.value)} } />
            <button className='commentButton' onClick={addComment} > <i>Send Comment</i> </button>
          </div>
      
      
      </div>
  </div>
  )
}

export default Post