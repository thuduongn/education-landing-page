"use client";

import React from 'react';
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { realtimeUpdateBooking, getBookings } from "../_services/form-service";
import { useEffect } from "react";
import BookingList from "./booking-list"
import Link from 'next/link';

export default function Confirmation() {
    const { user } = useUserAuth();
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        if (user) {
            const unsubscribe = realtimeUpdateBooking(user.uid, setBookings);

            return () => {
                unsubscribe();
            };
        }
        }, [user]);
    
    return (
        <main>
            {user ? (
                <div className='bg-blue-50 w-screen h-screen'>
                    <div className="flex flex-col items-center justify-center gap-8">
                        <h1 className="items-center text-5xl font-bold pt-28">Thank You For Booking With Us!</h1>
                        <p className="text-2xl mb-6">You can now view and delete your booking below.</p>
                        <BookingList bookings={bookings} />
                        <Link href="./form" className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-2 px-4 mt-6">
                            Add New Booking
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Please Sign In to view your bookings</p>
                </div>
            )}
        </main>

    );
}
