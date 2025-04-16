export type TUsePetsData = {
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
  Status: string;
};

export type TAppointmentData = {
  pet_name?: string;
  breed?: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  groomer_name?: string;
  notes: string;
};

export type TUseUserData = {
  client_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
};

export type TLoginProps = {
  email: string;
  password: string;
};

export type TRegisterProps = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  notes?: string;
};

export type TCheckUpAppointmentData = {
  pet_name?: string;
  breed?: string;
  weight?: string;
  species?: string;
  age?: number;
  sex?: string;
  appointment_date?: string;
  checkup_type?: string;
  symptoms?: string;
  preferred_vet?: string;
};
export type TCheckUpAppointmentData = {
  pet_name?: string;
  breed?: string;
  weight?: string;
  species?: string;
  age?: number;
  sex?: string;
  appointment_date?: string;
  checkup_type?: string;
  symptoms?: string;
  preferred_vet?: string;
};

export type TAdoptionInquireData = {
  pet_id?: number,
  image?:string,
  Pet_Name?:string,
  Age?:number,
  Species?:string,
  Sex?:string,
  Color?:string,
  Breed?:string,
  Microchip_Number?:number,
  Special_Markings?:string,
  Weight?:string,
  Status?:string,
  Neutered_Spay?:string,
}