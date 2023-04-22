import { useState } from "react";
import { ReactComponent as Arrow} from "../assets/icon-arrow.svg"
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"


const Inputs = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayAge, setDayAge] = useState("")
  const [monthAge, setMonthAge] = useState("")
  const [yearAge, setYearAge] = useState("")
  const [dayError, setDayError] = useState("")
  const [monthError, setMonthError] = useState("")
  const [errorData, setErrorData] = useState({})
  const date = new Date()
  

  
  // Get current date
  const currentDate = new Date();

  // Get birth date
  const birthDate = new Date(year, month - 1, day);

  // Calculate age
  function calcAge() {
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const age = new Date(ageInMilliseconds);
    const years = age.getFullYear() - 1970;
    const months = age.getMonth() + 1;
    const days = age.getDate() - 1
    if (day == "" || month == "" || year == "") {
      return
    } else {
    setDayAge(days)
    setMonthAge(months)
    setYearAge(years)
    }
  }  

  
  
  

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
 

  return (
    <>
    <div className="form">
      <div className="input-control">
        <label htmlFor="day" className={`${day > 31 && "error"}`}>DAY</label>
        <input type="number"
        name="day"
        placeholder="DD"
        min="1"
        max="31" 
        className={`input ${day > 31 && "input input-error"}`}
        value={day}
        onChange={(e) => setDay(e.target.value)}/>
        {day > 31 && <small className="msg">Must be a valid day</small>}
      </div>
      <div className="input-control">
        <label htmlFor="month" className={`${month > 12 && "error"}`}>MONTH</label>
        <input type="number"
         name="month"
         placeholder="MM" 
         min="1"
         max="12"
         className={`input ${month > 12 && "input input-error"}`}
         value={month}
         onChange={(e) => setMonth(e.target.value)}/>
         {month > 12 && <small className="msg">Must be a valid month</small>}
      </div>
      <div className="input-control">
        <label htmlFor="year" className={`${year > 2023 && "error"}`}>YEAR</label>
        <input type="number"
        name="year" 
        placeholder="YYYY" 
        min="1900"
        max="2023"
        className={`input ${year > 2023 && "input input-error"}`}
        value={year}
        onChange={(e) => setYear(e.target.value)}/>
        {year > 2023 && <small className="msg">Must be in the past</small>}
      </div>
      <div id="border"></div>
    </div>
    <button type="submit" className="btn" onClick={calcAge}>
      <Arrow />
    </button>
     <div className="age">
     <div>
       {!year ? <h1><span>- -</span>years</h1> : <h1><span>{yearAge}</span>years</h1>}
     </div>
     <div>
       {!month ? <h1><span>- -</span>months</h1> : <h1><span>{monthAge}</span>months</h1>}
     </div>
     <div>
       {!day ? <h1><span>- -</span>days</h1> : <h1><span>{dayAge}</span>days</h1>}
     </div>
   </div>
   </>
  );
};

export default Inputs;
