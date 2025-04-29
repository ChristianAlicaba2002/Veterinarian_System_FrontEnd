import React from 'react';
import {useRouter} from "next/navigation";

async function PostRequest(api:string, data:string) {
    const routeTo = useRouter();


    try {
        const response = await fetch(api,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const userData = await response.json();

        if(!response.ok) {
            throw new Error(`Failed to post request ${response.status}`)
            if(userData.errors) {
                console.log(userData.errors);
            }
        }
        console.log(userData)


        if(userData.token)
        {
            localStorage.setItem('token', userData.token)
            alert('User registered successfully!');
            routeTo.push('/Application/Organisms/Auth/RegisterPage')
        }

      
    }catch (err)
    {
        console.log(err);
    }
    return {}
}

export default PostRequest;