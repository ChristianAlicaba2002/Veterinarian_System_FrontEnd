"use client";

import React, { use, useState, useEffect } from 'react';
import '../../../../../../../../../../../PetDetailsStyle/PetDetails.css'
import Link from 'next/link';
import Image from 'next/image';
import SubmitButton from '@/app/Application/Atoms/Button';

type PetParams = {
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
};

const PetDetails = (props: { params: Promise<PetParams> }) => {
  const {
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
    Weight
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

  }


  return (
    <div className="pet-details-page" >
      <div className="pet-details-container" >
        <div className="pet-header" style={{ backgroundColor: changeColor }}>
          <Link href="/Application/Organisms/Layouts" className="back-button">
            ← Back to Pets
          </Link>
          <h1 className="pet-name-details">{decodeURIComponent(Pet_Name)}</h1>
        </div>

        <div className="pet-content">
          <div className="pet-image-section">
            {image ? (
              <div className="image-wrapper">
                <Image
                  src={`http://127.0.0.1:8000/api/storage/${image}`}
                  alt={decodeURIComponent(Pet_Name) || 'Pet Image'}
                  width={500}
                  height={500}
                  className="pet-image"
                  unoptimized
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
                <InfoItem label="Age" value={decodeURIComponent(Age)} />
                <InfoItem label="Species" value={decodeURIComponent(Species)} />
                <InfoItem label="Sex" value={decodeURIComponent(Sex)} />
                <InfoItem label="Color" value={decodeURIComponent(Color)} />
                <InfoItem label="Breed" value={decodeURIComponent(Breed)} />
                <InfoItem label="Weight" value={decodeURIComponent(Weight)} />
              </div>
            </div>

            <div className="info-card">
              <h2 className="section-title">Medical Information</h2>
              <div className="info-grid">
                <InfoItem label="Microchip Number" value={decodeURIComponent(Microchip_Number)} />
                <InfoItem label="Neutered/Spayed" value={decodeURIComponent(Neutered_Spay)} />
                <InfoItem label="Special Markings" value={decodeURIComponent(Special_Markings)} />
              </div>
            </div>
          </div>
          <div>
            <form action="" method="post">
              <SubmitButton dataForm={submitForm} />
            </form>
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
