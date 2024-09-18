const NewsLetter = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[45vh] bg-fixed"
      style={{
        backgroundImage: `url('https://content.instructables.com/FWQ/9XJS/JSFA9AR4/FWQ9XJSJSFA9AR4.jpg?auto=webp&fit=bounds&frame=1&height=1024&width=1024auto=webp&frame=1&height=150')`,
      }}
    >
      <div className="bg-black bg-opacity-70 h-full p-10 ">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:gap-6">
            <p className="uppercase lg:text-2xl font-semibold text-slate-300 text-center flex justify-center items-center">
              FOR EXCLUSIVE BENEFITS, INSIDER NEWS AND OUR UPCOMING EVENTS
              SUBSCRIBE
            </p>

            <div className="mt-5 md:mt-20 lg:mt-10">
              <form className="flex justify-center pb-5">
                <input
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="border p-3 w-72"
                  required
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="bg-primary text-white p-3 rounded-r-lg cursor-pointer"
                />
              </form>
              <p className="text-white text-center px-10 hidden lg:flex">
                {" "}
                Your personal data is to be used by the legal entity EventMap in
                order to provide you with the EventMap services that you requested,
                to send you information on EventMap activities and services and to
                provide offers tailored to your interests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
