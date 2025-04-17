"use client";

import { useEffect, useState } from "react";
import {
  TAdoptionInquireData,
  TUseUserData,
} from "@/app/Application/Types/AllTypes";
import Image from "next/image";
import { getUser } from "@/utils";
import Link from "next/link";

type Params = {
  params: Promise<{
    id: number
  }>;
};

type adoption_date = {
  adoption_date: string;
};

const Adoption = ({ params }: Params) => {
  const [getData, setGetData] = useState<TAdoptionInquireData[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [isSubmmiting, setIsSubmmiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [submitForm, setSubmitForm] = useState<TUseUserData>({
    client_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [isDate, setIsDate] = useState<adoption_date>({ adoption_date: "" });
  const [petForm, setPetForm] = useState<TAdoptionInquireData>({
    pet_id: 0,
    image: "",
    Pet_Name: "",
    Age: 0,
    Species: "",
    Sex: "",
    Color: "",
    Breed: "",
    Microchip_Number: 0,
    Special_Markings: "",
    Weight: 0,
    Status: "",
    Neutered_Spay: "",
  });

  useEffect(() => {
    const user = getUser();
    setSubmitForm((prev) => ({ ...prev, client_id: user.client_id }));
  }, []);

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
          setGetData(fetchedData.data);
        } else {
          console.error("Fetched data is not an array:", fetchedData.data);
          setGetData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id !== null) {
      fetchDataDetails(id);
    }
  }, [id]);

  const adoptionForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmmiting(true);

    if (
      submitForm.first_name == "" ||
      submitForm.last_name == "" ||
      submitForm.phone_number == "" ||
      submitForm.address == ""
    ) {
      setIsError(true);
      const borderErrors = document.querySelectorAll("#border-error");
      borderErrors.forEach((element) => {
        (element as HTMLElement).style.border = "1px solid red";
      });
    } else {
      const borderErrors = document.querySelectorAll("#border-error");
      borderErrors.forEach((element) => {
        (element as HTMLElement).style.border = "1px solid black";
      });
    }

    const allForm = {
      ...submitForm,
      ...petForm,
      ...isDate,
    };

    console.log(allForm);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/adoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(allForm),
      });
      if (!res.ok) {
        console.log(`Error Failed: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmmiting(false);
    }
  };

  return (
    <>
            <div className="Back mt-5 ml-5 mr-auto mb-auto h-10 w-10">
              <Link href="/Application/Organisms/Layouts">
                <img src="/img/back.png" alt="back icon" />
              </Link>
            </div>

            <h1 className="text-4xl font-extrabold text-center text-violet-900">
              Adopt a Pet
            </h1>
          <div className="container mx-auto p-6 flex flex-col md:flex-row items-start justify-center">   
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 ">
      {getData.map((pet: TAdoptionInquireData) => (
        <div
          key={pet.pet_id}
          className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300
          shadow-xl rounded-2xl border-2 border-purple-300 
          flex flex-col h-full overflow-hidden p-8 w-120 h-fit"
        >
          <Image
            src={`http://127.0.0.1:8000/api/storage/${pet.image}`}
            alt={`Pet Image ${pet.Pet_Name}`}
            width={300}
            height={300}
            className="w-60 h-50 object-cover rounded-xl border-2 border-purple-300 border-dashed mx-auto block p-1"
            priority
          />
          <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
            <h2 className="text-2xl font-bold text-purple-800 text-center">
              {pet.Pet_Name}
            </h2>

            <div className="text-sm text-purple-700 flex flex-col gap-2">
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                {pet.Species} - {pet.Breed}
              </p>
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                Age: {pet.Age} years
              </p>
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                Sex: {pet.Sex}
              </p>
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                Weight: {pet.Weight} kg
              </p>
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                Special Markings: {pet.Special_Markings}
              </p>
              <p className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1">
                Microchip: {pet.Microchip_Number}
              </p>
              <p
                className={`font-semibold px-3 py-1 rounded-xl border text-center ${
                  pet.Status === "Available"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}
              >
                Status: {pet.Status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

        {/* <form
          onSubmit={adoptionForm}
          className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Adoption Form
          </h2>

          {getData.map((pet: TAdoptionInquireData) => (
            <div key={pet.pet_id}>
              <input type="number" value={pet.pet_id} readOnly />
              <input type="text" value={pet.Pet_Name} readOnly />
              <input type="text" value={pet.image} readOnly />
              <input type="number" value={pet.Age} readOnly />
              <input type="text" value={pet.Species} readOnly />
              <input type="text" value={pet.Sex} readOnly />
              <input type="text" value={pet.Color} readOnly />
              <input type="text" value={pet.Breed} readOnly />
              <input type="number" value={pet.Microchip_Number} readOnly />
              <input type="text" value={pet.Neutered_Spay} readOnly />
              <input type="text" value={pet.Special_Markings} readOnly />
              <input type="number" value={pet.Weight} readOnly />
              <input type="text" value={pet.Status} readOnly />
            </div>
          ))}

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={submitForm?.first_name}
                onChange={(e) =>
                  setSubmitForm((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="border-error"
              />
              {isError && !submitForm.first_name && (
                <span className="text-red-600 text-sm">
                  First name is required
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                value={submitForm?.last_name}
                onChange={(e) =>
                  setSubmitForm((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="border-error"
              />
              {isError && !submitForm.last_name && (
                <span className="text-red-600 text-sm">
                  Last name is required
                </span>
              )}
            </div>
            <div>
              <input
                type="tel"
                maxLength={11}
                value={submitForm?.phone_number}
                onChange={(e) =>
                  setSubmitForm((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }))
                }
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="border-error"
              />
              {isError && !submitForm.phone_number && (
                <span className="text-red-600 text-sm">
                  Phone number is required
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                value={submitForm?.email}
                onChange={(e) =>
                  setSubmitForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="border-error"
              />
              {isError && !submitForm.email && (
                <span className="text-red-600 text-sm">Email is required</span>
              )}
            </div>
            <div>
              <input
                type="text"
                list="addressList"
                value={submitForm.address}
                onChange={(e) =>
                  setSubmitForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="border-error"
              />
              <datalist id="addressList">
                <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                <option value="Alegria, Cebu">Alegria, Cebu</option>
                <option value="Argao, Cebu">Argao, Cebu</option>
                <option value="Asturias, Cebu">Asturias, Cebu</option>
                <option value="Badian, Cebu">Badian, Cebu</option>
                <option value="Balamban, Cebu">Balamban, Cebu</option>
                <option value="Bantayan, Cebu">Bantayan, Cebu</option>
                <option value="Barili, Cebu">Barili, Cebu</option>
                <option value="Bogo, Cebu">Bogo, Cebu</option>
                <option value="Boljoon, Cebu">Boljoon, Cebu</option>
                <option value="Borbon, Cebu">Borbon, Cebu</option>
                <option value="Carcar, Cebu">Carcar, Cebu</option>
                <option value="Carmen, Cebu">Carmen, Cebu</option>
                <option value="Catmon, Cebu">Catmon, Cebu</option>
                <option value="Cebu City, Cebu">Cebu City, Cebu</option>
                <option value="Compostela, Cebu">Compostela, Cebu</option>
                <option value="Consolacion, Cebu">Consolacion, Cebu</option>
                <option value="Cordova, Cebu">Cordova, Cebu</option>
                <option value="Dalaguete, Cebu">Dalaguete, Cebu</option>
                <option value="Danao, Cebu">Danao, Cebu</option>
                <option value="Dumanjug, Cebu">Dumanjug, Cebu</option>
                <option value="Ginatilan, Cebu">Ginatilan, Cebu</option>
                <option value="Liloan, Cebu">Liloan, Cebu</option>
                <option value="Lapu-Lapu, City">Lapu-Lapu, City</option>
                <option value="Madridejos, Cebu">Madridejos, Cebu</option>
                <option value="Mandaue, Cebu City">Mandaue, Cebu City</option>
                <option value="Minglanilla, Cebu">Minglanilla, Cebu</option>
                <option value="Moalboal, Cebu">Moalboal, Cebu</option>
                <option value="Oslob, Cebu">Oslob, Cebu</option>
                <option value="Pilar, Cebu">Pilar, Cebu</option>
                <option value="Pinamungahan, Cebu">Pinamungahan, Cebu</option>
                <option value="Poro, Cebu">Poro, Cebu</option>
                <option value="Ronda, Cebu">Ronda, Cebu</option>
                <option value="San Fernando, Cebu">San Fernando, Cebu</option>
                <option value="San Francisco, Cebu">San Francisco, Cebu</option>
                <option value="San Remigio, Cebu">San Remigio, Cebu</option>
                <option value="Santa Fe, Cebu">Santa Fe, Cebu</option>
                <option value="Santander, Cebu">Santander, Cebu</option>
                <option value="Sibonga, Cebu">Sibonga, Cebu</option>
                <option value="Sogod, Cebu">Sogod, Cebu</option>
                <option value="Tabogon, Cebu">Tabogon, Cebu</option>
                <option value="Tabuelan, Cebu">Tabuelan, Cebu</option>
                <option value="Talisay, Cebu">Talisay, Cebu</option>
                <option value="Toledo, Cebu">Toledo, Cebu</option>
                <option value="Tuburan, Cebu">Tuburan, Cebu</option>
                <option value="Tudela, Cebu">Tudela, Cebu</option>
                <option value="Tugbong, Cebu">Tugbong, Cebu</option>
                <option value="Ulat, Cebu">Ulat, Cebu</option>
                <option value="Umas, Cebu">Umas, Cebu</option>
                <option value="Ubay, Cebu">Ubay, Cebu</option>
                <option value="Valencia, Cebu">Valencia, Cebu</option>
                <option value="Valladolid, Cebu">Valladolid, Cebu</option>
                <option value="Zambujal, Cebu">Zambujal, Cebu</option>
              </datalist>
              {isError && !submitForm.address && (
                <span className="text-red-600 text-sm">
                  Address is required
                </span>
              )}
            </div>
            <div>
              Adoption Date:
              <input
                type="date"
                value={isDate.adoption_date}
                onChange={(e) =>
                  setIsDate((prev) => ({
                    ...prev,
                    adoption_date: e.target.value,
                  }))
                }
                id="border-error"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isSubmmiting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form> */}

  <form
      onSubmit={adoptionForm}
      className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 shadow-lg rounded-2xl p-8 border-2 border-purple-300 h-fit w-590"
    >
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Adoption Form</h2>

      {getData.map((pet: TAdoptionInquireData) => (
        <div
          key={pet.pet_id}
          className="grid grid-cols-2 gap-2 bg-white/50 p-4 rounded-xl mb-4 shadow-inner text-sm"
        >
          <input type="number" value={pet.pet_id} readOnly className="form-style" />
          <input type="text" value={pet.Pet_Name} readOnly className="form-style" />
          <input type="text" value={pet.image} readOnly className="form-style" />
          <input type="number" value={pet.Age} readOnly className="form-style" />
          <input type="text" value={pet.Species} readOnly className="form-style" />
          <input type="text" value={pet.Sex} readOnly className="form-style" />
          <input type="text" value={pet.Color} readOnly className="form-style" />
          <input type="text" value={pet.Breed} readOnly className="form-style" />
          <input type="number" value={pet.Microchip_Number} readOnly className="form-style" />
          <input type="text" value={pet.Neutered_Spay} readOnly className="form-style" />
          <input type="text" value={pet.Special_Markings} readOnly className="form-style" />
          <input type="number" value={pet.Weight} readOnly className="form-style" />
          <input type="text" value={pet.Status} readOnly className="form-style" />
        </div>
      ))}

    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={submitForm?.first_name}
          onChange={(e) =>
            setSubmitForm((prev) => ({ ...prev, first_name: e.target.value }))
          }
          placeholder="First Name"
          className="form-style"
        />
        {isError && !submitForm.first_name && (
          <span className="text-red-600 text-sm">First name is required</span>
        )}
      </div>
      <div>
        <input
          type="text"
          value={submitForm?.last_name}
          onChange={(e) =>
            setSubmitForm((prev) => ({ ...prev, last_name: e.target.value }))
          }
          placeholder="Last Name"
          className="form-style"
        />
        {isError && !submitForm.last_name && (
          <span className="text-red-600 text-sm">Last name is required</span>
        )}
      </div>
      <div>
        <input
          type="tel"
          maxLength={11}
          value={submitForm?.phone_number}
          onChange={(e) =>
            setSubmitForm((prev) => ({ ...prev, phone_number: e.target.value }))
          }
          placeholder="Phone Number"
          className="form-style"
        />
        {isError && !submitForm.phone_number && (
          <span className="text-red-600 text-sm">Phone number is required</span>
        )}
      </div>
      <div>
        <input
          type="email"
          value={submitForm?.email}
          onChange={(e) =>
            setSubmitForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Email"
          className="form-style"
        />
        {isError && !submitForm.email && (
          <span className="text-red-600 text-sm">Email is required</span>
        )}
      </div>
      <div>
        <input
          type="text"
          list="addressList"
          value={submitForm.address}
          onChange={(e) =>
            setSubmitForm((prev) => ({ ...prev, address: e.target.value }))
          }
          placeholder="Address"
          className="form-style"
        />
        <datalist id="addressList">


      <option value="Alcantara, Cebu">Alcantara, Cebu</option>
                <option value="Alcoy, Cebu">Alcoy, Cebu</option>
                <option value="Alegria, Cebu">Alegria, Cebu</option>
                <option value="Argao, Cebu">Argao, Cebu</option>
                <option value="Asturias, Cebu">Asturias, Cebu</option>
                <option value="Badian, Cebu">Badian, Cebu</option>
                <option value="Balamban, Cebu">Balamban, Cebu</option>
                <option value="Bantayan, Cebu">Bantayan, Cebu</option>
                <option value="Barili, Cebu">Barili, Cebu</option>
                <option value="Bogo, Cebu">Bogo, Cebu</option>
                <option value="Boljoon, Cebu">Boljoon, Cebu</option>
                <option value="Borbon, Cebu">Borbon, Cebu</option>
                <option value="Carcar, Cebu">Carcar, Cebu</option>
                <option value="Carmen, Cebu">Carmen, Cebu</option>
                <option value="Catmon, Cebu">Catmon, Cebu</option>
                <option value="Cebu City, Cebu">Cebu City, Cebu</option>
                <option value="Compostela, Cebu">Compostela, Cebu</option>
                <option value="Consolacion, Cebu">Consolacion, Cebu</option>
                <option value="Cordova, Cebu">Cordova, Cebu</option>
                <option value="Dalaguete, Cebu">Dalaguete, Cebu</option>
                <option value="Danao, Cebu">Danao, Cebu</option>
                <option value="Dumanjug, Cebu">Dumanjug, Cebu</option>
                <option value="Ginatilan, Cebu">Ginatilan, Cebu</option>
                <option value="Liloan, Cebu">Liloan, Cebu</option>
                <option value="Lapu-Lapu, City">Lapu-Lapu, City</option>
                <option value="Madridejos, Cebu">Madridejos, Cebu</option>
                <option value="Mandaue, Cebu City">Mandaue, Cebu City</option>
                <option value="Minglanilla, Cebu">Minglanilla, Cebu</option>
                <option value="Moalboal, Cebu">Moalboal, Cebu</option>
                <option value="Oslob, Cebu">Oslob, Cebu</option>
                <option value="Pilar, Cebu">Pilar, Cebu</option>
                <option value="Pinamungahan, Cebu">Pinamungahan, Cebu</option>
                <option value="Poro, Cebu">Poro, Cebu</option>
                <option value="Ronda, Cebu">Ronda, Cebu</option>
                <option value="San Fernando, Cebu">San Fernando, Cebu</option>
                <option value="San Francisco, Cebu">San Francisco, Cebu</option>
                <option value="San Remigio, Cebu">San Remigio, Cebu</option>
                <option value="Santa Fe, Cebu">Santa Fe, Cebu</option>
                <option value="Santander, Cebu">Santander, Cebu</option>
                <option value="Sibonga, Cebu">Sibonga, Cebu</option>
                <option value="Sogod, Cebu">Sogod, Cebu</option>
                <option value="Tabogon, Cebu">Tabogon, Cebu</option>
                <option value="Tabuelan, Cebu">Tabuelan, Cebu</option>
                <option value="Talisay, Cebu">Talisay, Cebu</option>
                <option value="Toledo, Cebu">Toledo, Cebu</option>
                <option value="Tuburan, Cebu">Tuburan, Cebu</option>
                <option value="Tudela, Cebu">Tudela, Cebu</option>
                <option value="Tugbong, Cebu">Tugbong, Cebu</option>
                <option value="Ulat, Cebu">Ulat, Cebu</option>
                <option value="Umas, Cebu">Umas, Cebu</option>
                <option value="Ubay, Cebu">Ubay, Cebu</option>
                <option value="Valencia, Cebu">Valencia, Cebu</option>
                <option value="Valladolid, Cebu">Valladolid, Cebu</option>
                <option value="Zambujal, Cebu">Zambujal, Cebu</option>
          </datalist>
          {isError && !submitForm.address && (
            <span className="text-red-600 text-sm">Address is required</span>
          )}
        </div>
        <div className="text-sm text-purple-800 font-medium">
          Adoption Date:
          <input
            type="date"
            value={isDate.adoption_date}
            onChange={(e) =>
              setIsDate((prev) => ({ ...prev, adoption_date: e.target.value }))
            }
            className="form-style mt-1"
          />
        </div>
      </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition duration-300 shadow-md"
            >
              {isSubmmiting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adoption;
