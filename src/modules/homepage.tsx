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
    const [bookingBeingControlled, setBookingBeingControlled] = useState<TBooking | undefined>(undefined);

    const expandBookingController = (booking: TBooking) => {
        setShowController(true);
        setBookingBeingControlled(booking);
    }

    const hideBookingController = () => setShowController(false);

    const getNewBooking = (booking: TBooking) => {
        booking.id = Math.random().toString(16).slice(2);
        const tempDate = forDate;
        tempDate.setHours(17,0,0,0)
        booking.from = tempDate.getTime()

        const two_seater_tables = [1,2,3,4,5,6,7,82,83]
        const four_seater_tables = [11,12,13,14,21,22,23,31,32,33,34,41,42,51,43,52,44,53,45,54,71,72,73]
        
        // 6-seaters
        const six_combo = [
            [1,2,3],[2,3,4],[3,4,5],[4,5,6],[5,6,7],
            [72,82],[73,83]
        ]

        // 8-seaters
        const eight_combo = [
            [11,12],[12,13],[13,14],
            [21,22],
            [31,32],[32,33],[33,34],
            [51,42],[52,43],[53,44],[54,45],
            [1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7]
        ]

        // 14-seats 
        const fourteen_combo = [[1,2,3,4,5,6,7]]

        // 16-seats
        const sixteen_combo = [
            [11,12,13,14],
            [31,32,33,34]
        ]

        if(booking.number_of_people <= 2) {
            for (let i = 0; i < two_seater_tables.length; i++) {
                const success = attemptToAssignToTable(two_seater_tables[i], booking);
                if(success) return;
            }
        }

        if (booking.number_of_people <= 4) {
            for (let i = 0; i < four_seater_tables.length; i++) {
                if(attemptToAssignToTable(four_seater_tables[i], booking)) return;
            }
        }

        if(booking.number_of_people <= 6) {
            for (let i = 0; i < six_combo.length; i++) {
                if(attemptToMergeAssignTables(3, six_combo[i], booking)) return;
            }
        }
        
        if(booking.number_of_people <= 8) {
            if(attemptToAssignToTable(75, booking)) return;

            for (let i = 0; i < eight_combo.length; i++) {
                if(attemptToMergeAssignTables(4,  eight_combo[i], booking)) return;
            }
        }

        if(booking.number_of_people <= 14) {
            for (let i = 0; i < fourteen_combo.length; i++) {
                if(attemptToMergeAssignTables(2,  fourteen_combo[i], booking)) return;
            }
        }

        if(booking.number_of_people <= 16) {
            for (let i = 0; i < sixteen_combo.length; i++) {
                if(attemptToMergeAssignTables(4,  sixteen_combo[i], booking)) return;
            }
        }

        alert("Could not find enough seats for the last order")
    }

    const getBookingsForSpecificDay = (day: number) => {
        return bookingData.filter(
            b => new Date(b.from).getDate() === new Date(day).getDate() &&
            new Date(b.from).getMonth() === new Date(day).getMonth() && 
            new Date(b.from).getFullYear() === new Date(day).getFullYear()
        );
    }

    const moveBooking = (direction: string) => {
        const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

        if(direction == "left") {
            const newFrom = bookingBeingControlled?.from ? bookingBeingControlled?.from - thirtyMinutesInMilliseconds : undefined
            updateBookingFromDate(bookingBeingControlled?.id, newFrom)
        }
        if(direction == "up") {

        }
        if(direction == "down") {

        }
        if(direction == "right") {
            const newFrom = bookingBeingControlled?.from ? bookingBeingControlled?.from + thirtyMinutesInMilliseconds : undefined
            updateBookingFromDate(bookingBeingControlled?.id, newFrom)
        }
    }

    const updateBookingFromDate = (bookingId, newDate) => {
        if(!bookingId || !newDate) return;

        const updatedBookings = bookingData.map((booking) => {
          if (booking.id === bookingId) {
            return { ...booking, from: newDate };
          }
          return booking; 
        });

        setBookingBeingControlled({
            ...bookingBeingControlled,
            from: newDate
        });

        setBookingData(updatedBookings);
      };

    const attemptToMergeAssignTables = (seatsPerTable: number, mergableTablesList: number[], booking: TBooking): boolean => {
        // TODO: extract bokingsforsameday into helper method
        const bookingsForSameDay = getBookingsForSpecificDay(booking.from);
        if(bookingsForSameDay.length == 0) {
            booking.table_numbers = mergableTablesList;
            setBookingData((prevData) => [...prevData, booking]);
            return true;
        } else {
            //TODO: CHECK if seats per table should be used
            let allTablesAreFreeForOrderTime = true;

            for (let i = 0; i < mergableTablesList.length; i++) {
                if(bookingsForSameDay.some(x => x.table_numbers.includes(mergableTablesList[i]))) allTablesAreFreeForOrderTime = false;
            }

            if(allTablesAreFreeForOrderTime) {
                booking.table_numbers = mergableTablesList;
                setBookingData((prevData) => [...prevData, booking]);
                return true;
            } else {
                // TODO: how to assign if day is partially occupied but still free
            }
        }
        return false;
    }

    const attemptToAssignToTable = (tableNumber: number, booking: TBooking) => {
        const bookingsForSameDay = getBookingsForSpecificDay(booking.from);
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
            bookingBeingControlled={bookingBeingControlled}
            bookingsForSameDay={getBookingsForSpecificDay(forDate.getTime())}
            hideBookingController={hideBookingController}
            moveBooking={moveBooking}
        />

        <BookingGrid
            forDate={forDate}
            expandBookingController={expandBookingController}
            bookingData={bookingData}
        />
    </>
}

export default HomePage;
