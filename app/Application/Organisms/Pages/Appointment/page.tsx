import React from 'react';
import "./AppointmentStyles/Appointment.css";
import Link from 'next/link';

const Appointment = () => {
  return (
    <>
      <div className='Back'>
        <Link href='/Application/Organisms/Layouts'>
          <img src="/img/back.png" alt="back icon" />
        </Link>
      </div>

      <div className="AppointmentContainer">
        <div className="AppointmentLeft">
          <h1>Book for an Appointment Now!</h1>
          <img src="/img/animals.gif" alt="appointment animation" />
        </div>

        <div className='Options'>
          <Link href='/Application/Organisms/Pages/Grooming'>
            <button>
              <img src="/img/groomer.png" alt="groom icon" />
              Need Grooming?
            </button>
          </Link>
          <Link href='/Application/Organisms/Pages/CheckUp'>
            <button>
              <img src="/img/check.png" alt="check icon" />
              Check Up?
            </button>
          </Link>
          <Link href='/Application/Organisms/Pages/Adoption'>
            <button>
              <img src="/img/adoption.png" alt="adoption icon" />
              Looking for Adoption?
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Appointment;
