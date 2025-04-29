import React from 'react';
import "./AppointmentStyles/Appointment.css";
import Link from 'next/link';

const Appointment = () => {
  return (
    <>
      <div className='Back'>
        <a href='/Application/Organisms/Layouts'>
          <img src="/img/back.png" alt="back icon" />
        </a>
      </div>

      <div className="AppointmentContainer">
        <div className="AppointmentLeft">
          <h1>Book for an Appointment Now!</h1>
          <img src="/img/animals.gif" alt="appointment animation" />
        </div>

        <div className='Options'>
          <a href='/Application/Organisms/Pages/Grooming'>
            <button>
              <img src="/img/groomer.png" alt="groom icon" />
              Need Grooming?
            </button>
          </a>
          <a href='/Application/Organisms/Pages/CheckUp'>
            <button>
              <img src="/img/check.png" alt="check icon" />
              Check Up?
            </button>
          </a>
          <a href='/Application/Organisms/Pages/Adoption'>
            <button>
              <img src="/img/adoption.png" alt="adoption icon" />
              Looking for Adoption?
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Appointment;
