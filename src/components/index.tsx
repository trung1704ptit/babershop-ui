import dynamic from "next/dynamic";

const About = dynamic(() => import("./About"))
const Header = dynamic(() => import("./Header"))
const Services = dynamic(() => import("./Services"))
const Team = dynamic(() => import("./Team"))
const Reviews = dynamic(() => import("./Reviews"))
const HeroCarousel = dynamic(() => import("./HeroCarousel"))
const Footer = dynamic(() => import("./Footer"))
const Loading = dynamic(() => import("./Loading"))
const Pricing = dynamic(() => import("./Pricing"))
const ScrollToTop = dynamic(() => import("./ScrollToTop"))
const BookingEntrance = dynamic(() => import("./BookingEntrance"))
const Layout = dynamic(() => import("./Layout"))
const Scheduler = dynamic(() => import("./Scheduler"))
const BookingFilter = dynamic(() => import("./BookingFilter"));
const Summary = dynamic(() => import("./Summary"));
const Contact = dynamic(() => import("./Contact"));



export {
  About,
  BookingEntrance,
  BookingFilter,
  Contact,
  Footer,
  Header,
  HeroCarousel,
  Layout,
  Loading,
  Pricing,
  Reviews,
  Scheduler,
  ScrollToTop,
  Services,
  Summary,
  Team
}