import { lazy } from "react"
import Navbar from "../../components/LandingPageComponents/Navbar";

const HeroSection = lazy(() => import("../../components/LandingPageComponents/HeroSection"))
const About = lazy(() => import("../../components/LandingPageComponents/About"))
const Services = lazy(() => import("../../components/LandingPageComponents/Services"))
const Contact = lazy(() => import("../../components/LandingPageComponents/Contact"))
const Footer = lazy(() => import("../../components/LandingPageComponents/Footer"))

function LandingLayout() {
    return (

        <>
            <Navbar />
            <HeroSection />
            <About />
            <Services />
            <Contact />
            <Footer />
        </>

    );
}

export default LandingLayout;
