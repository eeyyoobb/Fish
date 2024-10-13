'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
   const router = useRouter();


const Handlesubmit = () =>{
  router.push("./sign-in");
};
const Handlesignup = () =>{
  router.push("./sign-up");
};


  return (
    <div>
      <button onClick={Handlesubmit}>signin</button>
      <button onClick={Handlesignup}>signup</button>
    </div>
  )
}
