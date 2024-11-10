// app/(route)/income/registration/page.tsx

// This is a server component by default unless marked with "use client"
export const metadata = {
  title: "225 Days of Self Sanitizing Surface from Coronavirus",
  description: "Just 1 time application",
  openGraph: {
    siteName: "Pure Surface",
    title: "225 Days of Self Sanitizing Surface from Coronavirus",
    description: "Just 1 time application",
    url: "http://localhost:3000/income/registration",
    images: [
      {
        url: "http://puresurface.in/200x200-png",
        type: "image/png",
        width: 300,
        height: 300,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "225 Days of Self Sanitizing Surface from Coronavirus",
    description: "Just 1 time application",
    images: ["http://puresurface.in/200x200-png"],
  },
};


import RegistrationClientComponent from './registrationContiner';

export default function RegistrationPage() {
  return (
    <main>
      <RegistrationClientComponent />
    </main>
  );
}
