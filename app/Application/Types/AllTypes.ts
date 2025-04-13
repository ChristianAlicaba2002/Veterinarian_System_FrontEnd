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
};

export type TUseUserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  address: string;
  created_at: string;
  updated_at: string;
};

export type TLoginProps = {
    email: string;
    password: string;
}

export type TRegisterProps = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  notes?: string;
};
