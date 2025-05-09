"use client";

import React, { useEffect, useState } from "react";
import { getUser, getToken } from "../../../../utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TEditUserProps } from "../../Types/AllTypes";
import Editbutton from "../../../../public/img/edit.png.svg";

type UserData = {
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export default function UserProfile() {
  const routeTo = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState<TEditUserProps>({
    client_id: 0,
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });
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

  useEffect(() => {
    const user = getUser();
    setUserData(user);
    const accessToken = getToken();
    if (!accessToken) {
      routeTo.push("/");
    }
  }, [routeTo]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const UpdateUserData: TEditUserProps = {
      client_id: userData.client_id,
      first_name: submitForm.first_name,
      last_name: submitForm.last_name,
      phone_number: submitForm.phone_number,
      address: submitForm.address,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/updateuserinformation",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(UpdateUserData),
        }
      );

      const data = await response.json();

      if (data) {
        alert(data.message);
        if (data.data) {
          localStorage.setItem("user", JSON.stringify(data.data));
          window.location.reload();
          setUserData(data.data);
        }
      }
    } catch (error) {
      console.error("Error during Update information:", error);
      alert("An error occurred. Please try again later.");
    }
  };

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
            <h1
              className="text-4xl font-bold  mb-2"
              style={{ color: changeColor }}
            >
              Profile Settings
            </h1>
            <p className="text-gray-500">
              Manage your account preferences and information
            </p>
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
                    {userData.first_name[0]}
                    {userData.last_name[0]}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">
                    {userData.first_name} {userData.last_name}
                  </h2>
                  <p className="text-gray-500 mt-1">{userData.email}</p>
                </div>
              </div>
              <button
                popoverTarget="editForm"
                className="float-right p-1.5"
                type="button"
              >
                <Image
                  style={{ color: "black" }}
                  src={Editbutton}
                  alt="Edit Button"
                  width={30}
                  height={30}
                ></Image>
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {/* <div popover="" id="editForm">
            <div className="register-container-landscape">
              <div className="register-card-landscape">
                <div className="register-form-container-landscape">
                  <h1 className="register-title-landscape">
                    Update your account
                  </h1>
                  <form
                    onSubmit={handleSubmit}
                    className="register-form-landscape"
                  >
                    <div className="form-grid-landscape">
                      <div className="form-group-landscape">
                        <label
                          htmlFor="first_name"
                          className="form-label-landscape"
                        >
                          First name
                        </label>
                        <input
                          id="first_name"
                          type="text"
                          placeholder="Enter First Name"
                          value={submitForm.first_name}
                          onChange={(e) =>
                            setSubmitForm((prev) => ({
                              ...prev,
                              first_name: e.target.value,
                            }))
                          }
                          className="form-input-landscape"
                          required
                        />
                      </div>
                      <div className="form-group-landscape">
                        <label
                          htmlFor="last_name"
                          className="form-label-landscape"
                        >
                          Last name
                        </label>
                        <input
                          id="last_name"
                          type="text"
                          placeholder="Enter Last Name"
                          value={submitForm.last_name}
                          onChange={(e) =>
                            setSubmitForm((prev) => ({
                              ...prev,
                              last_name: e.target.value,
                            }))
                          }
                          className="form-input-landscape"
                          required
                        />
                      </div>
                      <div className="form-group-landscape">
                        <label
                          htmlFor="phone_number"
                          className="form-label-landscape"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone_number"
                          type="text"
                          placeholder="Enter Phone Number"
                          maxLength={11}
                          value={submitForm.phone_number}
                          onChange={(e) =>
                            setSubmitForm((prev) => ({
                              ...prev,
                              phone_number: e.target.value,
                            }))
                          }
                          className="form-input-landscape"
                          required
                        />
                      </div>
                      <div className="form-group-landscape">
                        <label
                          htmlFor="address"
                          className="form-label-landscape"
                        >
                          Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Enter Address"
                          list="addressList"
                          value={submitForm.address}
                          onChange={(e) =>
                            setSubmitForm((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className="form-input-landscape"
                          required
                        />
                        <datalist id="addressList">
                          <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                          <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                          <option value="Alegria, Cebu">Alegria, Cebu</option>
                          <option value="Argao, Cebu">Argao, Cebu</option>
                          <option value="Asturias, Cebu">Asturias, Cebu</option>
                          <option value="Badian, Cebu">Badian, Cebu</option>
                          <option value="Balamban, Cebu">Balamban, Cebu</option>
                          <option value="Bantayan, Cebu">Bantayan, Cebu</option>
                          <option value="Barili, Cebu">Barili, Cebu</option>
                          <option value="Bogo, Cebu">Bogo, Cebu</option>
                          <option value="Boljoon, Cebu">Boljoon, Cebu</option>
                          <option value="Borbon, Cebu">Borbon, Cebu</option>
                          <option value="Carcar, Cebu">Carcar, Cebu</option>
                          <option value="Carmen, Cebu">Carmen, Cebu</option>
                          <option value="Catmon, Cebu">Catmon, Cebu</option>
                          <option value="Cebu City, Cebu">
                            Cebu City, Cebu
                          </option>
                          <option value="Compostela, Cebu">
                            Compostela, Cebu
                          </option>
                          <option value="Consolacion, Cebu">
                            Consolacion, Cebu
                          </option>
                          <option value="Cordova, Cebu">Cordova, Cebu</option>
                          <option value="Dalaguete, Cebu">
                            Dalaguete, Cebu
                          </option>
                          <option value="Danao, Cebu">Danao, Cebu</option>
                          <option value="Dumanjug, Cebu">Dumanjug, Cebu</option>
                          <option value="Ginatilan, Cebu">
                            Ginatilan, Cebu
                          </option>
                          <option value="Liloan, Cebu">Liloan, Cebu</option>
                          <option value="Lapu-Lapu, City">
                            Lapu-Lapu, City
                          </option>
                          <option value="Madridejos, Cebu">
                            Madridejos, Cebu
                          </option>
                          <option value="Mandaue, Cebu City">
                            Mandaue, Cebu City
                          </option>
                          <option value="Minglanilla, Cebu">
                            Minglanilla, Cebu
                          </option>
                          <option value="Moalboal, Cebu">Moalboal, Cebu</option>
                          <option value="Oslob, Cebu">Oslob, Cebu</option>
                          <option value="Pilar, Cebu">Pilar, Cebu</option>
                          <option value="Pinamungahan, Cebu">
                            Pinamungahan, Cebu
                          </option>
                          <option value="Poro, Cebu">Poro, Cebu</option>
                          <option value="Ronda, Cebu">Ronda, Cebu</option>
                          <option value="San Fernando, Cebu">
                            San Fernando, Cebu
                          </option>
                          <option value="San Francisco, Cebu">
                            San Francisco, Cebu
                          </option>
                          <option value="San Remigio, Cebu">
                            San Remigio, Cebu
                          </option>
                          <option value="Santa Fe, Cebu">Santa Fe, Cebu</option>
                          <option value="Santander, Cebu">
                            Santander, Cebu
                          </option>
                          <option value="Sibonga, Cebu">Sibonga, Cebu</option>
                          <option value="Sogod, Cebu">Sogod, Cebu</option>
                          <option value="Tabogon, Cebu">Tabogon, Cebu</option>
                          <option value="Tabuelan, Cebu">Tabuelan, Cebu</option>
                          <option value="Talisay, Cebu">Talisay, Cebu</option>
                          <option value="Toledo, Cebu">Toledo, Cebu</option>
                          <option value="Tuburan, Cebu">Tuburan, Cebu</option>
                          <option value="Tudela, Cebu">Tudela, Cebu</option>
                          <option value="Tugbong, Cebu">Tugbong, Cebu</option>
                          <option value="Ulat, Cebu">Ulat, Cebu</option>
                          <option value="Umas, Cebu">Umas, Cebu</option>
                          <option value="Ubay, Cebu">Ubay, Cebu</option>
                          <option value="Valencia, Cebu">Valencia, Cebu</option>
                          <option value="Valladolid, Cebu">
                            Valladolid, Cebu
                          </option>
                          <option value="Zambujal, Cebu">Zambujal, Cebu</option>
                        </datalist>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="register-button-landscape"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}

          <div
            popover=""
            id="editForm"
            className="fixed mt-[15%] ml-[35%] inset-0 items-center justify-center bg-black/40 z-50"
          >
            <div className=" rounded-2xl shadow-xl w-full max-w-4xl p-6" style={{backgroundColor: changeColor}}>
              <h1 className="text-2xl font-bold text-white mb-6">
                Update your account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      First name
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      placeholder="Enter First Name"
                      
                      value={submitForm.first_name}
                      onChange={(e) =>
                        setSubmitForm((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                      className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Last name
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Enter Last Name"
                      value={submitForm.last_name}
                      onChange={(e) =>
                        setSubmitForm((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      className="w-full border text-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-white mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone_number"
                      type="text"
                      placeholder="Enter Phone Number"
                      maxLength={11}
                      value={submitForm.phone_number}
                      onChange={(e) =>
                        setSubmitForm((prev) => ({
                          ...prev,
                          phone_number: e.target.value,
                        }))
                      }
                      className="w-full text-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-white  mb-1"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter Address"
                      list="addressList"
                      value={submitForm.address}
                      onChange={(e) =>
                        setSubmitForm((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="w-full border text-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    <datalist id="addressList">
                      {/* Cebu address options... */}
                      <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                          <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                          <option value="Alegria, Cebu">Alegria, Cebu</option>
                          <option value="Argao, Cebu">Argao, Cebu</option>
                          <option value="Asturias, Cebu">Asturias, Cebu</option>
                          <option value="Badian, Cebu">Badian, Cebu</option>
                          <option value="Balamban, Cebu">Balamban, Cebu</option>
                          <option value="Bantayan, Cebu">Bantayan, Cebu</option>
                          <option value="Barili, Cebu">Barili, Cebu</option>
                          <option value="Bogo, Cebu">Bogo, Cebu</option>
                          <option value="Boljoon, Cebu">Boljoon, Cebu</option>
                          <option value="Borbon, Cebu">Borbon, Cebu</option>
                          <option value="Carcar, Cebu">Carcar, Cebu</option>
                          <option value="Carmen, Cebu">Carmen, Cebu</option>
                          <option value="Catmon, Cebu">Catmon, Cebu</option>
                          <option value="Cebu City, Cebu">
                            Cebu City, Cebu
                          </option>
                          <option value="Compostela, Cebu">
                            Compostela, Cebu
                          </option>
                          <option value="Consolacion, Cebu">
                            Consolacion, Cebu
                          </option>
                          <option value="Cordova, Cebu">Cordova, Cebu</option>
                          <option value="Dalaguete, Cebu">
                            Dalaguete, Cebu
                          </option>
                          <option value="Danao, Cebu">Danao, Cebu</option>
                          <option value="Dumanjug, Cebu">Dumanjug, Cebu</option>
                          <option value="Ginatilan, Cebu">
                            Ginatilan, Cebu
                          </option>
                          <option value="Liloan, Cebu">Liloan, Cebu</option>
                          <option value="Lapu-Lapu, City">
                            Lapu-Lapu, City
                          </option>
                          <option value="Madridejos, Cebu">
                            Madridejos, Cebu
                          </option>
                          <option value="Mandaue, Cebu City">
                            Mandaue, Cebu City
                          </option>
                          <option value="Minglanilla, Cebu">
                            Minglanilla, Cebu
                          </option>
                          <option value="Moalboal, Cebu">Moalboal, Cebu</option>
                          <option value="Oslob, Cebu">Oslob, Cebu</option>
                          <option value="Pilar, Cebu">Pilar, Cebu</option>
                          <option value="Pinamungahan, Cebu">
                            Pinamungahan, Cebu
                          </option>
                          <option value="Poro, Cebu">Poro, Cebu</option>
                          <option value="Ronda, Cebu">Ronda, Cebu</option>
                          <option value="San Fernando, Cebu">
                            San Fernando, Cebu
                          </option>
                          <option value="San Francisco, Cebu">
                            San Francisco, Cebu
                          </option>
                          <option value="San Remigio, Cebu">
                            San Remigio, Cebu
                          </option>
                          <option value="Santa Fe, Cebu">Santa Fe, Cebu</option>
                          <option value="Santander, Cebu">
                            Santander, Cebu
                          </option>
                          <option value="Sibonga, Cebu">Sibonga, Cebu</option>
                          <option value="Sogod, Cebu">Sogod, Cebu</option>
                          <option value="Tabogon, Cebu">Tabogon, Cebu</option>
                          <option value="Tabuelan, Cebu">Tabuelan, Cebu</option>
                          <option value="Talisay, Cebu">Talisay, Cebu</option>
                          <option value="Toledo, Cebu">Toledo, Cebu</option>
                          <option value="Tuburan, Cebu">Tuburan, Cebu</option>
                          <option value="Tudela, Cebu">Tudela, Cebu</option>
                          <option value="Tugbong, Cebu">Tugbong, Cebu</option>
                          <option value="Ulat, Cebu">Ulat, Cebu</option>
                          <option value="Umas, Cebu">Umas, Cebu</option>
                          <option value="Ubay, Cebu">Ubay, Cebu</option>
                          <option value="Valencia, Cebu">Valencia, Cebu</option>
                          <option value="Valladolid, Cebu">
                            Valladolid, Cebu
                          </option>
                          <option value="Zambujal, Cebu">Zambujal, Cebu</option>
                      {/* (shortened for clarity – include all as needed) */}
                    </datalist>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Phone Number
                  </label>
                  <p className="text-gray-900 text-lg">
                    {userData.phone_number}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900 text-lg">{userData.address}</p>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Theme Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Profile Color
                  </label>
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
                      style={{ backgroundColor: changeColor }}
                    >
                      Update Theme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Member Since
                  </label>
                  <p className="text-gray-900 text-lg">
                    {new Date(userData.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Last Updated
                  </label>
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
