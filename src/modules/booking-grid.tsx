import '../booking-grid.scss';
import HoursAvailableRow from './hours-available-row.tsx';
import TableNumbersColumn from './table-numbers-column.tsx';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';
import { TBooking } from '../models/booking.ts';

function BookingGrid({forDate, setShowController, bookingData}) {
  const COLUMNS_COUNT = 13;
  const ROWS_COUNT = 40;
  const STARTING_HOUR = 17;
  const BOOKING_HOUR_DURATION = 2;

  const [bookings, setBookings] = useState<TBooking[]>([]);

  useEffect(() => {
    const filtered = bookingData.filter(b => new Date(b.from).getDate() === forDate.getDate());
    setBookings([...filtered]);
  }, [bookingData, forDate]);
  
  const convertTimeIndexToHour = (index: number): number => {
    index -= 1;
    index = STARTING_HOUR + 0.5 * index;
    return index;
  }

  const convertDateToHour = (dateMillis: number): number => {
    const date = new Date(dateMillis)
    const hours = date.getHours()
    const minutes = date.getMinutes() / 60

    return (Math.floor((hours + minutes) * 100) / 100)
  }

  const getBookingData = (currentTableNumber: number | undefined, columnIndex: number) => {
    if (currentTableNumber === undefined) return "-"

    const currentRowTime = convertTimeIndexToHour(columnIndex);

    const thisRowIsBooked = bookings.find(b => 
      (convertDateToHour(b.from) === currentRowTime ||
      (convertDateToHour(b.from) < currentRowTime && convertDateToHour(b.from) + BOOKING_HOUR_DURATION > currentRowTime)) &&
      b.table_numbers.includes(currentTableNumber)
    )

    return <p className={`${thisRowIsBooked ? "booked": ""}`}>{thisRowIsBooked ? thisRowIsBooked?.booked_for : "-"}</p>
  }

  const getRows = (forColumn: number) => {
    const rows: React.JSX.Element[] = []

    for (let index = 0; index < ROWS_COUNT; index++) {
      rows.push(
        <Grid.Row>
          <div className='row-data no-select'>
          { // first and last row
            ((index === 0 || index === ROWS_COUNT-1) && 
              (forColumn !== 0 && forColumn !== COLUMNS_COUNT-1)) &&
            <p>
              { HoursAvailableRow()[forColumn-1] 
                ? HoursAvailableRow()[forColumn-1] 
                : "-"
              }
            </p> 
          }
          { // first and last column
            (forColumn === 0 || forColumn === COLUMNS_COUNT-1) &&
            <p>
              { TableNumbersColumn()[index] 
                ? TableNumbersColumn()[index]?.number 
                : "-"
              }
            </p>
          }
          { // all other columns
            (forColumn !== 0 && forColumn !== COLUMNS_COUNT-1 
              && index !== 0 && index !== ROWS_COUNT-1) &&
            <p>
              {getBookingData(TableNumbersColumn()[index]?.number, forColumn)}
            </p> 
          }
          
          </div>
        </Grid.Row>
      )
    }

    return rows;
  }

  const getColumns = () => {
    const columns: React.JSX.Element[] = []

    for (let index = 0; index < COLUMNS_COUNT; index++) {
      columns.push(
        <Grid.Column>
          {getRows(index)}
        </Grid.Column>
      )
    }

    return columns;
  }

  return (
    <div className="booking-grid">
      <Grid className="no-gutters" columns={13} >
        <Grid.Row>
          {getColumns()}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default BookingGrid;
