"use client";
import React, { useEffect } from "react";
import "./LandingStyles/Landing.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      route.push("/Application/Organisms/Layouts");
      route.refresh();
    } else {
      route.push("/");
      route.refresh();
    }
  }, [route]);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/img/logoicon.png" alt="Logo" />
          <div className="logo">FurEver 🐾</div>
        </div>

        <div className="navbar-middle">
          <Link href="#home" className="nav-link">
            Home
          </Link>
          <Link href="#services" className="nav-link">
            Services
          </Link>
          <Link href="#about" className="nav-link">
            About
          </Link>
          <Link href="#hours" className="nav-link">
            Open Hours
          </Link>
        </div>

        <div className="navbar-right">
          <Link
            href="/Application/Organisms/Auth/LoginPage"
            className="nav-button"
          >
            Sign In
          </Link>

          <Link
            href="/Application/Organisms/Auth/RegisterPage"
            className="nav-button"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <div id="home" className="home">
        <div className="home-content">
          <h1>Healthy Pets,</h1>
          <h1>Happy Wallets</h1>
          <p>
            Protect their health, protect your budget. Our 'Wellness Package
            Plus' offers essential care with significant discounts on optional
            treatments. See the savings!
          </p>
        </div>
        <img src="/img/nursepup.gif" alt="Nurse Pup" className="home-image" />
      </div>

      <div id="services" className="services-container">
        <div className="service-card">
          <img src="/img/groomer.png" alt="Groomer" className="service-icon" />
          <h3>Spa Day:</h3>
          <h3>Pet Grooming Perfection</h3>
          <p>Stylish cuts and pampering for your furry friend.</p>
        </div>
        <div className="service-card">
          <img src="/img/check.png" alt="Vet Check" className="service-icon" />
          <h3>Vet Check:</h3>
          <h3>Pawsitively Healthy</h3>
          <p>Complete veterinary care for a vibrant pet.</p>
        </div>
        <div className="service-card">
          <img
            src="/img/adoption.png"
            alt="Adoption"
            className="service-icon"
          />
          <h3>Adopt:</h3>
          <h3>Heartwarming Companions</h3>
          <p>Find your perfect match and make a difference.</p>
        </div>
      </div>

      <div id="about" className="about-container">
        <div id="about-gif">
          <img src="/img/vaccine.gif" alt="Vaccine" />
        </div>
        <div id="about-text">
          <h2>We Speak Fluent Fur</h2>
          <p>
            This clinic is "Your Pet's Best Advocates", driven by a team of
            passionate animal enthusiasts who understand the deep bond between
            pets and their owners, operates under the 'FUR-FURVER' philosophy,
            prioritizing pet health and happiness. They offer the 'Wellness
            Package Plus,' a comprehensive and affordable care option that
            includes essential preventative services like vaccinations, physical
            exams, parasite prevention, and dental cleaning, along with up to
            20% discounts on various optional treatments, ensuring high-quality
            care without financial strain. Additionally, the clinic facilitates
            pet adoptions, connecting loving pets with their forever homes, and
            actively seeks community donations to support animal welfare and
            local shelters.
          </p>
          <Link href="/Application/Organisms/Auth/RegisterPage">
            <button id="adopt-button">Find Your Furry Soulmate</button>
          </Link>
        </div>
      </div>
      <div id="#hours" className="hours-container">
        <h2>Opening Hours</h2>
        <p>Monday - Friday: 10:00 AM - 5:00 PM</p>
        <p>Saturday: 10:00 AM - 4:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  
  );
};

export default LandingPage;
