import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

export const useRoomBooking = ({  roomId }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const { navigate, rooms, axios, getToken } = useAppContext();
  const checkAvailability = async (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) throw new Error("Please select dates");
    if (new Date(checkInDate) >= new Date(checkOutDate))
      throw new Error("Check-In must be before Check-Out");

    const { data } = await axios.post("api/bookings/check-availability", {
      room: roomId,
      checkInDate,
      checkOutDate,
    });

    setIsAvailable(data.isAvailable);
    toast[data.isAvailable ? "success" : "error"](
      data.isAvailable ? "Room is available" : "Room is not available"
    );
    return data;
  };

  const bookRoom = async ({ checkInDate, checkOutDate, guests }) => {
    const token = await getToken();
    const { data } = await axios.post(
      "api/bookings/book",
      { room: roomId, checkInDate, checkOutDate, guests, paymentMethod: "Pay at hotel" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      toast.success(data.message);
      navigate("/my-bookings");
    } else {
      toast.error(data.message);
    }

    return data;
  };

  return { isAvailable, setIsAvailable, checkAvailability, bookRoom };
};