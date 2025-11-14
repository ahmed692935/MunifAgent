import { lazy } from "react"
import Navbar from "../components/LandingPageComponents/Navbar";

const HeroSection = lazy(() => import("../components/LandingPageComponents/HeroSection"))
const About = lazy(() => import("../components/LandingPageComponents/About"))
const Works = lazy(() => import("../components/LandingPageComponents/Works"))
const Services = lazy(() => import("../components/LandingPageComponents/Services"))
const Contact = lazy(() => import("../components/LandingPageComponents/Contact"))
const Accordion = lazy(() => import("../components/LandingPageComponents/Accordion"))
const Footer = lazy(() => import("../components/LandingPageComponents/Footer"))

function LandingPage() {
    return (
        //
        <>
            <Navbar />
            <HeroSection />
            <About />
            <Works />
            <Services />
            <Contact />
            <Accordion />
            <Footer />
        </>

    );
}

export default LandingPage;
