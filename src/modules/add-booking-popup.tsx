import React, { useState } from 'react';
import { TBooking } from '../models/booking';

type TBookingFormProps = {
    onSubmit: (booking: TBooking) => void;
    setShowAddBooking: (to: boolean) => void;
    showAddBooking: boolean;
};

const AddBookingPopup: React.FC<TBookingFormProps> = ({ showAddBooking, setShowAddBooking, onSubmit }) => {
    const [booking, setBooking] = useState<TBooking>({
        from: 0,
        booked_for: '',
        phone_number: '07',
        number_of_people: 1,
        table_numbers: [],
        special_note: '',
        id: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit(booking);

        hidePopup();
    };

    const resetInputFields = () => {
        setBooking({
            from: 0,
            booked_for: '',
            phone_number: '07',
            number_of_people: 1,
            table_numbers: [],
            special_note: '',
        });
    }

    const hidePopup =() => {
        setShowAddBooking(false);
        resetInputFields();
    }

    return (
        <div className={`popup ${showAddBooking ? "" : "hidden"}`}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="booked_for">Name:</label>
                    <input
                        type="text"
                        id="booked_for"
                        name="booked_for"
                        value={booking.booked_for}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="number_of_people">Seats:</label>
                    <input
                        type="number"
                        id="number_of_people"
                        name="number_of_people"
                        value={booking.number_of_people}
                        onChange={handleInputChange}
                        required
                        min={1}
                        max={16}
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">GSM:</label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={booking.phone_number}
                        onChange={handleInputChange}
                        required
                        autoComplete='off'
                        pattern=".{9,}"
                        title="Please enter at least 9 characters"
                    />
                </div>
                <button type="submit" className="action-button">Done</button>
                <button onClick={hidePopup} className="close-button">Close</button>
            </form>
        </div>
    );
};

export default AddBookingPopup;