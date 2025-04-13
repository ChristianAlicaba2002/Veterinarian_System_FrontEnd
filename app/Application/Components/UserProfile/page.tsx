"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "../../../../utils";
import "./UserProfileStyles/UserProfile.css";

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Initializing your profile...");
  const [showAlert, setShowAlert] = useState(false);
  const [changeColor, setChangeColor] = useState(() => {
    return localStorage.getItem("profileHeaderColor") || "blue";
  });

  useEffect(() => {
    localStorage.setItem("profileHeaderColor", changeColor);
  }, [changeColor]);

  const saveColor = () => {
    localStorage.setItem("profileHeaderColor", changeColor);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const loadingSequence = [
          { message: "Initializing your profile...", delay: 800 },
          { message: "Almost ready...", delay: 800 },
          { message: "Preparing your dashboard...", delay: 600 },
        ];

        for (const sequence of loadingSequence) {
          setLoadingText(sequence.message);
          await new Promise((resolve) => setTimeout(resolve, sequence.delay));
        }

        const user = getUser();
        if (!user) {
          throw new Error("User not found");
        }

        setUserData(user);
      } catch (error) {
        console.error("Error loading profile:", error);
        setLoadingText("Unable to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="body">
        <main>
          <div className="main-content">
            <div className="loader-container">
              <div className="loading-text">{loadingText}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="body">
        <main>
          <div className="main-content">
            <div className="loader-container">
              <div className="loading-text">No profile data available</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="body">
      <main>
        <div className="main-content">
          {showAlert && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#4BB543",
                color: "white",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "opacity 0.3s ease",
                zIndex: 10000,
              }}
            >
              ✅ Color saved successfully!
            </div>
          )}

          <div
            className="arrow-container w-9 h-9 flex items-center justify-center rounded-full text-center"
            style={{ backgroundColor: changeColor }}
          >
            <a href="/Application/Organisms/Layouts">
              <i className="fa-solid fa-arrow-left" style={{ color: "#ffffff" }}></i>
            </a>
          </div>

          <div className="profile-container">
            <div className="profile-header" style={{ backgroundColor: changeColor }}>
              <h2 className="profile-title">User Profile</h2>
              <p className="profile-subtitle">
                Welcome back, {userData.first_name}!
              </p>
            </div>

            <div className="profile-grid">
              <div className="profile-item">
                <div className="profile-label">Full Name</div>
                <div className="profile-value">
                  {userData.first_name} {userData.last_name}
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Email Address</div>
                <div className="profile-value">{userData.email}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Contact Number</div>
                <div className="profile-value">{userData.phone_number}</div>
              </div>
              <div className="profile-item">
                <div className="profile-label">Address</div>
                <div className="profile-value">{userData.address}</div>
              </div>

              <div className="change-color-background">
                <div className="profile-label">Change Color</div>
                <div className="profile-value d-flex align-items-center gap-3 flex-wrap">
                  <input
                    type="color"
                    className="form-control form-control-color mb-5"
                    value={changeColor}
                    onChange={(e) => setChangeColor(e.target.value)}
                    title="Choose your color"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      padding: "0",
                      border: "none",
                    }}
                  />
                  <button
                    type="submit"
                    onClick={saveColor}
                    className="btn btn-outline-primary px-5 py-5 rounded-pill shadow-sm ml-2"
                    style={{
                      backgroundColor: "#d8b4fe",
                      color: "#4a154b",
                      border: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-dates">
              <div className="date-item">
                <div className="date-label">Member Since</div>
                <div className="date-value">
                  {new Date(userData.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="date-item">
                <div className="date-label">Last Updated</div>
                <div className="date-value">
                  {new Date(userData.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
