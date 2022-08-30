import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Expenseform from '../Expenseform';
import LogoutButton from './LogoutButton';
import './WelcomePage.css';


const WelcomePage=()=>{
     const token=useSelector(state => state.auth.IDTOKEN);
     
     const verifyemailhandler=()=>{
        
 
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAeu0fr6VeKS0nbxCqGxxis7mzJiLNuWGg',
        {
 
         method: 'POST',
         body:JSON.stringify({
            
         idToken:token,
         requestType:'VERIFY_EMAIL',
           }),
           headers:{
             'Content-Type': 'application/json'
         
        }
     }
        
        ).then(res=>{
         if(res.ok)
         {
             alert('check your email for verification');
         }
         else{
             alert('aunthentication failed');
         }
        })
     }
 
     
     return(
 <div>
         <div className='style'>
             Welcome To Expense Tracker
             <button style={{color:'black',backgroundColor:'greblacky'}} onClick={verifyemailhandler}>Verify Email</button>
             <div className='style2'>Your profile is incomplete <NavLink to='/CompleteProfile'>Complete Now</NavLink>
             
             </div>
             <LogoutButton/>
         </div>
         <Expenseform />
         </div>
 
     )
 };

export default WelcomePage;