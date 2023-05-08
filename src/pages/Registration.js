import React from 'react';
import {Formik , Form , Field , ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

    let navigate = useNavigate();

  

    const initialValues = {
        userName : "",
        passWord : ""
    }

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/Users" , data).then( (responce)=> {
        window.alert("Logged succefully") ;
        navigate("/");
        } )
    }

    const validationSchema = yup.object().shape({
        userName: yup.string().min(3).required(),
        passWord : yup.string().min(5).max(20).required(),
    });
  return (
    <div className='creatFormPage' >
        <h3> Create a New Post</h3>

        <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema = {validationSchema} >
            <Form className='form' >
                <label htmlFor='inputField' >User Name : 
                  <Field id = "inputField" name = "userName"  />
                  <ErrorMessage name='userName' component = "span" />
                </label>
                

                <label htmlFor='inputField' >PassWord : 
                  <Field id = "inputField" name = "passWord" type = "password" />
                  <ErrorMessage name='passWord' component = "span" />
                </label>

                <button type="submit" >Register</button>

            </Form>
        </Formik>
    </div>
  )
}

export default Registration