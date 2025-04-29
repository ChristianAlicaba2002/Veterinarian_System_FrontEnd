'use client'
import React, {useEffect, useState} from 'react';

function GETRequest(api:string) {
    const [data, setData] = useState<[]>([])
    const [isLoading , setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        const FetchData = async () => {
            try {
                const response = await fetch(api)
                if(!response.ok)
                {
                    throw new Error(`Failed to fetch data ${response.status}`);
                }
                const data = await response.json();
                setData(data.data)
            }catch (error)
            {
                setError(error as string)
            }
            finally {
                setLoading(false);
            }
        }
        FetchData()
    }, [api]);

    return {data , isLoading, error}
}

export default GETRequest;