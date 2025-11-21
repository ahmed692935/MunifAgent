import { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/Images/MrBot_Logo.webp";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";

import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
        </nav>

        <div>
          {/* ===================== LOGGED IN ===================== */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer"
              >
                <span className="font-semibold text-[#3d4b52]">
                  {user.email.slice(0, 5)}...
                </span>
                <FaRegUserCircle />
                <FaChevronDown size={12} className="text-[#3d4b52]" />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-60">
                  <div className="px-4 py-2 border-b border-gray-200 text-[#3d4b52]/70">
                    {user.email}
                  </div>

                  <button
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#3d4b52] cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ===================== NOT LOGGED IN ===================== */
            <button className="bg-white border border-[#3d4b52] text-[#3d4b52] px-4 py-2 rounded-lg font-semibold hover:bg-[#3d4b52]/10 transition-all">
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-3xl text-[#3d4b52]"
        >
          <MdMenu />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 left-5 text-3xl text-[#3d4b52]"
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
                  className="cursor-pointer text-[#3d4b52] font-semibold text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth */}
          <div className="flex flex-col space-y-3 w-[80%] mt-7">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-white border border-[#3d4b52] p-3 rounded-md">
                  <FaRegUserCircle />
                  <span className="font-semibold text-[#3d4b52]">
                    {user.email}
                  </span>
                </div>

                <button
                  onClick={() => {
                    dispatch(logout());
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="bg-white border border-[#3d4b52] text-[#3d4b52] py-2 rounded-md font-semibold">
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}
    </header>
  );
};

export default Navbar;
