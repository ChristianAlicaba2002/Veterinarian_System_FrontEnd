"use client";

import { useState, useEffect } from "react";
import { getUser } from "../../../../../utils";
import Link from "next/link";
import "./CheckUpStyles/CheckUp.css";
import { TCheckUpAppointmentData } from "@/app/Application/Types/AllTypes";

type UserData = {
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
};

export default function CheckUp() {
  const [userData, setUserData] = useState<UserData>({
    client_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<TCheckUpAppointmentData>({
    pet_name: "",
    breed: "",
    weight: "",
    species: "",
    age: 1,
    sex: "",
    appointment_date: "",
    checkup_type: "",
    symptoms: "",
    preferred_vet: "",
  });

  const checkUpData = {
    owner_id: userData.client_id,
    owner_fullname: userData.first_name + " " + userData.last_name,
    owner_address: userData.address,
    owner_email: userData.email,
    owner_phoneNumber: userData.phone_number,
    ...appointment,
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Submitting appointment...");

    if (!agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/checkUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(checkUpData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Appointment booking was not successful.");
        throw new Error(errorData.message || "Failed to create appointment");
      } else {
        const data = await response.json();
        alert("Appointment booked successfully!");
        console.log("Submitted Data:", data);
      }

      // Reset form and state
      setAppointment({
        pet_name: "",
        breed: "",
        weight: "",
        species: "",
        age: 1,
        sex: "",
        appointment_date: "",
        checkup_type: "",
        symptoms: "",
        preferred_vet: "",
      });
      setAgreeTerms(false);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData(user);
    }
  }, []);

  return (
    <>
      <div className="Back">
        <Link href="/Application/Organisms/Layouts">
          <img src="/img/back.png" alt="back icon" />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="Form">
        <div className="CardRow">
          <div className="Card">
            <h2 className="CardSection">Owner Information</h2>
            <input
              type="text"
              value={userData.first_name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, first_name: e.target.value }))
              }
              placeholder="Full Name"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
            />
            <input
              type="tel"
              value={userData.phone_number}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }))
              }
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div className="Card">
          <h2 className="CardSection">Pet Information</h2>
          <input
            type="text"
            value={appointment.pet_name}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, pet_name: e.target.value }))
            }
            placeholder="Pet Name"
          />
          <select
            value={appointment.species}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, species: e.target.value }))
            }
          >
            <option value="">Select Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={appointment.breed}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, breed: e.target.value }))
            }
            placeholder="Breed"
          />
          <input
            type="number"
            value={appointment.age}
            onChange={(e) =>
              setAppointment((prev) => ({
                ...prev,
                age: Number(e.target.value),
              }))
            }
            placeholder="Age (years)"
          />
          <select
            value={appointment.sex}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, sex: e.target.value }))
            }
          >
            <option value="">Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={appointment.weight}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, weight: e.target.value }))
            }
            placeholder="Weight (kg)"
          />
        </div>

        <div className="Card">
          <h2 className="CardSection">Appointment Details</h2>
          <input
            type="date"
            value={appointment.appointment_date}
            onChange={(e) =>
              setAppointment((prev) => ({
                ...prev,
                appointment_date: e.target.value,
              }))
            }
          />
          <select
            value={appointment.checkup_type}
            onChange={(e) =>
              setAppointment((prev) => ({
                ...prev,
                checkup_type: e.target.value,
              }))
            }
          >
            <option value="">Select Check-Up Type</option>
            <option value="General">General</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Dental">Dental</option>
            <option value="Follow-up">Follow-up</option>
          </select>
          <textarea
            value={appointment.symptoms}
            onChange={(e) =>
              setAppointment((prev) => ({ ...prev, symptoms: e.target.value }))
            }
            placeholder="Any symptoms or concerns?"
            rows={3}
          />
          <input
            type="text"
            value={appointment.preferred_vet}
            onChange={(e) =>
              setAppointment((prev) => ({
                ...prev,
                preferred_vet: e.target.value,
              }))
            }
            placeholder="Preferred Vet (optional)"
          />
        </div>
        <div className="Terms">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms((prev) => !prev)}
          />
          <div>
            <span>
              I hereby agree to the terms and conditions regarding pet check-up.
              I confirm that all information provided is accurate and
              acknowledge that it is my responsibility to ensure my pet is
              up-to-date on all required vaccinations as per the guidelines.
            </span>
          </div>
          <button type="submit" className="submit-button">
            Book Appointment
          </button>
        </div>
          
      </form>
    </>
  );
}
