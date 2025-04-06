import Image from "next/image";
import LandingPage from "./Application/Organisms/LandingPage/page";

export default function Home() {
  return (
    <>
     <LandingPage />
      <p className="text-2xl">Welcome to VetCare</p>
      <p className="text-lg">Your one-stop solution for all your veterinary needs.</p>
      <p className="text-sm">We are here to help you and your pets.</p>
      <p className="text-xs">Contact us for more information.</p>
    </>
   
  );
}
