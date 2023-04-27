import { useState, useEffect } from "react";
import { ReactComponent as Arrow} from "../assets/icon-arrow.svg"
import moment from "moment"



const Inputs = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayAge, setDayAge] = useState("")
  const [monthAge, setMonthAge] = useState("")
  const [yearAge, setYearAge] = useState("")
  const [submit, setSubmit] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [greetings, setGreetings] = useState(false)
  const [errorData, setErrorData] = useState({})
 
  const date = new Date();
  const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let feb = months[1];
  let apr = months[3];
  let jun = months[5];
  let sep = months[8];
  let nov = months[10];
  
    
    const calcAge = (e) => {
      e.preventDefault();
      setErrorData(formValidation(day, month, year)) 
      setSubmit(true)
    };
    useEffect(() => {
      const birthday = moment(`${day}/${month}/${year}`, "DD/MM/YYYY");
      const today = moment();
      const yearAge = today.diff(birthday, "years");
      birthday.add(yearAge, "years");
      const monthAge = today.diff(birthday, "months");
      birthday.add(monthAge, "months");
      const dayAge = today.diff(birthday, "days");
      if(Object.keys(errorData).length === 0 && submit){
          setDayAge(dayAge)
          setMonthAge(monthAge)
          setYearAge(yearAge) 
          setRotate(!rotate)
          }
      if (dayAge=== 0 && monthAge === 0) {
        setGreetings(true)
      }
    },[errorData])
    
  

  const formValidation = (day, month, year) => {
    const errors = {}
    if (!day) {
      errors.day = "This field is required"
    } else if (day > 31) {
      errors.day = "Must be a valid day"
    } else  if (day > 28 && month === feb) {
      errors.day = "Must be a valid day";
    } else if (day > 30 && month === apr) {
      errors.day = "Must be a valid day"
    } else if (day >30 && month === jun) {
      errors.day = "Must be a valid day"
    } else if (day > 30 && month === sep) {
      errors.day = "Must be a valid day"
    } else if (day > 30 && month === nov) {
      errors.day = "Must be a valid day"
    }
    if (!month) {
      errors.month = "This field is required"
    } else if (month > 12) {
      errors.month = "Must be a valid month"
    }
    if (!year) {
      errors.year = "This field is required"
    } else if (year > date.getFullYear()) {
      errors.year = "Must be in the past"
    }
    return errors
  }

  return (
    <>
    <div className="form">
      <div className="input-control">
        <label htmlFor="day" className={`${errorData.day && "error"}`}>DAY</label>
        <input type="number"
        name="day"
        placeholder="DD"
        min="1"
        max="31" 
        className={`input ${errorData.day && "input input-error"}`}
        onChange={(e) => setDay(e.target.value)}/>
        {<small className="msg">{errorData.day}</small>}
      </div>
      <div className="input-control">
        <label htmlFor="month" className={`${errorData.month && "error"}`}>MONTH</label>
        <input type="number"
         name="month"
         placeholder="MM" 
         min="1"
         max="12"
         className={`input ${errorData.month && "input input-error"}`}
         onChange={(e) => setMonth(e.target.value)}/>
         {<small className="msg">{errorData.month}</small>}
      </div>
      <div className="input-control">
        <label htmlFor="year" className={`${errorData.year && "error"}`}>YEAR</label>
        <input type="number"
        name="year" 
        placeholder="YYYY" 
        min="1900"
        max="2023"
        className={`input ${errorData.year && "input input-error"}`}
        onChange={(e) => setYear(e.target.value)}/>
        {<small className="msg">{errorData.year}</small>}
      </div>
      <div id="border"></div>
    </div>
  <button type="submit" className={`btn ${submit && "rotate"}`} onClick={calcAge}>
      <Arrow />
    </button>
     <div className="age">
     <div className={rotate ? "rotate" : "" }>
       {!submit ? <h1><span>- -</span>years</h1> : <h1><span>{yearAge}</span>years</h1>}
     </div>
     {!greetings && <div className={rotate ? "rotate" : ""}>
       {!submit ? <h1><span>- -</span>months</h1> : <h1><span>{monthAge}</span>months</h1>}
     </div>}
     {!greetings && <div className={rotate ? "rotate" : ""}>
       {!submit ? <h1><span>- -</span>days</h1> : <h1><span>{dayAge}</span>days</h1>}
     </div>}
     <div className={!greetings ? "no-greetings" : "rotate greetings"}>
       <h1><span id="bdy">HA</span>PPY</h1>
       <h1><span id="bdy">BIR</span>THDAY</h1>
       <h1><span id="bdy">DM</span>AMA!</h1>
     </div>
   </div>
   </>
  );
};

export default Inputs;
