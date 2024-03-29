export type TBooking = {
    id: string,
    from: number,
    booked_for: string,
    phone_number: string,
    number_of_people: number,
    table_numbers: number[],
    special_note?: string,
    background_colour?: string
}
