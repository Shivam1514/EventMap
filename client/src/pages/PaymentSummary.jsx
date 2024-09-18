import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { UserContext } from "../UserContext";
import Qrcode from "qrcode"; //TODO:
import Notiflix from 'notiflix';

export default function PaymentSummary() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext);
  

  //!Adding a default state for ticket-----------------------------
  const defaultTicketState = {
    userid: user ? user._id : "",
    eventid: "",
    ticketDetails: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      eventname: "",
      eventdate: "",
      eventtime: "",
      ticketprice: "",
      qr: "",
    },
  };
  //! add default state to the ticket details state
  const [ticketDetails, setTicketDetails] = useState(defaultTicketState);

  
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/event/${id}/ordersummary/paymentsummary`)
      .then((response) => {
        setEvent(response.data);

        setTicketDetails((prevTicketDetails) => ({
          ...prevTicketDetails,
          eventid: response.data._id,
          //!capturing event details from backend for ticket----------------------
          ticketDetails: {
            ...prevTicketDetails.ticketDetails,
            eventname: response.data.title,
            eventdate: response.data.eventDate.split("T")[0],
            eventtime: response.data.eventTime,
            ticketprice: response.data.ticketPrice,
          },
        }));
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        Notiflix.Notify.failure("Error In Fething Event")
      });
  }, [id]);

  //! Getting user details using useeffect and setting to new ticket details with previous details
  useEffect(() => {
    setTicketDetails((prevTicketDetails) => ({
      ...prevTicketDetails,
      userid: user ? user._id : "",
      ticketDetails: {
        ...prevTicketDetails.ticketDetails,
        name: user ? user.name : "",
        email: user ? user.email : "",
      },
    }));
  }, [user]);

  if (!event) return "";

  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

 
  //! creating a ticket ------------------------------
  const createTicket = async (e) => {
    e.preventDefault();
    //!adding a ticket qr code to booking ----------------------
    try {
      const existingTicketResponse = await axios.get(
        `/tickets/check?userid=${ticketDetails.userid}&eventid=${ticketDetails.eventid}`
      );
      
      console.log(existingTicketResponse);
      if (existingTicketResponse.data.message) {
        Notiflix.Notify.failure("Oops Can't create duplicate tickets");
        return;
      }
      
      const qrCode = await generateQRCode(
        ticketDetails.ticketDetails.eventname,
        ticketDetails.ticketDetails.name
      );
      //!updating the ticket details qr with prevoius details ------------------
      const updatedTicketDetails = {
        ...ticketDetails,
        ticketDetails: {
          ...ticketDetails.ticketDetails,
          qr: qrCode,
        },
      };
      //!posting the details to backend ----------------------------
      const response = await axios.post(`/tickets`, updatedTicketDetails);
      //alert("Ticket Created");
      Notiflix.Notify.success("Ticket Created")
      setRedirect(true);
      console.log("Success creating ticket", updatedTicketDetails);
      Notiflix.Notify.success("Successfully created ticket")
    } catch (error) {
      Notiflix.Notify.failure("Error creating ticket")
      console.error("Error creating ticket:", error);
    }
  };
  //! Helper function to generate QR code ------------------------------
  async function generateQRCode(name, eventName) {
    try {
      const qrCodeData = await Qrcode.toDataURL(
        `Event Name: ${name} \n Name: ${eventName}`
      );
      return qrCodeData;
    } catch (error) {
      Notiflix.Notify.failure("Error generating QR code")
      console.error("Error generating QR code:", error);
      return null;
    }
  }
  if (redirect) {
    return <Navigate to={"/wallet"} />;
  }
  return (
    <>
      {/* Back Button */}
      <div className="mt-8 ml-12">
        <Link to={"/event/" + event._id + "/ordersummary"}>
          <button
            className="
            flex 
            items-center 
            gap-2
            p-3 
            bg-gray-100 
            text-blue-700
            font-bold
            rounded-md
            shadow-md
            hover:bg-gray-200
            transition
            duration-200"
          >
            <IoMdArrowBack className="w-6 h-6" />
            Back
          </button>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-wrap justify-center mt-8">
        
        {/* Details Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-2/3 lg:w-2/5 mx-4">
          {/* Your Details Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Details</h2>
            <input
              type="text"
              name="name"
              readOnly
              onChange={handleChangeDetails}
              placeholder={user.name}
              className="input-field w-full h-12 bg-gray-200 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="email"
              name="email"
              onChange={handleChangeDetails}
              placeholder={user.email}
              readOnly
              className="input-field w-full h-12 bg-gray-0 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="tel"
              name="contactNo"
              // value={details.contactNo}
              onChange={handleChangeDetails}
              placeholder="Contact No"
              className="input-field w-full h-12  border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              className=" 
              py-1
              px-1 
              bg-blue-200 
              text-gray-800 
              font-semibold 
              rounded-md 
              border 
              border-gray-300 
              cursor-pointer"
              
            >
              verify contact No
            </button>
          </div>

          {/* Payment Option Section */}
          <div className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment Option</h2>
            <button
              type="button"
              className="
              w-full 
              py-3 
              bg-blue-100 
              text-gray-800 
              font-semibold 
              rounded-md 
              border 
              border-gray-300 
              cursor-not-allowed"
              disabled
            >
              Credit / Debit Card
            </button>
            <input
              type="text"
              name="nameOnCard"
              value="A.B.S.L. Perera"
              // onChange={handleChangePayment}
              placeholder="Name on Card"
              className="input-field w-full h-12 bg-gray-50 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="cardNumber"
              value="5648 3212 7802"
              // onChange={handleChangePayment}
              placeholder="Card Number"
              className="input-field w-full h-12 bg-gray-50 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                name="expiryDate"
                value="12/25"
                // onChange={handleChangePayment}
                placeholder="Expiry Date (MM/YY)"
                className="input-field w-1/2 h-12 bg-gray-50 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                name="cvv"
                value="532"
                // onChange={handleChangePayment}
                placeholder="CVV"
                className="input-field w-1/4 h-12 bg-gray-50 border border-gray-300 rounded-md p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                Total: Rs. {event.ticketPrice}
              </p>
              <Link to={"/"}>
                <button
                  type="button"
                  onClick={createTicket}
                  className="
                  mt-4 
                  py-2 
                  px-4 
                  bg-blue-600 
                  text-white 
                  font-semibold 
                  rounded-md 
                  shadow-md 
                  hover:bg-blue-700 
                  transition 
                  duration-200"
                >
                  Make Payment
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-blue-100 rounded-lg shadow-lg p-6 w-full md:w-1/3 lg:w-1/4 mx-4 mt-8 md:mt-0">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-800">{event.title}</p>
            <p className="text-sm text-gray-600">
              {event.eventDate.split("T")[0]}, {event.eventTime}
            </p>
            <p className="text-sm text-gray-600">1 Ticket</p>
            <hr className="my-2 border-gray-400" />
            <p className="text-sm font-bold text-gray-800">
              Sub total: Rs. {event.ticketPrice}
            </p>
            <p className="text-sm font-bold text-gray-800">
              Total: Rs. {event.ticketPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
