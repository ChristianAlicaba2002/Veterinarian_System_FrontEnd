"use client";

import styles from "./AdoptionStyles/AdoptionStyles.module.css"; 
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TUsePetsData, TUseUserData } from "@/app/Application/Types/AllTypes";


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

  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/Pets");
        if (!response.ok) {
          throw new Error(`Fetch Failed : ${response.status}`);
        }
        const data = await response.json();
        setPets(data.Data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    FetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">Pet Adoption Form</h2>

      <input
        name="full_name"
        type="text"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        name="phone_number"
        type="tel"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="address"
        placeholder="Home Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <select
        name="preferred_pet"
        value={formData.preferred_pet}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Preferred Pet</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Rabbit">Rabbit</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="reason"
        placeholder="Why do you want to adopt a pet?"
        value={formData.reason}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
        rows={3}
      />

      <select
        name="has_other_pets"
        value={formData.has_other_pets}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Do you have other pets?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <select
        name="home_type"
        value={formData.home_type}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Type of Home</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Condo">Condo</option>
        <option value="Other">Other</option>
      </select>

      <label className="flex gap-2 items-start text-sm">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          required
        />
        <span>
          I agree to the terms and conditions of the pet adoption. I understand that adopting a pet is a long-term responsibility and I am committed to providing a safe, loving home.
        </span>
      </label>

      <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
        Submit Adoption Form
      </button>
    </form>
  );
}
