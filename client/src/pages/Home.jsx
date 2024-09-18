
import Organizer from "./Organizer/Organizer";
import PopularEvents from "./PopularEvents";
import MagicBanner from "./magicBanner/MagicBanner";

const Home = () => {
  return (
    <div>
      <MagicBanner></MagicBanner>
      <Organizer />
      {/* <PopularEvents /> */}

      {/* <Booking></Booking>
      <TeamCards />
      <NewsLetter></NewsLetter> */}
      {/* <Faqac></Faqac> */}
    </div>
  );
};

export default Home;
