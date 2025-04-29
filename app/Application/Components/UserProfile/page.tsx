"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "../../../../utils";

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
  const [loadingText, setLoadingText] = useState(
    "Initializing your profile..."
  );
  const [showAlert, setShowAlert] = useState(false);
  const [changeColor, setChangeColor] = useState(() => {
    return localStorage.getItem("profileHeaderColor") || "#4f46e5";
  });

  useEffect(() => {
    localStorage.setItem("profileHeaderColor", changeColor);
  }, [changeColor]);

  const saveColor = () => {
    localStorage.setItem("profileHeaderColor", changeColor);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(()=> {
    const user =  getUser()
    setUserData(user)
  },[])

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{loadingText}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Alert */}
        {showAlert && (
          <div className="fixed top-4 right-4 bg-white text-green-600 px-4 py-2 rounded-lg shadow-lg border border-green-200 transform transition-all duration-300 animate-fade-in">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Theme updated successfully
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold  mb-2" style={{color: changeColor}}>Profile Settings</h1>
            <p className="text-gray-500">Manage your account preferences and information</p>
          </div>
          <a
            href="/Application/Organisms/Layouts"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div 
                className="h-32"
                style={{ backgroundColor: changeColor }}
              ></div>
              <div className="p-6 -mt-16">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg"
                    style={{ backgroundColor: changeColor }}
                  >
                    {userData.first_name[0]}{userData.last_name[0]}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">
                    {userData.first_name} {userData.last_name}
                  </h2>
                  <p className="text-gray-500 mt-1">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900 text-lg">{userData.phone_number}</p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900 text-lg">{userData.address}</p>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Theme Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Profile Color</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="color"
                        value={changeColor}
                        onChange={(e) => setChangeColor(e.target.value)}
                        className="w-16 h-16 rounded-xl cursor-pointer border-2 border-gray-200 shadow-md"
                        title="Choose your color"
                      />
                    </div>
                    <button
                      onClick={saveColor}
                      className="px-6 py-3 cursor-pointer text-white rounded-xl hover:opacity-90 transition-all duration-300 text-sm font-medium shadow-md"
                      style={{backgroundColor: changeColor}}
                    >
                      Update Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-900 text-lg">
                    {new Date(userData.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-gray-900 text-lg">
                    {new Date(userData.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
