'use client'
import React, { useEffect, useState } from 'react'

type Appointment = {
  id: number
  service: string
  date: string
}

export default function History() {
  const [datas , setData] = useState<string | null>();
  const [history, setHistory] = useState<[] | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/clienthistory")
//         const data = await response.json()
//         console.log(data.data)
//         setHistory(data.data)
//       } catch (error) {
//         console.error("Failed to fetch client history", error)
//       }
//     }

//     fetchData()
//   }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">History</h1>

      {history === null ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {history.map((data:any) => (
            <li key={data.client_id} className="border p-3 rounded shadow">
              <p><strong>Service:</strong> {data.service ?? 'N/A'}</p>
              <p><strong>Date:</strong> {data.date ?? 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
