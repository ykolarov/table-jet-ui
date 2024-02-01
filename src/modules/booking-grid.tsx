import '../booking-grid.scss';
import HoursAvailableRow from './hours-available-row.tsx';
import TableNumbersColumn from './table-numbers-column.tsx';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';

function BookingGrid() {
  const COLUMNS_COUNT = 16;
  const ROWS_COUNT = 45;

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
              mid
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
      <Grid className="no-gutters" >
        <Grid.Row>
          {getColumns()}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default BookingGrid;
