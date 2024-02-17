import '../booking-grid.scss';
import { TTable } from '../models/table';

function TableNumbersColumn() {
  let tableNumberList: (TTable | undefined)[] = [
    undefined,
    { number: 1, seatsCount: 2, can_merge_down: true },
    { number: 2, seatsCount: 2, can_merge_up: true, can_merge_down: true },
    { number: 3, seatsCount: 2, can_merge_up: true, can_merge_down: true },
    { number: 4, seatsCount: 2, can_merge_up: true, can_merge_down: true },
    { number: 5, seatsCount: 2, can_merge_up: true, can_merge_down: true },
    { number: 6, seatsCount: 2, can_merge_up: true, can_merge_down: true },
    { number: 7, seatsCount: 2, can_merge_up: true },
    undefined,
    { number: 11, seatsCount: 4, can_merge_down: true },
    { number: 12, seatsCount: 4, can_merge_up: true, can_merge_down: true },
    { number: 13, seatsCount: 4, can_merge_up: true, can_merge_down: true },
    { number: 14, seatsCount: 4, can_merge_up: true },
    undefined,
    { number: 21, seatsCount: 4, can_merge_down: true },
    { number: 22, seatsCount: 4, can_merge_up: true },
    { number: 23, seatsCount: 4},
    undefined,
    { number: 31, seatsCount: 4, can_merge_down: true  },
    { number: 32, seatsCount: 4, can_merge_up: true, can_merge_down: true },
    { number: 33, seatsCount: 4, can_merge_up: true, can_merge_down: true },
    { number: 34, seatsCount: 4, can_merge_up: true },
    undefined,
    { number: 41, seatsCount: 4 },
    { number: 42, seatsCount: 4, can_merge_down: true },
    { number: 51, seatsCount: 4, can_merge_up: true },
    { number: 43, seatsCount: 4, can_merge_down: true },
    { number: 52, seatsCount: 4, can_merge_up: true },
    { number: 44, seatsCount: 4, can_merge_down: true },
    { number: 53, seatsCount: 4, can_merge_up: true },
    { number: 45, seatsCount: 4, can_merge_down: true },
    { number: 54, seatsCount: 4, can_merge_up: true },
    undefined,
    { number: 71, seatsCount: 4 },
    { number: 72, seatsCount: 4, can_merge_down: true },
    { number: 82, seatsCount: 2, can_merge_up: true },
    { number: 73, seatsCount: 4, can_merge_down: true },
    { number: 83, seatsCount: 2, can_merge_up: true },
    { number: 75, seatsCount: 8 },
  ];
      
  return (
    tableNumberList
  );
}

export default TableNumbersColumn;
