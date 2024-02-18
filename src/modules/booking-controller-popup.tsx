import React from "react";
import { TBooking } from "../models/booking";
import { Button } from "semantic-ui-react";

type TBookingGridProps = {
    showController: boolean;
    bookingBeingControlled: TBooking  | undefined;
    bookingsForSameDay: TBooking[];
    hideBookingController: () => void;
    moveBooking: (direction: string) => void;
  };
  
const BookingControllerPopup: React.FC<TBookingGridProps> = ({bookingBeingControlled, showController, bookingsForSameDay, hideBookingController, moveBooking}) => {
    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;

    const moveLeftIsDisabled = ():boolean => {
        const bookingDate = bookingBeingControlled?.from && new Date(bookingBeingControlled?.from);
        if(!bookingDate) return true;

        if(bookingDate.getHours() == 17 && bookingDate.getMinutes() == 0) return true;

        const tableHasOtherBookings = bookingsForSameDay.filter(x => 
            bookingBeingControlled.table_numbers.some((num) => x.table_numbers.includes(num) &&
            x.id != bookingBeingControlled.id)
        )
        const leftIsTaken = tableHasOtherBookings.some(x =>
            bookingBeingControlled.from - twoHoursInMilliseconds <= x.from &&
            x.from < bookingBeingControlled.from)

        if(leftIsTaken) return true;

        return false;
    }
    const moveUpIsDisabled = ():boolean => {
        return true;
    }
    const moveDownIsDisabled = ():boolean => {
        return true;
    }
    const moveRightIsDisabled = ():boolean => {
        const bookingDate = bookingBeingControlled?.from && new Date(bookingBeingControlled?.from);
        if(!bookingDate) return true;

        if(bookingDate.getHours() == 20 && bookingDate.getMinutes() == 30) return true;
        if(bookingDate.getHours() > 20) return true;

        const tableHasOtherBookings = bookingsForSameDay.filter(x => 
            bookingBeingControlled.table_numbers.some((num) => x.table_numbers.includes(num) &&
            x.id != bookingBeingControlled.id)
        )
        const rightIsTaken = tableHasOtherBookings.some(x =>
            x.from - bookingBeingControlled.from <= twoHoursInMilliseconds && 
            x.from > bookingBeingControlled.from)
            
        if(rightIsTaken) return true;

        return false;
    }
    
    return (
        <div className={`controller popup ${showController ? "" : "hidden"}`}>
            <div className="controller-buttons">
                <Button className="control-button" disabled={moveLeftIsDisabled()}  onClick={() => moveBooking("left")}>←</Button>
                <Button className="control-button" disabled={moveUpIsDisabled()}    onClick={() => moveBooking("up")}>↑</Button>
                <Button className="control-button" disabled={moveDownIsDisabled()}  onClick={() => moveBooking("down")}>↓</Button>
                <Button className="control-button" disabled={moveRightIsDisabled()} onClick={() => moveBooking("right")}>→</Button>
            </div>
            <button onClick={hideBookingController} className="close-button">Close</button>
        </div>
    );
}

export default BookingControllerPopup;