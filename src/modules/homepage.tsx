import React, {  useState } from 'react';
import DateCalendar from './date-calendar.tsx';
import BookingGrid from './booking-grid.tsx';
import BookingControllerPopup from './booking-controller-popup.tsx';
import AddBookingPopup from './add-booking-popup.tsx';
import { Button } from 'semantic-ui-react';
import { TBooking } from '../models/booking.ts';

function HomePage() {
    const [forDate, setForDate] = useState(new Date());
    const [showController, setShowController] = useState(false);
    const [showAddBooking, setShowAddBooking] = useState(false);

    const [bookingData, setBookingData] = useState<TBooking[]>([]);

    const getNewBooking = (booking: TBooking) => {
        const tempDate = forDate;
        tempDate.setHours(17,0,0,0)
        booking.from = tempDate.getTime()

        const two_seater_tables = [1,2,3,4,5,6,7,82,83]
        const four_seater_tables = [11,12,13,14,21,22,23,31,32,33,34,41,42,51,43,52,44,53,45,54,71,72,73]
        
        // 6-seaters
        const six_combo = [[72,82],[73,83]]

        // 8-seaters
        const eight_combo = [[21,22],[51,42],[52,43],[53,44],[54,45]]

        // 14-seats 
        const fourteen_combo = [[1,2,3,4,5,6,7]]

        // 16-seats
        const sixteen_combo = [[11,12,13,14],[31,32,33,34]]


        if(booking.number_of_people <= 2) {
            for (let i = 0; i < two_seater_tables.length; i++) {
                const success = attemptToAssignToTable(two_seater_tables[i], booking);
                if(success) return;
            }
        }

        if (booking.number_of_people <= 4) {
            for (let i = 0; i < four_seater_tables.length; i++) {
                const success = attemptToAssignToTable(four_seater_tables[i], booking);
                if(success) {
                    return;
                }
            }
        }

        if(booking.number_of_people <= 6) {

        }
        
        if(booking.number_of_people <= 8) {
            const success = attemptToAssignToTable(75, booking);
            if(success) return;
        }

        if(booking.number_of_people <= 14) {

        }

        if(booking.number_of_people <= 16) {

        }

        console.log(booking)
        console.log(bookingData)
    }

    const attemptToMergeTable = (seatsNeeded: number, seatsPerTable: number, mergableTablesList: number[], booking: TBooking) => {
        //const bookingForSameDay = bookingData.filter(b => new Date(b.from).getDate() === new Date(booking.from).getDate());
        //const bookingsForSameTable = bookingForSameDay.filter(b => b.table_numbers.some(t => t == tableNumber));

    }

    const attemptToAssignToTable = (tableNumber: number, booking: TBooking) => {
        const bookingsForSameDay = bookingData.filter(b => new Date(b.from).getDate() === new Date(booking.from).getDate());
        const bookingsForSameTable = bookingsForSameDay.filter(b => b.table_numbers.some(t => t == tableNumber));

        if(bookingsForSameTable.length == 0) {
            booking.table_numbers = [tableNumber];
            setBookingData((prevData) => [...prevData, booking]);
            return true;
        } else if (bookingsForSameTable.length == 1) {
            const takenOn = new Date(bookingsForSameTable[0].from);
            const availableTime = new Date(booking.from);

            if(takenOn.getHours() <= 18) {
                availableTime.setHours(takenOn.getHours() + 2)
                availableTime.setMinutes(takenOn.getMinutes())
                booking.from = availableTime.getTime()
                booking.table_numbers = [tableNumber];
                
                setBookingData((prevData) => [...prevData, booking]);
                return true;
            }
            if (takenOn.getHours() >= 19) {
                availableTime.setHours(takenOn.getHours() - 2)
                availableTime.setMinutes(takenOn.getMinutes())
                booking.from = availableTime.getTime()
                booking.table_numbers = [tableNumber];

                setBookingData((prevData) => [...prevData, booking]);
                return true;
            }
        }
        return false;
    }

    return <>
        <div className="homepage-header">
            <DateCalendar 
                forDate={forDate} 
                setForDate={setForDate}
            />

            <Button className="add-booking" onClick={() => setShowAddBooking(true)}>
                Add Booking
            </Button>
        </div>

        <AddBookingPopup 
            onSubmit={getNewBooking}
            showAddBooking={showAddBooking}
            setShowAddBooking={setShowAddBooking}
        />

        <BookingControllerPopup 
            showController={showController}
        />

        <BookingGrid
            forDate={forDate}
            setShowController={setShowController}
            bookingData={bookingData}
        />
    </>
}

export default HomePage;
