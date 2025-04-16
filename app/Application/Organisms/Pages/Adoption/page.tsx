"use client";


import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TUsePetsData } from "@/app/Application/Types/AllTypes";
import Link from "next/link";
import styles from "./AdoptionStyles/AdoptionStyles.module.css"; 

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

 function PetAdoptionForm() {
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
  const [pets, setPets] = useState<TUsePetsData[]>([]);

  useEffect(() => {
    const FetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/Pets");
        if (!response.ok) {
          throw new Error(`Fetch Failed : ${response.status}`);
        }
        const data = await response.json();
        setPets(data.data || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    FetchData();
  }, []);



  // Fallback image if pet.image is not available
  const getImageUrl = (pet: TUsePetsData) => {
    if (!pet.image) return "/default-pet.jpg";
    return `http://127.0.0.1:8000/api/storage/${pet.image}`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Adopt a Pet Today!</h1>
        <p className="text-gray-600 mt-2">
          Every pet deserves a loving home. Browse through our list of adorable pets and find your perfect companion.
        </p>
        {isLoading && (
          <p className="text-lg font-semibold text-gray-600 mt-4">Loading...</p>
        )}
      </div>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.pet_id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={getImageUrl(pet)}
                alt={pet.Pet_Name || "Pet image"}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-pet.jpg";
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {pet.Pet_Name}
                </h2>
                <p className="text-sm text-gray-600">Sex: {pet.Sex}</p>
                <p className="text-sm text-gray-600">Breed: {pet.Breed}</p>
                <p className="text-sm text-gray-600">Age: {pet.Age}</p>
                <p className="text-sm text-gray-600">
                  Microchip: {pet.Microchip_Number || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Neutered/Spayed: {pet.Neutered_Spay}
                </p>
                <p className="text-sm text-gray-600">
                  Markings: {pet.Special_Markings || "None"}
                </p>
                <p className="text-sm text-gray-600">Species: {pet.Species}</p>
                <p className="text-sm text-gray-600">Weight: {pet.Weight} kg</p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    pet.Status === "Available" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {pet.Status}
                </p>
                  <Link href={`/Application/Organisms/Pages/Adoption/${ pet.pet_id }`}>Inquire now</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-center text-gray-600 text-lg">
            No pets found. Please check back later.
          </p>
        )
      )}
    </div>
  );
};

export default PetAdoptionForm;