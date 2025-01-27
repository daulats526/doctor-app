import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Fetch user appointments
  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/allappointments`, {
        headers: { token },
      });

      if (data) {
        setAppointments(data.appointments.reverse()); // Reverse for latest first
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch appointments.");
    }
  };
  console.log("object", appointments)
  useEffect(() => {
    getUserAppointment();
  }, []);

  // cancel apoointment
  const handleCancelAppointment = async (appointmentId) => {
    // console.log("appointmentId",appointmentId)
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancelappointment", { appointmentId }, {
        headers: { token },
      });
      console.log("data of cancel", data)
      if (data?.success) {
        setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
        toast.success(data.message)
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(error?.response?.data?.message || "Failed to cancel appointment.");
    }
  }
  //apyment api
  const initPay = (order)=>{
      const options = {
        "key": "rzp_test_EZx2uUMw3YZlsF",
        "amount": order.amount,
        "currency": "INR",
        "name": "Test Order",
        "description": "Test Order",
        order_id :order._id,
        receipt: order.receipt,
        "handler": async  (response)=> {
          console.log("orderid",response.razorpay_payment_id);
          console.log("response", response);
        }
      }
      const rzp = new Razorpay(options);
      rzp.open()
  }
  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/payment/payment", { appointmentId }, {
        headers: { token },
      })
      
      if (data?.success) {
        initPay(data.order)
        toast.success(data.message)
        console.log("data of payment", data)
      }
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error(error?.response?.data?.message || "Failed to make payment.");
    }

  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-gray-700 border-b">My Appointments</p>
      <div>
        {appointments.slice(0, 2).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            {/* Doctor Image */}
            <div>
              <img
                className="w-32 bg-indigo-100 rounded-md"
                src={item.docData?.image}
                alt={item.docData?.name}
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-sm text-gray-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.docData?.speciality}</p>
              <p className="text-gray-700 font-medium mt-1">Address:</p>
              <p className="text-sm">{item.docData?.address || "N/A"}</p>

              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {item.date.slice(0, 10)} |{" "}
                {item.time}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 justify-end">
              <button onClick={()=>handlePayment(item._id)} className="text-sm text-gray-600 text-center sm:min-w-48 py-2 border hover:text-white hover:bg-primary transition-all duration-300">
                Pay Online
              </button>
              <button onClick={() => handleCancelAppointment(item._id)} className="text-sm text-gray-600 text-center sm:min-w-48 py-2 border hover:text-white hover:bg-red-600 transition-all duration-300">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
