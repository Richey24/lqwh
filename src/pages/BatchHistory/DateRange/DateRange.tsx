import React, { useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css"; // Import custom CSS for styling

const DateRangePicker = () => {
     const [startDate, setStartDate] = useState<any>(null);
     const [endDate, setEndDate] = useState<any>(null);

     useEffect(() => {
          const today = new Date();
          const defaultStartDate = new Date(
               today.getFullYear(),
               today.getMonth(),
               today.getDate() - 6,
          );
          setStartDate(defaultStartDate);
          setEndDate(today);
     }, []);

     const handleStartDateChange = (date) => {
          setStartDate(date);
     };

     const handleEndDateChange = (date) => {
          setEndDate(date);
     };

     return (
          <div
               style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
               }}
          >
               <FormGroup>
                    <DatePicker
                         id="startDate"
                         selected={startDate}
                         onChange={handleStartDateChange}
                         className="form-control"
                         calendarClassName="custom-calendar"
                    />
               </FormGroup>
               <span style={{ height: "100%", marginBottom: 16 }}>-</span>
               <FormGroup>
                    <DatePicker
                         id="endDate"
                         selected={endDate}
                         onChange={handleEndDateChange}
                         className="form-control"
                         calendarClassName="custom-calendar"
                    />
               </FormGroup>
          </div>
     );
};

export default DateRangePicker;
