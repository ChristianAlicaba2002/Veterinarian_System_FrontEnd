"use client";


import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TUsePetsData } from "@/app/Application/Types/AllTypes";
import Link from "next/link";
import styles from "./AdoptionStyles/AdoptionStyles.module.css"

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
        <>
          <div className={styles.Back}>
            <Link href="/Application/Organisms/Layouts">
              <img src="/img/back.png" alt="back icon" />
            </Link>
          </div>

          <div className={styles.container}>
            <div className={styles.textCenter}>
              <h1 className={styles.title}>
                Adopt a Pet Today!
              </h1>
              <p className={styles.description}>
                Every pet deserves a loving home. Browse through our list of adorable pets and find your perfect companion.
              </p>
              {isLoading && (
                <p className={styles.loading}>
                  Loading...
                </p>
              )}
          </div>

      {pets.length > 0 ? (
        <div className={styles.grid }>
          {pets.map((pet) => (
            <div
              key={pet.pet_id}
              className={styles.petCard}
            >
          <div className={styles.petInfo}>
            <Image
              src={getImageUrl(pet)}
              alt={pet.Pet_Name || "Pet image"}
              width={300}
              height={200}
              className={`styles.petImage ${"w-60 h-50 object-cover mx-auto border-2 border-dashed border-[violet] p-1 rounded-xl"}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/default-pet.jpg";
              }}
            />
              <h2 className={styles.petName}>
                {pet.Pet_Name}
              </h2>
              <div className="grid grid-cols-3 gap-4">
              <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Species</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Species}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Breed</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Breed}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Age</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Age}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Sex</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Sex}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Weight</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Weight} kg
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Color</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Color}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Special Markings</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Special_Markings || "None"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Microchip Number</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm">
                      {pet.Microchip_Number || "N/A"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg text-violet-600 font-bold mb-1">Neutered/Spayed</h3>
                    <span className="bg-gradient-to-r from-pink-200 to-purple-200 border border-pink-100 font-semibold rounded-full px-4 py-2 text-sm ">
                      {pet.Neutered_Spay}
                    </span>
                  </div>
                  <span
                className={`styles.petStatus ${`mt-3text-lg font-semibold ${
                    pet.Status === "Available" ? "text-green-500" : "text-red-500"
                  }`}`}
                    >
                      {pet.Status}
                  </span>
                </div>
              <div className={styles.Inquirebutton}>
                <Link href={`/Application/Organisms/Pages/Adoption/${pet.pet_id}`}>
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
        ) : (
          !isLoading && (
            <p className="text-center text-violet-600 text-lg">
              No pets found. Please check back later.
            </p>
          )
      )};
    </div>
    </>
  );
};

export default PetAdoptionForm;