import { RiDeleteBin6Line } from "react-icons/ri";
import { useUserAuth } from "../_utils/auth-context";


export default function Booking({ booking, deleteBooking }) {
    const { user } = useUserAuth();

    const handleDelete = async () => {
        await deleteBooking(user.uid, booking);
    };
    return (
        <div className="w-80 h-[210px] flex flex-row justify-between text-white bg-blue-400 m-4 p-8 cursor-pointer">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-xl">{booking.name}</h1>
                <p>Email: {booking.email}</p>
                <p>Phone: {booking.phone}</p>
                {/* <p>Date: {date}</p>
                <p>Time: {time}</p> */}
                <p>Subject: {booking.subject}</p>
            </div>
            <div>
                <RiDeleteBin6Line onClick={handleDelete} className="text-lg"/>
            </div>
        </div>
    );
}