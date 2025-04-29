import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TUsePetsData } from "@/app/Application/Types/AllTypes";

interface PetsDataProps {
  pet_id: number;
  Pet_Name: string;
  image: string;
  Species: string;
  Breed: string;
  Age: string;
  Sex: string;
  Weight: number;
  Color: string;
  Neutered_Spay: string,
  Special_Markings: string,
  Microchip_Number: number | string;
  Status: string;
}

const PetsData: React.FC<PetsDataProps> = (props) => {
  const getImageUrl = (image: string) => {
    if (!image) return "/default-pet.jpg";
    return `http://127.0.0.1:8000/api/storage/${image}`;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Pet Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={props.image}
          alt={props.Pet_Name || "Pet image"}
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
              props.Status === "Available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {props.Status}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Pet Name */}
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          {props.Pet_Name}
        </h2>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-sm text-purple-600 font-medium">Species</p>
            <p className="text-lg font-semibold text-purple-900">{props.Species}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-sm text-purple-600 font-medium">Breed</p>
            <p className="text-lg font-semibold text-purple-900">{props.Breed}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-sm text-purple-600 font-medium">Age</p>
            <p className="text-lg font-semibold text-purple-900">{props.Age}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-sm text-purple-600 font-medium">Sex</p>
            <p className="text-lg font-semibold text-purple-900">{props.Sex}</p>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-purple-900">Weight: {props.Weight} kg</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="text-purple-900">Color: {props.Color}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="text-purple-900">Neutered_Spay: {props.Neutered_Spay}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-purple-900">Microchip: {props.Microchip_Number}</span>
          </div>
        </div> */}

        {/* Action Button */}
        <div className="pt-4">
          <Link href={`/Application/Organisms/Pages/PetDetails/${props.pet_id}`}>
            <button className="cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetsData;


// ${encodeURIComponent(
//   props.image
// )}/${encodeURIComponent(props.Pet_Name)}/${encodeURIComponent(
//   props.Age
// )}/${encodeURIComponent(props.Species)}/${encodeURIComponent(
//   props.Sex
// )}/${decodeURIComponent(props.Color)}/${encodeURIComponent(
//   props.Breed
// )}/${encodeURIComponent(
//   props.Microchip_Number
// )}/${encodeURIComponent(props.Neutered_Spay)}/${decodeURIComponent(
//   props.Special_Markings
// )}/${encodeURIComponent(props.Weight)}/${encodeURIComponent(
//   props.Status
// )}