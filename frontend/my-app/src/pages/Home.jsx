import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Elevate Your Email <br /> Marketing with <span>MailFlow</span>
          </h1>
          <p>
            Introducing MailFlow, the unsung hero of streamlined communication
            in the world of Software as a Service.
          </p>

          {token && (
            <div className="hero-buttons">
              <Link>
                <button className="btn campaign-btn">Create Campaign</button>
              </Link>
              <Link to="/contact">
                <button className="btn contacts-btn flex items-center gap-2">
                  <span>Add Contacts</span>
                  <Plus className="w-4 h-4" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
