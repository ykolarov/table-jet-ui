import React, {  useState } from 'react';
import DateCalendar from './date-calendar.tsx';
import BookingGrid from './booking-grid.tsx';

function HomePage() {
    const [forDate, setForDate] = useState(new Date());

    return <>
        <DateCalendar 
            forDate={forDate} 
            setForDate={setForDate}
        />

        <BookingGrid
            forDate={forDate}
        />
    </>
}

export default HomePage;
