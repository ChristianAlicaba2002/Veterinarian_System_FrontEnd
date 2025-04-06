'use client'
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
  const [changeColor, setChangeColor] = useState(() => {
    return localStorage.getItem('profileHeaderColor') || '#3b82f6';
  });
  
  const saveColor = () => {
    try {
      localStorage.setItem('profileHeaderColor', changeColor);
      alert('Color saved successfully!');
    } catch (error) {
      console.error('Error saving color:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const loadingSequence = [
          { message: "Initializing your profile...", delay: 800 },
          { message: "Almost ready...", delay: 800 },
          { message: "Preparing your dashboard...", delay: 600 }
        ];

        for (const sequence of loadingSequence) {
          setLoadingText(sequence.message);
          await new Promise(resolve => setTimeout(resolve, sequence.delay));
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
                <div className="profile-value">
                  <input type="color" className="color-input" value={changeColor} onChange={(e) => setChangeColor(e.target.value)} />
                  <button type="submit" onClick={saveColor}>save</button>
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
