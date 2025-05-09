"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../utils";
import TimePicker from 'react-time-picker';
import styles from "./GroomingStyles/Grooming.module.css"; 
import Link from "next/link";
import {useRouter} from "next/navigation";
import { TAppointmentData } from "@/app/Application/Types/AllTypes";

type UserData = {
  id: number;
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
};

const Grooming = () => {
  const routeTo = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSubmmiting , setIsSubmmiting] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<TAppointmentData>({
    pet_name: "",
    breed: "",
    service_type: "Basic Grooming",
    appointment_date: "",
    appointment_time: "",
    groomer_name: "",
    notes: "",
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmmiting(true);
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
      // Validate required fields
      if (!appointment.pet_name || !appointment.breed || !appointment.appointment_date ||
        !appointment.appointment_time || !appointment.service_type || !appointment.groomer_name) {
        alert("Please fill in all required fields");
        return;
      }

      // Format the date and time
      const formattedDate = new Date(appointment.appointment_date).toISOString().split('T')[0];
      const formattedTime = appointment.appointment_time;

      const appointmentData = {
        client_id: userData?.client_id || 0,
        first_name: userData?.first_name || "",
        last_name: userData?.last_name || "",
        email: userData?.email || "",
        phone_number: userData?.phone_number || "",
        address: userData?.address || "",
        pet_name: appointment.pet_name.trim(),
        breed: appointment.breed.trim(),
        service_type: appointment.service_type,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        groomer_name: appointment.groomer_name,
        notes: appointment.notes.trim() || "No additional notes"
      };

      const response = await fetch("http://127.0.0.1:8000/api/grooming", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || "Failed to create appointment");
      }

      const result = await response.json();
      console.log("Appointment created:", result);

      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Appointment scheduled successfully!");
      routeTo.push('/Application/Organisms/Layouts');


      // Reset form
      setAppointment({
        pet_name: "",
        breed: "",
        service_type: "Basic Grooming",
        appointment_date: "",
        appointment_time: "",
        groomer_name: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert(error instanceof Error ? error.message : "Failed to schedule appointment. Please try again.");
    }
    finally{
      setIsSubmmiting(false)
    }
  };

  return (
    <>
      <div className={styles.Back}>
        <Link href="/Application/Organisms/Pages/Appointment">
          <img src="/img/back.png" alt="back icon" />
        </Link>
      </div>

      <div className={styles.groomingContainer}>

        {userData && (
          <div className={styles.leftPanel}>
            <div className={styles.userInfo}>
              <h1>Your Information</h1>
              <p>Name:</p>
              <a>{userData.first_name} {userData.last_name}</a>
              <p>Email:</p>
              <a>{userData.email}</a>
              <p>Address:</p>
              <a>{userData.address}</a>
              <p>Phone Number:</p>
              <a>{userData.phone_number}</a>
            </div>
          </div>
        )}

        <div className={styles.rightPanel}>
          <div className={styles.groomingHeader}>
            <h1>Schedule Grooming Appointment</h1>
          </div>

          <form onSubmit={handleSubmit} className={styles.appointmentForm}>
            <div className={styles.formGroup}>
              <label htmlFor="pet_name">Pet Name:</label>
              <input
                type="text"
                name="pet_name"
                value={appointment.pet_name}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    pet_name: e.target.value,
                  }))
                }
                placeholder="Pet name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                name="breed"
                value={appointment.breed}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    breed: e.target.value,
                  }))
                }
                placeholder="Breed"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="appointment_date">Appointment Date:</label>
              <input
                type="date"
                id="appointment_date"
                value={appointment.appointment_date}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    appointment_date: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="appointment_time">Appointment Time:</label>
              <input
                type="time"
                id="appointment_time"
                value={appointment.appointment_time}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    appointment_time: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="service_type">Service Type:</label>
              <select
                id="service_type"
                value={appointment.service_type}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    service_type: e.target.value,
                  }))
                }
                required
              >
                <option value="Basic Grooming">Basic Grooming</option>
                <option value="Full Grooming">Full Grooming</option>
                <option value="Bath Only">Bath Only</option>
                <option value="Haircut">Haircut</option>
                <option value="Nail Trimming">Nail Trimming</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="groomer_name">Assign Groomer:</label>
              <select
                id="groomer_name"
                value={appointment.groomer_name}
                onChange={(e) =>
                  setAppointment((prev) => ({
                    ...prev,
                    groomer_name: e.target.value,
                  }))
                }
                required
              >
                <option value="">Please assign a groomer</option>
                <option value="Christian">Christian</option>
                <option value="Ayumi">Ayumi</option>
                <option value="Raizza">Raizza</option>
                <option value="Arcgel">Arcgel</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                value={appointment.notes}
                onChange={(e) =>
                  setAppointment((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={4}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              {isSubmmiting ? 'Submiting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Grooming;