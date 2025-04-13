'use client'
import PetsData from '@/app/Application/Atoms/PetsData';
import React, { useEffect, useState } from 'react'


type PetsData = {
  pet_id: number;
  Pet_Name: string;
  Sex: string;
  Age: string;
  Breed: string;
  Color: string;
  image: string;
  Microchip_Number: number;
  Neutered_Spay: string;
  Special_Markings: string;
  Species: string;
  Weight: number;
};



const Adoption = () => {

  const [pets , setPets] = useState([])

  useEffect(()=> {
    const getAllPets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/Pets");
  
        if (!response.ok) {
          console.log(`Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("All pets data:", data.Data);
  
        setPets(data.Data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPets()
  }, [])

  return (
    <>
      <div>
        <h1>Adoption</h1>
        {pets.map((pet: PetsData) => {
          pets.sort((a:any, b:any) => a.Breed - b.Breed)
          const imageUrl = `http://127.0.0.1:8000/api/storage/${pet.image}`;
          return ( 
            <div>
              <PetsData
                      key={pet.pet_id}
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
                    />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Adoption
