"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../utils";
import LogoProfile from "@/app/Application/Components/LogoProfile/page";
import UserMessage from "@/app/Application/Atoms/UserMessage";
import PetsData from "@/app/Application/Atoms/PetsData";
import { TUseUserData, TUsePetsData } from "@/app/Application/Types/AllTypes";
import "./MainStyles/main.css";
import Link from "next/link";

export default function Main() {
  const [userData, setUserData] = useState<TUseUserData | null>(null);
  const [pets, setPets] = useState<TUsePetsData[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [changeColor, setChangeColor] = useState<string>("#3b82f6");

  useEffect(() => {
    const storedColor = localStorage.getItem("profileHeaderColor");
    if (storedColor) {
      setChangeColor(storedColor);
    }
  }, []);

  const getAllPets = async () => {
    setIsloading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Pets");
      if (!response.ok) {
        console.log(`Status: ${response.status}`);
        return;
      }
      const data = await response.json();

      setPets(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
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
      <div className="MainBody">
        <header className="MainHeader" style={{ backgroundColor: changeColor }}>
          <div className="header-container">
            <div>
              <h1 className="Brand">FurEver 🐾</h1>
              {userData && (
                <UserMessage
                  first_name={userData.first_name}
                  last_name={userData.last_name}
                />
              )}
            </div>
            <LogoProfile />
          </div>
        </header>

        <main>
          {isLoading ? 'loading...' : ""}
          <div className="main-content">
            <div className="content-card">
              {pets.length > 0 ? pets.map((pet: TUsePetsData) => {
                pets.sort((a: any, b: any) => a.Breed.localeCompare(b.Breed));
                const imageUrl = `http://127.0.0.1:8000/api/storage/${pet.image}`;
                return (
                  <PetsData
                    key={pet.pet_id}
                    pet_id={pet.pet_id}
                    image={imageUrl}
                    Pet_Name={pet.Pet_Name}
                    Age={pet.Age}
                    Species={pet.Species}
                    Sex={pet.Sex}
                    Color={pet.Color}
                    Breed={pet.Breed}
                    Neutered_Spay={pet.Neutered_Spay}
                    Special_Markings={pet.Special_Markings}
                    Microchip_Number={pet.Microchip_Number}
                    Weight={pet.Weight}
                    Status={pet.Status}
                  />
                );
              }) : <h1>No Available pets..</h1>}
            </div>
          </div>
        </main>
      </div>
    </>
  );
  
}


