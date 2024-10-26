
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";


// const extractAds = (adsString:any) => {
//   if (typeof adsString !== 'string') {
//     adsString = String(adsString); // Convert to string if not already
//   }

//   // Pad the string with leading zeros if it's less than 6 digits
//   adsString = adsString.padStart(6, '0');

//   const adsArray = adsString.match(/.{1,2}/g) || []; // Split string into chunks of 2
//   const extractedAds = {};

//   adsArray.forEach((ad, index) => {
//     extractedAds[`ad${index + 1}`] = ad; // Assign to ad1, ad2, etc.
//   });

//   return extractedAds;
// };


// const getRandomQuestions = (task, previouslyDisplayed) => {
//   const questions = [
//     { key: 'ad1', value: task.ad1, prompt: 'What minute did you see the first ad?' },
//     { key: 'duration', value: task.duration, prompt: 'What is the duration of the video?' },
//     { key: 'ad2', value: task.ad2, prompt: 'What minute did you see the second ad?' },
//     { key: 'ad3', value: task.ad3, prompt: 'What minute did you see the third ad?' },
//     { key: 'track', value: task.trackmin, prompt: `What minute did you see the ${task.track}?` },
//     { key: 'track2', value: task.trackmin2, prompt: `What minute did you see the ${task.track2}?` }
//   ];

//   // Filter out already displayed questions
//   const filteredQuestions = questions.filter(q => !previouslyDisplayed.includes(q.key));

//   // Shuffle and select up to three questions
//   const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
//   const selectedQuestions = shuffled.slice(0, 3);

//   return selectedQuestions;
// };

// // Quiz Component for handling user input
// const Verfication = ({ selectedQuestions, setDisplayedQuestions }) => {
//   const [userAnswers, setUserAnswers] = useState({});
//   const [feedback, setFeedback] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let isCorrect = true;

//     for (const question of selectedQuestions) {
//       if (userAnswers[question.key] !== question.value) {
//         isCorrect = false;
//         break;
//       }
//     }

//     setFeedback(isCorrect ? 'Good job! All answers are correct.' : 'Try again! Some answers are incorrect.');
//     setDisplayedQuestions(selectedQuestions.map(q => q.key)); // Mark these questions as displayed
//   };

//   return (
//     <div>
//       <h2 className="text-lg font-bold">
//         To get the reward, answer the following questions:
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-wrap justify-between">
//           {selectedQuestions.map((question) => (
//             <div key={question.key} className="flex items-center mb-2 w-full md:w-1/3">
//               <label className="flex-1 text-center">{question.prompt}</label>
//               <input
//                 type="text"
//                 value={userAnswers[question.key] || ''}
//                 onChange={(e) => {
//                   const value = e.target.value.trim(); // Trim whitespace
//                   // Allow only digits and limit input to 2 characters
//                   if (/^\d{0,2}$/.test(value)) {
//                     setUserAnswers({ ...userAnswers, [question.key]: value });
//                   }
//                 }}
//                 placeholder="07"
//                 className="border rounded p-2 w-16 text-center" // Set width to fit two digits
//                 maxLength={2}
//               />
//             </div>
//           ))}
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </form>
//       {feedback && <p className="mt-4 text-green-500">{feedback}</p>}
//     </div>
//   );
// };

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [previouslyDisplayed, setPreviouslyDisplayed] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("/api/tasks");
//         setTasks(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const ads = tasks.length > 0 ? extractAds(tasks[0].ads) : {};
//   const selectedQuestions = tasks.length > 0 ? getRandomQuestions(tasks[0], previouslyDisplayed) : [];

//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="space-y-4 w-full max-w-md">
//         {loading ? (
//           <p>Loading tasks...</p>
//         ) : tasks.length > 0 ? (
//           <Quiz selectedQuestions={selectedQuestions} setDisplayedQuestions={setPreviouslyDisplayed} />
//         ) : (
//           <p>No tasks found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react'

function page() {
  return (
    <div>
      asdfg
    </div>
  )
}

export default page
