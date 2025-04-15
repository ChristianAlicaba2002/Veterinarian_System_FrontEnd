"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TUsePetsData, TUseUserData } from "@/app/Application/Types/AllTypes";
import Link from "next/link";

const Adoption = () => {
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
    <>
      <div className="container mx-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Adopt a Pet Today!</h1>
          <p className="text-gray-600 mt-2">
        Every pet deserves a loving home. Browse through our list of adorable pets and find your perfect companion.
          </p>
          {isLoading ? (
        <p className="text-lg font-semibold text-gray-600 mt-4">Loading...</p>
          ) : null}
        </div>
        {pets && pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet: TUsePetsData, index: number) => {
          const imageUrl = `http://127.0.0.1:8000/api/storage/${pet.image}`;
          return (
            <div
          key={pet.pet_id || index}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
          <Image
            src={imageUrl}
            alt={pet.Pet_Name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {pet.Pet_Name}
            </h2>
            <p className="text-sm text-gray-600">Sex: {pet.Sex}</p>
            <p className="text-sm text-gray-600">Breed: {pet.Breed}</p>
            <p className="text-sm text-gray-600">Age: {pet.Age}</p>
            <p className="text-sm text-gray-600">
              Microchip: {pet.Microchip_Number}
            </p>
            <p className="text-sm text-gray-600">
              Neutered/Spayed: {pet.Neutered_Spay}
            </p>
            <p className="text-sm text-gray-600">
              Markings: {pet.Special_Markings}
            </p>
            <p className="text-sm text-gray-600">
              Species: {pet.Species}
            </p>
            <p className="text-sm text-gray-600">
              Weight: {pet.Weight} kg
            </p>
            <p
              className={`text-sm font-semibold mt-2 ${
            pet.Status === "Available"
              ? "text-green-500"
              : "text-red-500"
              }`}
            >
              {pet.Status}
            </p>
            <Link
              href={`/Application/Organisms/Pages/Adoption/${encodeURIComponent(
            pet.pet_id
              )}/${encodeURIComponent(pet.Pet_Name)}/${encodeURIComponent(
            pet.image
              )}/${encodeURIComponent(pet.Age)}/${encodeURIComponent(
            pet.Species
              )}/${encodeURIComponent(pet.Sex)}/${encodeURIComponent(
            pet.Color
              )}/${encodeURIComponent(pet.Breed)}/${encodeURIComponent(
            pet.Microchip_Number
              )}/${encodeURIComponent(
            pet.Special_Markings
              )}/${encodeURIComponent(pet.Weight)}/${encodeURIComponent(
            pet.Status
              )}/${encodeURIComponent(pet.Neutered_Spay)}`}
              className="block mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Inquire
            </Link>
          </div>
            </div>
          );
        })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
        No pets found. Please check back later.
          </p>
        )}
        <div className="text-center mt-8">
          <p className="text-gray-600">
        Adopting a pet is a lifelong commitment. Make sure you're ready to provide a loving and caring home.
          </p>
          <p className="text-gray-600 mt-2">
        Thank you for considering adoption and giving these pets a second chance at life!
          </p>
        </div>
      </div>
    </>
  );
};

export default Adoption;
