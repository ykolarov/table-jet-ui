import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateCalendar({forDate, setForDate}) {
    return (
      <div className="calendar">
        <DatePicker 
          selected={forDate} 
          onChange={(date) => setForDate(date)}
        />
      </div>
    )
  };

export default DateCalendar;
