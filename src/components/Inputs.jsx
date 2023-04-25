import { useState, useEffect } from "react";
import { ReactComponent as Arrow} from "../assets/icon-arrow.svg"
import moment from "moment"
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"


const Inputs = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayAge, setDayAge] = useState("")
  const [monthAge, setMonthAge] = useState("")
  const [yearAge, setYearAge] = useState("")
  const [submit, setSubmit] = useState(false)
  const [errorData, setErrorData] = useState({})
 
  // Get current date
  const date = new Date();

  // Get birth date
  const birthDate = new Date(year, month - 1, day);

  // Calculate age
  function calcAge(e) {
    e.preventDefault()
    setErrorData(formValidation(day, month, year)) 
    setSubmit(true)
  }  
  useEffect(() => {
    
//   const days = differenceInDays(
//     new Date (year, month-1, 31),
//     new Date(year, month-1, day)
//   )
//   const months = differenceInMonths(
//     new Date(), 
//     new Date((date.getFullYear()-1), month - 1, day)
//   )
 
//   const years = differenceInYears(
//     new Date (), 
//     new Date(year, month-1, day)
//  )
    const ageInMilliseconds = date.getTime() - birthDate.getTime();
    const age = new Date(ageInMilliseconds);
    const years = age.getFullYear() - 1970;
    const months = age.getMonth() + 1;
    const days = age.getDate() - 1
    if(Object.keys(errorData).length === 0 && submit){
    setDayAge(days)
    setMonthAge(months)
    setYearAge(years) 
    }
  },[errorData])

  const formValidation = (day, month, year) => {
    const errors = {}
    if (!day) {
      errors.day = "This field is required"
    } else if (day > 31) {
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
        value={day}
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
         value={month}
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
        value={year}
        onChange={(e) => setYear(e.target.value)}/>
        {<small className="msg">{errorData.year}</small>}
      </div>
      <div id="border"></div>
    </div>
    <button type="submit" className="btn" onClick={calcAge}>
      <Arrow />
    </button>
     <div className="age">
     <div>
       {!submit ? <h1><span>- -</span>years</h1> : <h1><span>{yearAge}</span>years</h1>}
     </div>
     <div>
       {!submit ? <h1><span>- -</span>months</h1> : <h1><span>{monthAge}</span>months</h1>}
     </div>
     <div>
       {!submit ? <h1><span>- -</span>days</h1> : <h1><span>{dayAge}</span>days</h1>}
     </div>
   </div>
   </>
  );
};

export default Inputs;
