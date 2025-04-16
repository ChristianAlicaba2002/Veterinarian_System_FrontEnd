"use client";

import React, { useState, useEffect, use } from "react";
import "../../../../../../../../../../../../PetDetailsStyle/PetDetails.css";
import Image from "next/image";
import SubmitButton from "@/app/Application/Atoms/Button";
import Link from "next/link";

type PetParams = {
  pet_id: number;
  image: string;
  Pet_Name: string;
  Age: string;
  Species: string;
  Sex: string;
  Color: string;
  Breed: string;
  Microchip_Number: string;
  Neutered_Spay: string;
  Special_Markings: string;
  Weight: string;
  Status: string;
};

const PetDetails = (props: { params: Promise<PetParams> }) => {
  // Changed type of props.params
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
    Neutered_Spay,
    Special_Markings,
    Weight,
    Status,
  } = use(props.params);

  const [changeColor, setChangeColor] = useState<string>("#3b82f6");

  useEffect(() => {
    // Access localStorage only on client side
    const storedColor = localStorage.getItem("profileHeaderColor");
    if (storedColor) {
      setChangeColor(storedColor);
    }
  }, []);

  const submitForm = () => {
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <div className="pet-details-page">
      <div className="pet-details-container">
        <div className="pet-header" style={{ backgroundColor: changeColor }}>
          <Link href="/Application/Organisms/Layouts" className="back-button">
            {" "}
            <img src="/img/back.png" alt="" />
          </Link>
          <h1 className="pet-name-details">{Pet_Name}</h1>
        </div>

        <div className="pet-content">
          <div className="pet-image-section">
            {image ? (
              <div className="image-wrapper">
                <Image
                  src={`http://127.0.0.1:8000/api/storage/${image}`}
                  alt={Pet_Name || "Pet Image"}
                  width={500}
                  height={500}
                  className="pet-image"
                  priority
                />
              </div>
            ) : (
              <div className="no-image">
                <div className="no-image-icon">🐾</div>
                <span>No Image Available</span>
              </div>
            )}
          </div>

          <div className="pet-info-section">
            <div className="info-card">
              <h2 className="section-title">Basic Information</h2>
              <div className="info-grid">
                <InfoItem label="Age: " value={Age} />
                <InfoItem label="Species: " value={Species} />
                <InfoItem label="Sex: " value={Sex} />
                <InfoItem label="Color: " value={decodeURIComponent(Color)} />
                <InfoItem label="Breed: " value={Breed} />
                <InfoItem label="Weight: " value={Weight} />
              </div>
            </div>

            <div className="info-card">
              <h2 className="section-title">Medical Information</h2>
              <div className="info-grid">
                <InfoItem label="Microchip Number: " value={Microchip_Number} />
                <InfoItem label="Neutered/Spayed: " value={Neutered_Spay} />
                <InfoItem
                  label="Special Markings: "
                  value={decodeURIComponent(Special_Markings)}
                />
                <InfoItem label="Status: " value={Status} />
              </div>
            </div>
          </div>
          <div>
            <Link
              href={`/Application/Organisms/Pages/Adoption/${encodeURIComponent(
                pet_id
              )}/${encodeURIComponent(Pet_Name)}/${encodeURIComponent(
                image
              )}/${encodeURIComponent(Age)}/${encodeURIComponent(
                Species
              )}/${encodeURIComponent(Sex)}/${encodeURIComponent(
                Color
              )}/${encodeURIComponent(Breed)}/${encodeURIComponent(
                Microchip_Number
              )}/${encodeURIComponent(Special_Markings)}/${encodeURIComponent(
                Weight
              )}/${encodeURIComponent(Status)}`}
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

export default PetDetails;
