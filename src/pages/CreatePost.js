import React from 'react';
import {Formik , Form , Field , ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    let navigate = useNavigate();

    const initialValues = {
        title : "" ,
        postText : "",
        userName : ""
    }

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/Posts" , data , { 
           headers : {  accessToken : localStorage.getItem ("accessToken")  }
        } ).then( (responce)=> {
          if (responce.data.error){
            alert(responce.data.error)
          }
          else{
            window.alert("posted succefully") ;
            navigate("/");
          }
        
        } )
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required(),
        postText : yup.string().min(5).required(),
        userName: yup.string().min(3).required()
    });
  return (
    <div className='creatFormPage' >
        <h3> Create a New Post</h3>

        <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema} >
            <Form className='form' >
                <label htmlFor='inputField' >Title : 
                  <Field id = "inputField" name = "title" placeholder = "ex : Title ...." />
                  <ErrorMessage name='title' component = "span" />
                </label>
                

                <label htmlFor='inputField' >Post : 
                  <Field id = "inputField" name = "postText" placeholder = "ex : Post ...." />
                  <ErrorMessage name='postText' component = "span" />
                </label>
                

                <label htmlFor='inputField' >Name : 
                  <Field id = "inputField" name = "userName" placeholder = "ex : Name ...." />
                  <ErrorMessage name='userName' component = "span" />
                </label>
                

                <button type="submit" >Submit the form</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost