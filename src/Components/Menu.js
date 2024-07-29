import React, { useEffect, useState } from "react";
import "./Menu.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import Stopwatch from "./Stopwatch"; // Import the Stopwatch component


import {
  FaDelicious,
  FaShoppingCart,
  FaWallet,
  FaChartLine,
  FaRegClock,
  FaCog,
  FaSignOutAlt,
  FaList,
  FaCoffee, // New icon for sidebar open
  FaBeer, // New icon for sidebar closed
  FaTimes
} from "react-icons/fa";

function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 524);
  const [showStopwatch, setShowStopwatch] = useState(false); // State to handle stopwatch visibility


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 524);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const toggleStopwatch = () => {
    setShowStopwatch(!showStopwatch);
  };

  const handleSignOut = () => {
    // Simulate sign-out logic here (e.g., clearing tokens, redirecting to login)
    console.log("User signed out");
    // setShowSignOutPopup(false);
    // setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      // setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <div 
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: '180px',
          height: '100%',
          position: 'fixed',
          top: '0',
          left: sidebarOpen ? '0' : '-250px',
          background: '#19162c',
          color: 'white',
          transition: '0.3s',
          zIndex: '1000', // Ensure sidebar is below menu-toggle
        }}
      >
        <div
          className="sidebar-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#cf00a3',
          }}
        >
          <img src={logo} alt="Logo" className="logo" style={{ width: '100px' }} />
          <button
            className="close-btn"
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
            }}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <ul
          className="sidebar-menu"
          style={{
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {[
            { to: "/projects", icon: <FaList size={30} />, text: "My projects" },
            { to: "/", icon: <FaDelicious size={30} />, text: "Delicious" },
            { to: "/cart", icon: <FaShoppingCart size={30} />, text: "Cart" },
            { to: "/", icon: <FaWallet size={30} />, text: "Wallet" },
            { to: "/", icon: <FaChartLine size={30} />, text: "Trending" },
            { to: "#", icon: <FaRegClock size={30} />, text: "Speed", onClick: toggleStopwatch }
          ].map((item, index) => (
            <li key={index} style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to={item.to} onClick={item.onClick} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                {item.icon}
                <span className="tooltip" style={{ marginLeft: '10px', fontSize: '1.1rem', color: 'white' }}>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className="sidebar-menu"
          style={{
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <li style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/settings" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <FaCog size={30} />
              <span className="tooltip" style={{ marginLeft: '10px', fontSize: '1.1rem', color: 'white' }}>Settings</span>
            </Link>
          </li>
          <li style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <FaSignOutAlt size={30} />
              <span className="tooltip" style={{ marginLeft: '10px', fontSize: '1.1rem', color: 'white' }}>Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: '1100', // Ensure it stays on top
          marginLeft: '-15px',
        }}
      >
        {sidebarOpen ? <FaBeer size={45} /> : <FaCoffee size={45} />}
      </button>

      {/* {showSignOutPopup && (
        <div className="sign-out-popup">
          <p>Are you sure you want to sign out?</p>
          <div className="buttonSignOut">
            <button onClick={handleSignOut}>Yes</button>
            <button onClick={() => setShowSignOutPopup(false)}>No</button>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          Successfully signed out
        </div>
      )}
      {showSignOutPopup && (
        <div className="sign-out-popup">
          <p>Are you sure you want to sign out?</p>
          <div className="buttonSignOut">
            <button onClick={handleSignOut}>Yes</button>
            <button onClick={() => setShowSignOutPopup(false)}>No</button>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          Successfully signed out
        </div>
      )} */}

      {showStopwatch && <Stopwatch onClose={toggleStopwatch} />}
    </>
  );
}

export default Menu;
