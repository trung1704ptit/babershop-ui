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





export {
  About,
  Footer,
  Header,
  HeroCarousel,
  Loading,
  Pricing,
  Reviews,
  Services,
  Team
}