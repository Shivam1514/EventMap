import { Link } from "react-router-dom";
import organizer from "../magicBanner/images2/organizer.jpg";

const Organizer = () => {
  return (
    <div className="bg-gray-200 py-16 font-poppins">
       <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:gap-10 items-center">
          <div className="flex-1">
            <img className="rounded-md" src={organizer} alt="" />
          </div>
          <div className="flex-1 bg-white md:-ml-20 p-12 rounded-md">
            <h2 className="text-2xl text-dark_01 md:text-5xl font-semibold">
              What we do ?
            </h2>
            <p className="text-black my-4 ">
              Welcome to EventMap, where innovation meets opportunity.
              Whether you're looking to host or participate in cutting-edge
              coding challenges, workshops, or hackathons, we specialize in
              bringing tech enthusiasts together for unforgettable experiences.
              Let us manage the details so you can focus on what you do
              best—coding. Register now and be a part of the future of tech!
            </p>
            <Link to="request-organizer">
              <button className="bg-dark_01 text-white px-6 py-3 rounded-md uppercase">
                Request Organizer
              </button>
            </Link>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Organizer;
