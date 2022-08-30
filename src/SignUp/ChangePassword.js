import './ChangePassword.css';
import {React,useRef} from 'react';
import { useHistory } from 'react-router-dom';
const ChangePassword=()=>{

    const inputEmailRef=useRef();
   
    const history=useHistory();

   const passwordchangeHandler=(event)=>{
    event.preventDefault();
        const EmailId=inputEmailRef.current.value;
        console.log(EmailId);
        

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg',
    {
        method: 'POST',
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:EmailId,
          }),
          headers:{
            'Content-Type': 'application/json'
          }

    })
    .then(res=>{
        if(res.ok)
        {
            alert('link sent to the entered email');
            history.replace('/');
           
            }
        }

    )
   }

    return(

   
    <div className='signupBody1'>
    <h2>Entered Your Registered Email</h2>
    <form onSubmit={passwordchangeHandler} >
     
        <input type="email" placeholder='Email' ref={inputEmailRef} required />
        <button type='submit' ClassName='signupBtn1' >SEND EMAIL</button>
 
    </form>
    
</div>
    )
}


export default ChangePassword;