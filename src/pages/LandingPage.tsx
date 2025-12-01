// import { lazy, useState, useEffect } from "react"
import { lazy } from "react";
import Navbar from "../components/LandingPageComponents/Navbar";
// import Impressum from "../components/LandingPageComponents/Impressum";
// import PrivaryPolicy from "../components/LandingPageComponents/PrivaryPolicy";

const HeroSection = lazy(
  () => import("../components/LandingPageComponents/HeroSection")
);
const About = lazy(() => import("../components/LandingPageComponents/About"));
const Works = lazy(() => import("../components/LandingPageComponents/Works"));
// const Services = lazy(
//   () => import("../components/LandingPageComponents/Services")
// );
const Contact = lazy(
  () => import("../components/LandingPageComponents/Contact")
);
const Accordion = lazy(
  () => import("../components/LandingPageComponents/Accordion")
);
const Footer = lazy(() => import("../components/LandingPageComponents/Footer"));

// import { FaLock, FaArrowRight } from "react-icons/fa";

function LandingPage() {
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const correctPassword = import.meta.env.VITE_LANDING_PASSWORD;

  // On page load check if user is already authenticated
  // useEffect(() => {
  //     const auth = sessionStorage.getItem("landingAuth");
  //     if (auth === "true") {
  //         setIsAuthenticated(true);
  //     }
  // }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();

  //     if (password.trim() === correctPassword) {
  //         setError("");
  //         sessionStorage.setItem("landingAuth", "true");
  //         setIsAuthenticated(true); // show landing page
  //     } else {
  //         setError("Incorrect password. Try again.");
  //     }
  // };

  // If NOT authenticated → show password screen
  // if (!isAuthenticated) {
  //     return (
  //         <div className="flex flex-col items-center justify-center min-h-screen bg-white">
  //             <div
  //                 className="px-8 py-10 bg-[#fffeff] rounded-2xl shadow-xl text-center w-full max-w-sm"
  //                 style={{ boxShadow: "4px 5px 10px 3px #6e6c6e, 4px 4px 4px 1px #6e6c6e" }}
  //             >
  //                 <FaLock className="text-4xl mb-4 text-[#3d4b52] mx-auto" />
  //                 <h2 className="text-xl mb-6 font-semibold text-[#3d4b52]">Enter Password</h2>

  //                 <form onSubmit={handleSubmit}>
  //                     <div className="relative rounded-md bg-[#3d4b52] flex items-center">
  //                         <input
  //                             type="password"
  //                             placeholder="Enter password"
  //                             value={password}
  //                             onChange={(e) => setPassword(e.target.value)}
  //                             className="w-full p-3 rounded-md bg-[#fffeff] text-[#3d4b52] border border-[#3d4b52] outline-none"
  //                         />

  //                         {error && (
  //                             <p className="text-red-500 text-sm absolute -bottom-5">
  //                                 {error}
  //                             </p>
  //                         )}

  //                         <button
  //                             type="submit"
  //                             className="flex items-center justify-center bg-[#3d4b52] rounded-full transition cursor-pointer absolute w-8 h-8 right-3"
  //                         >
  //                             <FaArrowRight color="#fffeff" />
  //                         </button>
  //                     </div>
  //                 </form>
  //             </div>
  //         </div>
  //     );
  // }

  // If authenticated → show full landing page
  return (
    //
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Works />
      {/* <Services /> */}
      {/* <Impressum />
      <div className="flex justify-center">
        <PrivaryPolicy />
      </div> */}
      <Contact />
      <Accordion />
      <Footer />
    </>
  );
}

export default LandingPage;
