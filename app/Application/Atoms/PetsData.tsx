import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../public/css/PetsData.css";
import { UsePetsData } from "../Types/PetsData";

const PetsData = (props: UsePetsData) => {
  return (
    <>
      <div key={props.pet_id} className="pet-card">
        <div className="pet-image-container">
          {props.image ? (
            <Image
              src={props.image}
              alt={`Product-${props.Pet_Name}`}
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
          <h1 className="pet-name">{props.Pet_Name}</h1>
          <div className="pet-details">
            <span className="pet-detail">{props.Age}</span>
            <span className="pet-detail">{props.Species}</span>
            <span className="pet-detail">{props.Sex}</span>
            <span className="pet-detail">{props.Color}</span>
            <span className="pet-detail">{props.Breed}</span>
          </div>
          <Link
            href={`/Application/Organisms/Pages/PetDetails/${encodeURIComponent(
              props.image
            )}/${encodeURIComponent(props.Pet_Name)}/${encodeURIComponent(
              props.Age
            )}/${encodeURIComponent(props.Species)}/${encodeURIComponent(
              props.Sex
            )}/${encodeURIComponent(props.Color)}/${encodeURIComponent(
              props.Breed
            )}/${encodeURIComponent(
              props.Microchip_Number
            )}/${encodeURIComponent(props.Neutered_Spay)}/${encodeURIComponent(
              props.Special_Markings
            )}/${encodeURIComponent(props.Weight)}`}
            className="view-more-link"
          >
            View more
          </Link>
        </div>
      </div>
    </>
  );
};

export default PetsData;
