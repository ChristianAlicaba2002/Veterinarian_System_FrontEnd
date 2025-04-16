// 'use client'
// import PetsData from '@/app/Application/Atoms/PetsData';
// import React, { useEffect, useState } from 'react'


// type PetsData = {
//   pet_id: number;
//   Pet_Name: string;
//   Sex: string;
//   Age: string;
//   Breed: string;
//   Color: string;
//   image: string;
//   Microchip_Number: number;
//   Neutered_Spay: string;
//   Special_Markings: string;
//   Species: string;
//   Weight: number;
// };



// const Adoption = () => {

//   const [pets , setPets] = useState([])

//   useEffect(()=> {
//     const getAllPets = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/Pets");
  
//         if (!response.ok) {
//           console.log(`Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("All pets data:", data.Data);
  
//         setPets(data.Data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getAllPets()
//   }, [])

//   return (
//     <>
//       <div>
//         <h1>Adoption</h1>
//         {pets.map((pet: PetsData) => {
//           pets.sort((a:any, b:any) => a.Breed - b.Breed)
//           const imageUrl = `http://127.0.0.1:8000/api/storage/${pet.image}`;
//           return ( 
//             <div>
//               <PetsData
//                       key={pet.pet_id}
//                       image={imageUrl}
//                       Pet_Name={pet.Pet_Name}
//                       Age={pet.Age}
//                       Species={pet.Species}
//                       Sex={pet.Sex}
//                       Color={pet.Color}
//                       Breed={pet.Breed}
//                       Neutered_Spay={pet.Neutered_Spay}
//                       Special_Markings={pet.Special_Markings}
//                       Microchip_Number={pet.Microchip_Number}
//                       Weight={pet.Weight}
//                     />
//             </div>
//           )
//         })}
//       </div>
//     </>
//   )
// }

// export default Adoption
"use client";

import { useState } from "react";
import styles from "./AdoptionStyles/AdoptionStyles.module.css"; 
import Link from "next/link";

type AdoptionFormData = {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  preferred_pet: string;
  reason: string;
  has_other_pets: string;
  home_type: string;
  agreeTerms: boolean;
};  

export default function PetAdoptionForm() {
  const [formData, setFormData] = useState<AdoptionFormData>({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    preferred_pet: "",
    reason: "",
    has_other_pets: "",
    home_type: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      // [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/adopt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      const data = await response.json();
      alert("Adoption form submitted successfully!");
      console.log(data);

      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        address: "",
        preferred_pet: "",
        reason: "",
        has_other_pets: "",
        home_type: "",
        agreeTerms: false,
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
    <div className={styles.Back}>
    <Link href="/Application/Organisms/Pages/Appointment">
      <img src="/img/back.png" alt="back icon" />
    </Link>
  </div>

    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Pet Adoption Form</h2>

      <input
        name="full_name"
        type="text"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        name="phone_number"
        type="tel"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <textarea
        name="address"
        placeholder="Home Address"
        value={formData.address}
        onChange={handleChange}
        required
        className={styles.textarea}
      />

      <select
        name="preferred_pet"
        value={formData.preferred_pet}
        onChange={handleChange}
        required
        className={styles.select}
      >
        <option value="" className={styles.option}>Select Preferred Pet</option>
        <option value="Dog" className={styles.option}>Dog</option>
        <option value="Cat" className={styles.option}>Cat</option>
        <option value="Rabbit" className={styles.option}>Rabbit</option>
        <option value="Other" className={styles.option}>Other</option>
      </select>

      <textarea
        name="reason"
        placeholder="Why do you want to adopt a pet?"
        value={formData.reason}
        onChange={handleChange}
        required
        className={styles.textarea}
        rows={3}
      />

      <select
        name="has_other_pets"
        value={formData.has_other_pets}
        onChange={handleChange}
        required
        className={styles.select}
      >
        <option value="" className={styles.option}>Do you have other pets?</option>
        <option value="Yes" className={styles.option}>Yes</option>
        <option value="No" className={styles.option}>No</option>
      </select>

      <select
        name="home_type"
        value={formData.home_type}
        onChange={handleChange}
        required
        className={styles.select}
      >
        <option value="" className={styles.option}>Type of Home</option>
        <option value="House" className={styles.option}>House</option>
        <option value="Apartment" className={styles.option}>Apartment</option>
        <option value="Condo" className={styles.option}>Condo</option>
        <option value="Other" className={styles.option}>Other</option>
      </select>

      <label className={styles.label}>
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          required
          className={styles.checkbox}
        />
        <span>
          I agree to the terms and conditions of the pet adoption. I understand that adopting a pet is a long-term responsibility and I am committed to providing a safe, loving home.
        </span>
      </label>

      <button type="submit" className={styles.submitButton}>
        Submit Adoption Form
      </button>
    </form>
    </>
  );
}