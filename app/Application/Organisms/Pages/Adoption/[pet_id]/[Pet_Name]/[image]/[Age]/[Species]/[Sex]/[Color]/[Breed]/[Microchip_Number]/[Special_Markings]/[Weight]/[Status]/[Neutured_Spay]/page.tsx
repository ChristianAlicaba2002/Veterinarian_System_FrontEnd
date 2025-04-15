"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import {
  TUseUserData,
  TAdoptionInquireData,
} from "@/app/Application/Types/AllTypes";

type otherProps = {
  adoption_date: string;
};

const AdoptionInquire = (props: { params: Promise<TAdoptionInquireData> }) => {
  const {
    pet_id,
    image,
    Pet_Name,
    Age,
    Species,
    Sex,
    Color,
    Breed,
    Microchip_Number,
    Special_Markings,
    Weight,
    Status,
    Neutered_Spay,
  } = use(props.params);

  const [submitting, setSubmmiting] = useState(false);
  const [otherProps, setOtherProps] = useState<otherProps>({
    adoption_date: "",
  });
  const [submitForm, setSubmiForm] = useState<TUseUserData>({
    client_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const submitAllform = {
    pet_id,
    image,
    Pet_Name,
    Age,
    Species,
    Sex,
    Color,
    Breed,
    Microchip_Number,
    Special_Markings,
    Weight,
    Status,
    Neutered_Spay,
    ...submitForm,
    ...otherProps,
  };

  const AdoptionForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmmiting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/adoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submitAllform),
      });
    
      if (!response.ok) {
        const data = await response.json();
        console.log(`Fetch Failed: ${data.message}`);
        throw new Error(`Fetch Failed: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Form Submmited: ${JSON.stringify(data) }`);
    } catch (error) {
      console.log( error);
    } finally {
      setSubmmiting(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
      <form
        onSubmit={AdoptionForm}
        method="post"
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl"
      >
        <div className="pet-details text-center mb-8">
          <Image
            src={`http://127.0.0.1:8000/api/storage/${image}`}
            alt={Pet_Name || "Pet Image"}
            width={500}
            height={500}
            className="rounded-lg mx-auto"
            priority
          />
          <h1 className="text-2xl font-bold mt-4">{pet_id}</h1>
          <h1 className="text-3xl font-semibold text-gray-800 mt-2">
            {decodeURIComponent(Pet_Name)}
          </h1>
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
            <p>
              <span className="font-semibold">Age:</span> {Age}
            </p>
            <p>
              <span className="font-semibold">Species:</span> {Species}
            </p>
            <p>
              <span className="font-semibold">Sex:</span> {Sex}
            </p>
            <p>
              <span className="font-semibold">Color:</span>{" "}
              {decodeURIComponent(Color)}
            </p>
            <p>
              <span className="font-semibold">Breed:</span>{" "}
              {decodeURIComponent(Breed)}
            </p>
            <p>
              <span className="font-semibold">Microchip:</span>{" "}
              {Microchip_Number}
            </p>
            <p>
              <span className="font-semibold">Neutered/Spayed:</span>{" "}
              {Neutered_Spay}
            </p>
            <p>
              <span className="font-semibold">Markings:</span>{" "}
              {decodeURIComponent(Special_Markings)}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {Weight}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {Status}
            </p>
          </div>
        </div>
        <div className="user-information space-y-4">
          <input
            type="text"
            value={submitForm?.first_name}
            onChange={(e) =>
              setSubmiForm((prev) => ({ ...prev, first_name: e.target.value }))
            }
            placeholder="First name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={submitForm?.last_name}
            onChange={(e) =>
              setSubmiForm((prev) => ({ ...prev, last_name: e.target.value }))
            }
            placeholder="Last name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={submitForm?.email}
            onChange={(e) =>
              setSubmiForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            value={submitForm?.phone_number}
            onChange={(e) =>
              setSubmiForm((prev) => ({
                ...prev,
                phone_number: e.target.value,
              }))
            }
            placeholder="Phone number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={submitForm?.address}
            onChange={(e) =>
              setSubmiForm((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="user-information space-y-4 mt-4">
          <label htmlFor="">Adoption Date</label>
          <input
            type="date"
            name=""
            value={otherProps.adoption_date}
            onChange={(e) =>
              setOtherProps((prev) => ({
                ...prev,
                adoption_date: e.target.value,
              }))
            }
          />
        </div>
      
        <div className="submit-button mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {submitting ? " Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionInquire;
