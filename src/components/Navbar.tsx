import { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/Images/MrBot_Logo.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { key: "home", label: "Home", to: "/" },
    { key: "dashbaord", label: "Dashboard", to: "/dashboard" },
    { key: "add-agent", label: "Add Agent", to: "/add-agent" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 sm:h-20 z-50 transition-all duration-300 px-4 md:px-8 ${
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="w-20 h-16 sm:h-20">
          <img
            src={Logo}
            alt="Logo"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="font-semibold hover:text-gray-400 transition-all duration-200 text-[#3d4b52]"
            >
              {item.label}
            </Link>
          ))}

          <button className="bg-white border border-[#3d4b52] text-[#3d4b52] px-4 py-2 rounded-lg font-semibold hover:bg-[#3d4b52]/10 transition-all">
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`md:hidden text-3xl focus:outline-none transition-colors duration-300 cursor-pointer ${
            isScrolled ? "text-[#3d4b52]" : "text-[#3d4b52]"
          }`}
        >
          <MdMenu />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 left-5 text-3xl text-[#3d4b52] transition-all cursor-pointer"
        >
          <MdClose />
        </button>

        <div className="flex flex-col items-center mt-20 space-y-6">
          <ul className="flex flex-col items-center space-y-3">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer text-[#3d4b52] font-semibold text-lg transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col space-y-3 w-[80%] mt-7">
            <button
              onClick={() => setMenuOpen(false)}
              className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold text-center hover:bg-[#3d4b52]/10 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Background */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
        ></div>
      )}
    </header>
  );
};

export default Navbar;
