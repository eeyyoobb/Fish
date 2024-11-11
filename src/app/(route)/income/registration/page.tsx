// app/(route)/income/registration/page.tsx

// This is a server component by default unless marked with "use client"
export const metadata = {
  title: "225 Days of Self Sanitizing Surface from Coronavirus",
  description: "Just 1 time application",
  openGraph: {
    siteName: "The Fish Way",
    title: "All in One!",
    description: "Just 1 time application",
    url: "http://localhost:3000/income/registration",
    images: [
      {
        url: "https://img.freepik.com/premium-vector/simple-fish-logo-with-orange-color-combination_995281-4026.jpg",
        type: "image/png",
        width: 300,
        height: 300,
      },
    ],
  },
  telegram: {
    card: "summary_large_image",
    title: "225 Days of Self Sanitizing Surface from Coronavirus",
    description: "Just 1 time application",
    images: ["/brand.png"],
  },
};


import { auth } from '@clerk/nextjs/server';
import RegistrationClientComponent from './registrationContiner';
import { useRouter } from 'next/navigation';
 



export default function RegistrationPage() {

  const { userId } = auth(); // Check if the user is authenticated
  const router = useRouter(); 

  return (
    <main>
     {!userId && <RegistrationClientComponent />}
    </main>
  );
}
