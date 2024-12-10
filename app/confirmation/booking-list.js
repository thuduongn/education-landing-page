import React from "react";
import Booking from "./booking"
import { deleteBooking } from "../_services/form-service";


export default function BookingList({ bookings }) {
    return (
        <div className="flex flex-row gap-6 justify-center items-center">
            {bookings.map((booking) => (
                <Booking 
                    key={booking.id}
                    id={booking.id}
                    booking = {booking}
                    deleteBooking={deleteBooking}
                />
            ))}
        </div>
    );
}