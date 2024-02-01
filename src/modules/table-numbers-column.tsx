import '../booking-grid.scss';
import { TTable } from '../models/table';

function TableNumbersColumn() {
  let tableNumberList: (TTable | undefined)[] = [
    undefined,
    { number: 1, seatsCount: 2 },
    { number: 2, seatsCount: 2 },
    { number: 3, seatsCount: 2 },
    { number: 4, seatsCount: 2 },
    { number: 5, seatsCount: 2 },
    { number: 6, seatsCount: 2 },
    { number: 7, seatsCount: 2 },
    undefined,
    { number: 11, seatsCount: 4 },
    { number: 12, seatsCount: 4 },
    { number: 13, seatsCount: 4 },
    { number: 14, seatsCount: 4 },
    undefined,
    { number: 21, seatsCount: 4 },
    { number: 22, seatsCount: 4 },
    { number: 23, seatsCount: 4 },
    undefined,
    { number: 31, seatsCount: 4 },
    { number: 32, seatsCount: 4 },
    { number: 33, seatsCount: 4 },
    { number: 34, seatsCount: 4 },
    undefined,
    { number: 41, seatsCount: 4 },
    { number: 42, seatsCount: 4 },
    undefined,
    { number: 51, seatsCount: 4 },
    { number: 52, seatsCount: 4 },
    { number: 53, seatsCount: 4 },
    { number: 54, seatsCount: 4 },
    undefined,
    undefined,
    { number: 71, seatsCount: 4 },
    { number: 72, seatsCount: 4 },
    { number: 73, seatsCount: 4 },
    { number: 74, seatsCount: 4 },
    { number: 75, seatsCount: 8 },
    undefined,
    { number: 81, seatsCount: 4 },
    { number: 82, seatsCount: 4 }
  ];
      
  return (
    tableNumberList
  );
}

export default TableNumbersColumn;
