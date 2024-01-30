import '../booking-grid.scss';
import HoursAvailableRow from './hours-available-row';
import TableNumbersColumn from './table-numbers-column';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function BookingGrid() {
  const COLUMNS_COUNT = 13;
  const ROWS_COUNT = 45;

  const getRows = () => {
    const rows = []

    for (let index = 0; index < ROWS_COUNT; index++) {
      rows.push(
        <Grid.Row>
          0
        </Grid.Row>
      )
    }

    return rows;
  }

  const getColumns = () => {
    const columns = []

    for (let index = 0; index < COLUMNS_COUNT; index++) {
      columns.push(
        <Grid.Column width={1}>
          {getRows()}
        </Grid.Column>
      )
    }

    return columns;
  }

  return (
    <div className="booking-grid">
      <Grid>
        <Grid.Row>
          {getColumns()}
        </Grid.Row>
      </Grid>
    </div>
    // <HoursAvailableRow/>
    //<TableNumbersColumn/>
  );
}

export default BookingGrid;
