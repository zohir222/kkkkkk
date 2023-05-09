import axios from 'axios';
import  {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home() {
    const [postState , setPostState] = useState([]) ;

    useEffect(()=>{
        axios.get("https://kkkkkbackend-production.up.railway.app/Posts").then( (responce)=> {
        setPostState(responce.data) ;
        } )
    } , [])

    const navigate = useNavigate();

    const likeaPost = (postId)=>{
        axios.post( "https://kkkkkbackend-production.up.railway.app/Likes" , { PostId : postId } , { headers : { accessToken : localStorage.getItem("accessToken") }  } )
        .then((responce)=> {
            alert(responce.data);
            setPostState(postState.map((likedPost)=> 
            { 
             if(likedPost.id === postId){
                if(responce.data === "like success .. !!!"){
                    return {...likedPost , Likes: [...likedPost.Likes , 0] }
                }
                else if (responce.data === "Unlike success .. !!!"){
                    const likeArray = likedPost.Likes ;
                    likeArray.pop();
                    return {...likedPost , Likes: likeArray  }
                }
                
             }
             else{
                return likedPost ;
             }
              }))
        } )
    }

  return (
    <div className='Home' >
        <h1>Liste of Posts</h1>
        <div className='container'  >
        { 
        postState.map((post) => {  
            return (
            <div className='post' key={post.id}  >
            <div className='title' >
                <h4>{ post.title }</h4> 
            </div>
            <div className='content' onClick={()=> navigate(`/Posts/${post.id}`) } >
                { post.postText }
            </div>
            <div className='author' >
                <h4><i>Author :</i> { post.userName }</h4> 
                <ThumbUpAltIcon style={{width : "20%" , marginLeft : "auto"}} onClick={()=> {likeaPost(post.id)} } />
                <label style={{marginRight : "1rem"}}> {post.Likes.length }</label>
            </div>
            </div>
        );
        })
        }
        </div>
    </div>
  )
}

export default Home