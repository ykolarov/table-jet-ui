export type TTable = {
    number: number,
    seatsCount: number,
    disabled?: boolean,
    booked_at?: TBooking[]
}

type TBooking = {
    from: Date,
    to: Date,
    booked_for: string,
}