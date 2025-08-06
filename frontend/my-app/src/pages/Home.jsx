import React from "react";
import Navbar from "../components/Navbar"; // Update if needed
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Elevate Your Email <br /> Marketing with <span>MailFlow</span>
          </h1>
          <p>
            Introducing MailFlow, the unsung hero of streamlined communication
            in the world of Software as a Service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
