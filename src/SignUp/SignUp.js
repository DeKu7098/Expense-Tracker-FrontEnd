import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import './SignUp.css';




const SignUp = () => {
  const history = useHistory();
   const inputEmailRef = useRef();
   const inputPassRef = useRef();
   const inputConfirmPassRef = useRef();
   
   const [isLogin, setIsLogin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   

   const switchHandler = () =>{
    setIsLogin((prevState) => !prevState);
   }

   const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPassRef.current.value;
    
  if(enteredPassword !== inputConfirmPassRef.current.value){
    alert("Confirm Password didn't Match");
    return;
  }
  let url;
  setIsLoading(true);
  if(isLogin){
    url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg"
  }else{
    url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg"
  }
  fetch(url,{
    method: 'POST',
    body:JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
}).then(res=>{
    setIsLoading(false)
    if(res.ok){
       
        console.log(res)
        alert('Successfully Registered')
       
        return res.json()
    }
    else{
        return res.json().then(data => {
            console.log(data.error.message)
            alert(data.error.message);
            
            
        })
    }
  }).then((data) => {
    history.replace('/WelcomePage');
  })



   };

   return (
    <div className='signupBody'>
      <h2>{ isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={submitHandler}>
      <input type="email" placeholder='Email' ref={inputEmailRef} required/>
      <input type="password" placeholder='Password' ref={inputPassRef}/>
      <input type="password" placeholder='Password' ref={inputConfirmPassRef}/>
      { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
           {isLoading && <p>Loading..</p>}
           <button
              type='button'
              className='signupBtn'
              onClick={switchHandler}
            >Sign Up</button>
      </form>
    </div>
  
  );
};



export default SignUp;