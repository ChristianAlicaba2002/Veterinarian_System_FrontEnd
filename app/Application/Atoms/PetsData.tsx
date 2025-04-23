import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../public/css/PetsData.css";
import { TUsePetsData } from "../Types/AllTypes";

const PetsData = (props: TUsePetsData) => {
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
          <a
            href={`/Application/Organisms/Pages/PetDetails/${props.pet_id}`}
            className="view-more-link"
          >
            View more
          </a>
        </div>
      </div>
    </>
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