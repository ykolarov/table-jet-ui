export type TBooking = {
    from: number,
    booked_for: string,
    phone_number: string,
    number_of_people: number,
    table_numbers: number[],
    special_note?: string
}
