import React from 'react'
import Link from 'next/link'

const Appointment = () => {
  return (
    <div>
        <Link href='/Application/Organisms/Layouts'>Go Back</Link>
        <h1>Appointment</h1>
        <Link href='/Application/Organisms/Pages/Grooming'>Need Grooming ?</Link>
        <Link href='/Application/Organisms/Pages/CheckUp'>Check Up ?</Link>
        <Link href='/Application/Organisms/Pages/Adoption'>Looking Adoption ?</Link>
    </div>
  )
}

export default Appointment
