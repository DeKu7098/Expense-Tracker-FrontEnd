import { useState } from 'react';
import './Displaydetails.css';
import Expense from './Expense';

const Displaydetails = (props) => {
  
  // console.log(props);

  let [retry, setRetry] = useState(false);
  const display = props.details.map((data) => {

   return  <Expense 
             id={data.id}
             key={data.id}
             name={data.name}
             type={data.type}
             amount={data.amount}
             date={data.date}
             retry={setRetry}
             />
})
  

  return(
    <li>
      <section className="productContainer11">
    <span>NAME</span>
       <span>AMOUNT</span>
       <span>DATE</span>

       <span>TYPE</span>
    
     </section>
    <ul>{display}</ul>
    </li>
  )
 
};

export default Displaydetails;