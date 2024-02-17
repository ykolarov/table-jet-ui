import React from "react";

function BookingControllerPopup({showController}) {
    return (
        <div className={`controller popup ${showController ? "" : "hidden"}`}>
            <h1>gogi</h1>
        </div>
    );
}

export default BookingControllerPopup;