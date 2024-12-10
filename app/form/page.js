"use client";

import React, { useState } from 'react';
import { addBooking } from "../_services/form-service";
import { useUserAuth } from "../_utils/auth-context";

export default function NewBooking() {
    const subjects = [
        "OOP",
        "Data Structure & Algorithms",
        "Technical English",
        "Web Development",
        "App Development"
    ];

    const { user } = useUserAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = Math.random().toString(36).substring(2, 9);

        const newBooking = {
            id,
            name,
            email,
            phone,
            subject,
        };

        try {
            const bookingId = await addBooking(user.uid, newBooking);
            console.log("Booking successfully added with ID:", bookingId);
            window.location.href = "/confirmation";

            setName("");
            setEmail("");
            setPhone("");
            setSubject("Sl");
        } catch (error) {
            console.error("Error adding booking:", error.message, error.code);
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className="flex items-center justify-center bg-blue-50 w-screen h-full">
            <div className="w-3/5 m-14 p-16 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-center mb-8">Book A Demo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleNameChange}
                            value={name}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="number"
                            name="phone"
                            onChange={handlePhoneChange}
                            value={phone}
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <div className="relative">
                            <select
                                id="subject"
                                name="subject"
                                onChange={handleSubjectChange}
                                value={subject}
                                required
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select a subject</option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit" 
                        href="/confirmation"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
