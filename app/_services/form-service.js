import { db } from "../_utils/firebase";
import { doc, collection, getDocs, addDoc, deleteDoc, query, onSnapshot } from "firebase/firestore";

export const getBookings = async (userId) => {
    const bookingsRef = collection(db, "users", userId, "bookings");
    const snapshot = await getDocs(bookingsRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        phone: doc.data().phone,
        subject: doc.data().subject,
    }));
};

export const addBooking = async (userId, booking) => {
    const bookingsRef = collection(db, "users", userId, "bookings");
    const docRef = await addDoc(bookingsRef, {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        subject: booking.subject,
    });
    return { id: docRef.id, ...booking };
};

export const deleteBooking = async (userId, booking) => {
    
    const docRef = doc(db, "users", userId, "bookings", booking.id);
    await deleteDoc(docRef);
    return { success: true, message: "Booking deleted successfully." };
};

export const realtimeUpdateBooking = (userId, setBookings) => {
    const bookingsRef = collection(db, "users", userId, "bookings");

    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
        const fetchedBookings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setBookings(fetchedBookings);
    });

    return unsubscribe;
};