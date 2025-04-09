"use client";

import React, { useEffect, useState } from "react";
import "./MainStyles/main.css";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "../../../../../utils";
import LogoProfile from "@/app/Application/Components/LogoProfile/page";

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  address: string;
  created_at: string;
  updated_at: string;
};

type PetsData = {
  Pet_Name: string;
  Sex: string;
  Age: string;
  Breed: string;
  Color: string;
  image: string;
  Microchip_Number: string;
  Neutered_Spay: string;
  Special_Markings: string;
  Species: string;
  Weight: number;
};

export default function Main() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pets, setPets] = useState([]);
  const [changeColor, setChangeColor] = useState<string>("#3b82f6");

  useEffect(() => {
    // Access localStorage only on client side
    const storedColor = localStorage.getItem("profileHeaderColor");
    if (storedColor) {
      setChangeColor(storedColor);
    }
  }, []);

  const getAllPets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Pets");

      if (!response.ok) {
        console.log(`Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("All pets data:", data.Data);

      // Log the first pet's image path for debugging
      if (data.Data && data.Data.length > 0) {
        console.log("First pet image path:", data.Data[0].image);
      }

      setPets(data.Data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData(user);
    }
    getAllPets();
  }, []);


  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="body">
        <header className="header" style={{ backgroundColor: changeColor }}>
          <div className="header-container">
            <div>
              <h1 className="title">PawfectCare</h1>
              {userData && (
                <p className="welcome-text">
                  Welcome, {userData.first_name} {userData.last_name}
                </p>
              )}
            </div>
            <LogoProfile />
          </div>
        </header>
        <main>
          <div className="main-content">
            <div className="content-card">
              {pets ? (
                pets.map((pet: PetsData) => {
                  const imageUrl = `http://127.0.0.1:8000/api/storage/${pet.image}`;

                  return (
                    <div key={pet.Pet_Name} className="pet-card">
                      <div className="pet-image-container">
                        {imageUrl ? (
                          <Image
                          src={imageUrl}
                          alt={`Product-${pet.Pet_Name}`}
                          width={500}
                          height={500}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        ) : (
                          <div className="no-image-placeholder">
                            <i className="fa-solid fa-paw"></i>
                            <span>No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="pet-info">
                        <h1 className="pet-name">{pet.Pet_Name}</h1>
                        <div className="pet-details">
                          <span className="pet-detail">{pet.Age}</span>
                          <span className="pet-detail">{pet.Species}</span>
                          <span className="pet-detail">{pet.Sex}</span>
                          <span className="pet-detail">{pet.Color}</span>
                          <span className="pet-detail">{pet.Breed}</span>
                        </div>
                        <Link
                          href={`/Application/Organisms/Pages/PetDetails/${encodeURIComponent(
                            pet.image
                          )}/${encodeURIComponent(
                            pet.Pet_Name
                          )}/${encodeURIComponent(
                            pet.Age
                          )}/${encodeURIComponent(
                            pet.Species
                          )}/${encodeURIComponent(
                            pet.Sex
                          )}/${encodeURIComponent(
                            pet.Color
                          )}/${encodeURIComponent(
                            pet.Breed
                          )}/${encodeURIComponent(
                            pet.Microchip_Number
                          )}/${encodeURIComponent(
                            pet.Neutered_Spay
                          )}/${encodeURIComponent(
                            pet.Special_Markings
                          )}/${encodeURIComponent(pet.Weight)}`}
                          className="view-more-link"
                        >
                          View more
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1 style={{ color: "red" }}>No Pets Available</h1>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
