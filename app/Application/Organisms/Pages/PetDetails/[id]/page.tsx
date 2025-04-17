"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../PetDetailsStyle/PetDetails.css";
import { TUsePetsData } from "@/app/Application/Types/AllTypes";
import Image from "next/image";


type Params = {
  params: Promise<{
    id: number;
  }>;
};

const PetDetails = ({ params }: Params) => {
  const [petData, setPetData] = useState<TUsePetsData[]>([]);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchDataDetails = async (petId: number) => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/Pets/${petId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await res.json();
        if (Array.isArray(fetchedData.data)) {
          setPetData(fetchedData.data);
          console.log(fetchedData.data)
        } else {
          console.error("Fetched data is not an array:", fetchedData.data);
          setPetData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id !== null) {
      fetchDataDetails(id);
    }
  }, [id]);


  return (
    <>
            <div className="Back">
              <Link href="/Application/Organisms/Layouts">
                <img src="/img/back.png" alt="back icon" />
              </Link>
            </div>

      {petData.map((pet: TUsePetsData) => {
        return (
            <div key={pet.pet_id} className="PetCard">
                <h1>{pet.Pet_Name} Information</h1>
                <Image
                    src={`http://127.0.0.1:8000/api/storage/${pet.image}`}
                    alt={pet.Pet_Name}
                    width={150}
                    height={150}
                /> 
                <div className="PetInfo">
                <span>{pet.Species}</span>
                <span>{pet.Age} year's old</span>
                <span>{pet.Sex}</span>
                <span>{pet.Weight} lbs</span>
                <span>{pet.Microchip_Number}</span>
                <span>{pet.Neutered_Spay}</span>
                <span>{pet.Color}</span>
                <span>{pet.Special_Markings}</span>
                <span className={`styles.petStat ${`mt-3text-lg font-extrabold ${
                    pet.Status === "Available" ? "text-green-500" : "text-red-500"
                  }`}`}
                    >{pet.Status}</span>
                </div>
                <Link  className="Inquirebutton" href={`/Application/Organisms/Pages/Adoption/${ pet.pet_id }`}>Inquire now</Link>
            </div>           
        )
      })}
      </>
  );
};


export default PetDetails;
