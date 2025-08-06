import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const baseButtonStyle =
    "px-5 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200 transform hover:scale-105";

  return (
    <nav className="w-full flex justify-between items-center px-6 py-6 shadow-md bg-[#0D0620] text-white ">
      <Link to="/" className="text-2xl font-bold text-white">
        MailFlow
      </Link>

      <div className="flex items-center space-x-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className={`${baseButtonStyle} bg-white text-black  hover:text-blue-600`}
            >
              LOG IN ➜
            </Link>
            <Link
              to="/signup"
              className={`${baseButtonStyle} bg-red-400 text-white hover:bg-red-500 rounded-full`}
            >
              SIGN UP
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className={`${baseButtonStyle} bg-red-600 text-white hover:bg-red-700`}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
