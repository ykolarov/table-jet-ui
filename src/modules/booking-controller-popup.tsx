import React from "react";
import { TBooking } from "../models/booking";

type TBookingGridProps = {
    showController: boolean;
    setBookingData: (bookings: TBooking[]) => void;
    hideBookingController: () => void;
    bookingBeingControlled: TBooking  | undefined;
  };
  
const BookingControllerPopup: React.FC<TBookingGridProps> = ({bookingBeingControlled, setBookingData, showController, hideBookingController}) => {
    return (
        <div className={`controller popup ${showController ? "" : "hidden"}`}>
            <p>{bookingBeingControlled?.booked_for}</p>
            <p>{bookingBeingControlled?.table_numbers}</p>
            <button onClick={hideBookingController} className="action-button">Close</button>
        </div>
    );
}

export default BookingControllerPopup;