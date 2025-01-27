import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDotors from "../component/RelatedDotors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const daysofweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);

  // Fetch doctor information by ID
  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    if (doc) {
      setDocInfo(doc);
    } else {
      toast.error("Doctor not found.");
      navigate("/"); // Redirect to home or error page
    }
  };

  // Generate available slots for the next 7 days
  const getAvailableSlots = () => {
    if (!docInfo?.slots_booked) return; // Ensure slots_booked exists
  
    const slots = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // Increment date by i days
  
      const startTime = new Date(currentDate).setHours(10, 0, 0, 0); // Start at 10:00 AM
      const endTime = new Date(currentDate).setHours(21, 0, 0, 0); // End at 9:00 PM
  
      for (let time = startTime; time < endTime; time += 30 * 60 * 1000) {
        const slotDatetime = new Date(time);
        const slotDate = slotDatetime.toLocaleDateString(); // Format: MM/DD/YYYY
        const slotTime = slotDatetime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
        // Check if the slot is already booked
        const isAvailable = !docInfo.slots_booked[slotDate]?.includes(slotTime);
  
        if (isAvailable) {
          slots.push({
            datetime: slotDatetime,
            time: slotTime,
            day: daysofweek[slotDatetime.getDay()],
            date: slotDate,
          });
        }
      }
    }
  
    setDocSlots(slots); // Update state with filtered slots
  };
  

  // Book an appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please log in to book an appointment.");
      return navigate("/login");
    }

    try {
      const selectedSlot = docSlots[slotIndex];
      const slotDate = `${selectedSlot.datetime.getFullYear()}-${selectedSlot.datetime.getMonth() + 1}-${selectedSlot.datetime.getDate()}`;
      const slotTime = `${selectedSlot.datetime.getHours()}:${selectedSlot.datetime.getMinutes()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/bookappointment`,
        { docId, slotDate, slotTime },
        { headers: { token }}
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/myappointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo ? (
    <div>
      {/* Doctor details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="Doctor" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/* Doctor about */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee: $<span className="text-gray-500">{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-2 flex-wrap">
          {docSlots.length > 0 &&
            docSlots.map((slot, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-4 px-6 min-w-16 rounded-lg cursor-pointer ${
                  slotIndex === index ? "bg-primary text-white" : "border border-gray-500"
                }`}
              >
                <p className="text-sm">{slot.day}</p>
                <p className="text-sm">{slot.time}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Selected Slot Details */}
      {slotIndex !== null && docSlots[slotIndex] && (
        <div className="mt-4 p-4 border border-gray-400 rounded-lg">
          <p className="text-sm font-medium">Selected Slot:</p>
          <p className="text-sm">{`${docSlots[slotIndex].day}, ${docSlots[slotIndex].time}`}</p>
          <button className="mt-2 py-1 px-4 bg-primary text-white rounded-lg" onClick={()=>{
            if (docInfo.available) {
              bookAppointment
            } else {
              toast.error("Doctor is Not Available");
            }
          }}>
            Confirm Booking
          </button>
        </div>
      )}

      {/* Related doctors */}
      <RelatedDotors docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : (
    <p>Loading doctor details...</p>
  );
};

export default Appointment;
