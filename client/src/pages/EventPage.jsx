import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";
import Notiflix from "notiflix";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  // Fetching the event data from server by ID
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/event/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, [id]);

  // Copy Functionalities
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      Notiflix.Notify.success("Link copied to clipboard!")
      //alert('Link copied to clipboard!');
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(`${linkToShare}`);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  if (!event) return null;

  return (
    <div className="flex flex-col mx-4 md:mx-8 lg:mx-16 mt-4 md:mt-8 flex-grow">
      {/* Hero Section with Background */}
      <div className="relative">
        {event.image && (
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img src={`http://localhost:4000/${event.image}`}    alt={event.title} className="w-full h-96 object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <h1 className="absolute bottom-4 left-4 text-white text-3xl md:text-4xl font-bold">
              {event.title.toUpperCase()}
            </h1>
          </div>
        )}
      </div>
      
     
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">{event.title.toUpperCase()}</h1>
          <Link to={`/event/${event._id}/ordersummary`}>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:shadow-lg transition duration-200">Book Ticket</button>
          </Link>
        </div>

        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold text-blue-700">
            {event.ticketPrice === 0 ? 'Free' : `LKR ${event.ticketPrice}`}
          </h2>
        </div>

        <div className="mb-4 text-sm md:text-base text-gray-600">
          {event.description}
        </div>

        <div className="mb-4 text-sm md:text-base font-semibold text-gray-700">
          Organized By: {event.organizedBy}
        </div>

        <div className="mb-6">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">When and Where</h1>
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <div className="flex items-center gap-3">
              <AiFillCalendar className="text-gray-700 text-2xl animate-bounce" />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-base font-semibold">Date and Time</h2>
                <p className="text-sm md:text-base">
                  Date: {event.eventDate.split("T")[0]} <br /> Time: {event.eventTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdLocationPin className="text-red-500 text-2xl animate-pulse" />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-base font-semibold">Location</h2>
                <p className="text-sm md:text-base">{event.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800">Share with Friends</h1>
          <div className="flex gap-4 mt-6">
            <button onClick={handleCopyLink} className="text-gray-700 hover:text-gray-900 transition duration-200">
              <FaCopy className="text-2xl hover:scale-110 transform transition" />
            </button>
            <button onClick={handleWhatsAppShare} className="text-green-500 hover:text-green-700 transition duration-200">
              <FaWhatsappSquare className="text-2xl hover:scale-110 transform transition" />
            </button>
            <button onClick={handleFacebookShare} className="text-blue-600 hover:text-blue-800 transition duration-200">
              <FaFacebook className="text-2xl hover:scale-110 transform transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
