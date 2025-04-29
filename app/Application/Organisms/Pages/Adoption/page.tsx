"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TUsePetsData } from "@/app/Application/Types/AllTypes";
import Link from "next/link";

function PetAdoptionForm() {
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

  const getImageUrl = (pet: TUsePetsData) => {
    if (!pet.image) return "/default-pet.jpg";
    return `http://127.0.0.1:8000/api/storage/${pet.image}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-purple-900 mb-6">
              Find Your Perfect Companion
            </h1>
            <p className="text-xl text-purple-700 mb-8">
              Every pet deserves a loving home. Browse through our list of adorable
              pets and find your perfect match.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/Application/Organisms/Pages/Appointment"
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Pets Grid */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <div
                key={pet.pet_id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Pet Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getImageUrl(pet)}
                    alt={pet.Pet_Name || "Pet image"}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-pet.jpg";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        pet.Status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pet.Status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Pet Name */}
                  <h2 className="text-2xl font-bold text-purple-900 mb-4">
                    {pet.Pet_Name}
                  </h2>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Species</p>
                      <p className="text-lg font-semibold text-purple-900">{pet.Species}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Breed</p>
                      <p className="text-lg font-semibold text-purple-900">{pet.Breed}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Age</p>
                      <p className="text-lg font-semibold text-purple-900">{pet.Age}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Sex</p>
                      <p className="text-lg font-semibold text-purple-900">{pet.Sex}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-purple-900">Weight: {pet.Weight} kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <span className="text-purple-900">Color: {pet.Color}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-purple-900">Microchip: {pet.Microchip_Number || "N/A"}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {pet.Status === "Rehomed" ? (
                      <button
                        disabled
                        className="w-full px-6 py-3 bg-gray-100 text-gray-400 rounded-full cursor-not-allowed"
                      >
                        Already Rehomed
                      </button>
                    ) : (
                      <Link
                        href={`/Application/Organisms/Pages/Adoption/${pet.pet_id}`}
                      >
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                          Inquire About {pet.Pet_Name}
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-24 h-24 mx-auto text-purple-200 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl text-purple-600">
                  No pets available at the moment. Please check back later.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PetAdoptionForm;
