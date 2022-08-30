import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { itemsliceactions } from "./Store";


const Expense = (props) => {
   const nRef = useRef();
   const aRef = useRef();
   const dRef = useRef();
   const tRef = useRef();
   const [isEditing, setIsEditing] = useState(false);
   
   const dispatch = useDispatch();
    const onedit = () => {
        
        setIsEditing(prev => !prev);
      }
    const deletehandler = () => {
        axios.delete(
          `https://react-http-61cce-default-rtdb.firebaseio.com/expense/${props.id}.json`
        ).then(res => {
            console.log(res);
           dispatch(itemsliceactions.removeItem(props.id));
        }).catch(err => {
            console.log(err);
        })
    
    
        //setvalues(values.filter((value) => value.id !== id));
      };
 
   const onSubmitHandler = (event) => {
    event.preventDefault();
    const entName = nRef.current.value;
    const entAmount = aRef.current.value;
    const entType = tRef.current.value;
    const entDate = dRef.current.value;
    const inputData = {
        name: entName,
        amount: entAmount,
        type: entType,
        date: entDate,
    }

    axios.put(
        `https://react-http-61cce-default-rtdb.firebaseio.com/expense/${props.id}.json`,inputData
      ).then(res => {
          console.log(res);
          //props.retry(prev => !prev);
          dispatch(itemsliceactions.updateItem());
          setIsEditing(false);
         
      }).catch(err => {
          console.log(err);
      })
      
   };

  return (
    <li>
         <form onSubmit={onSubmitHandler}>
        <section className="productContainer">
       
        {!isEditing && <span>{props.name} </span>}
        {isEditing && <input
                        type='text'
                        ref={nRef}
                        id='name'
                        placeholder={props.name}
                        required />}
       
       {!isEditing && <span>{props.amount}</span>}
        {isEditing && <input
                        type='text'
                        ref={aRef}
                        id='amount'
                        placeholder={props.amount}
                        required />}
       
       {!isEditing && <span>{props.date} </span>}
        {isEditing && <input
                        type='date'
                        ref={dRef}
                        id='date'
                       
                        required />}
       
       {!isEditing && <span>{props.type}</span>}
        {isEditing && <input
                        type='text'
                        ref={tRef}
                        id='type'
                        placeholder={props.type}
                        required />}
       
       {!isEditing &&  <span><button onClick={onedit}>EDIT</button></span>}
        {isEditing &&  <span><button>SUBMIT</button></span>}
          
        {!isEditing &&  <span><button onClick={deletehandler}>DELETE</button></span>}
        {isEditing &&  <span><button onClick={onedit}>Cancel</button></span>}
      
       
     
     
     </section>
     </form>
    </li>
  )
};

export default Expense;