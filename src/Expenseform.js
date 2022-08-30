import { useEffect, useState } from "react";
import "./ExpenseForm.css";
import Displaydetails from "./Displaydetails";
import axios from "axios";
import { itemsliceactions } from "./Store"; 
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Expenseform = () => {
 const items = useSelector((state) => state.data.items);
 

  const makecsv = (data) =>
  {
    let string=JSON.stringify(data);

    return string.map(r => r.join(','));
  }

  const downloadfile = () =>
  {
  
   const blob1=new Blob([makecsv(items)],{type:'plain/text'})
   const file=URL.createObjectURL(blob1);
   const a = document.createElement('a');
   a.style.display = 'none';
   a.href = file;

  a.download = 'todo-1.csv';
  document.body.appendChild(a);
  a.click();
  }
  
  const dispatch = useDispatch();

  const [premium, setpremium] = useState(false);
  const [type, settype] = useState();
  const [date, setdate] = useState();
  const [amount, setamount] = useState();
  const [name, setname] = useState();
  const [values, setvalues] = useState([]);
  const [valid, setValid] = useState(false);
  const [set,beset]=useState(true);

  useEffect(() => {
    const showdata = async () => {
      const data = await axios.get(
        "https://react-http-61cce-default-rtdb.firebaseio.com/expense.json"
      );

      const response = await data.data;
      console.log(response);
      const expenses = [];
      for (const key in response) {
        expenses.push({
          id: key,
          type: response[key].type,
          date: response[key].date,
          amount: response[key].amount,
          name: response[key].name,
        });
      }

      setvalues(expenses);
      // dispatch(itemsliceactions.ReceivedData(expenses));
    };
    showdata();
  }, [items]);
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    console.log('hi');
    // bechange((state) => !state);

    // if (amount >= 10000 && set) {
    //   setpremium(state=>!state);
    //   return;
      
    // }
  

    const a = {
      type: type,
      date: date,
      amount: amount,
      name: name,
    };

   axios.post(
      
      "https://react-http-61cce-default-rtdb.firebaseio.com/expense.json",
      a
    ).then(res => {
      console.log(res);
      dispatch(
        itemsliceactions.inputData(a))
    }).catch(err => {
      console.log(err);
    })
    
    // const data = await response.json();
    // console.log(data);

    // if(response.ok)
    // {
    //   console.log(response);
     
        
    //   };
      
    
    
    
  };

  const typechangehandler = (event) => {
    settype(event.target.value);
  };

  const namechangehandler = (event) => {
    setname(event.target.value);
  };

  const datechangehandler = (event) => {
    setdate(event.target.value);
  };

  const amountchangehandler = (event) => {
    setamount(event.target.value);
  };


  const themechangehadler = () => {
    setValid((state) => !state);
   beset(state=>!state);
  };
  return (
    <div>
      <div className={`${valid ? "signupBody5" : "signupBody2"}`}>
        <h1>Enter Your Expense</h1>

        <form className="details" onSubmit={onsubmitHandler}>
          <div>
            <span>Type:</span>
            <select onChange={typechangehandler}>
              <option value="Car">Car</option>
              <option value="cash">Cash</option>
              <option value="bike">Bike</option>
              <option value="other">Other</option>
            </select>
            <span>
              <span>Name:</span>
              <input
                type="text"
                placeholder="What did you spend on?"
                onChange={namechangehandler}
              />
            </span>
          </div>

          <div>
            <span>Date:</span>
            <input type="date" onChange={datechangehandler} />
            <span>Amount:</span>
            <input
              type="number"
              placeholder="How much?"
              onChange={amountchangehandler}
            />
          </div>
        {!premium &&  <button type="submit" className="signupBtn">
            SUBMIT
          </button>}
          {premium && (
            <button
              type="submit"
              className="signupBtn"
              onClick={themechangehadler}
            >
              PREMIUM
            </button>
          )}
        </form>
        <button  onClick={downloadfile}>Download in CSV Format</button>
      </div>
      <Displaydetails
        details={values}
       
      ></Displaydetails>
    </div>
  );
};
export default Expenseform;