// Utility to extract ads
export const extractAds = (adsString: string) => {
    if (typeof adsString !== "string") {
      adsString = String(adsString); // Convert to string if not already
    }
  
    // Pad the string with leading zeros if it's less than 6 digits
    adsString = adsString.padStart(6, "0");
  
    const adsArray = adsString.match(/.{1,2}/g) || []; // Split string into chunks of 2
    const extractedAds: Record<string, string> = {};
  
    adsArray.forEach((ad, index) => {
      extractedAds[`ad${index + 1}`] = ad; // Assign to ad1, ad2, etc.
    });
  
    return extractedAds;
  };
  
  // Utility to get random questions for verification
  export const getRandomQuestions = (task: any, previouslyDisplayed: string[] = []) => {
    const questions = [
      { key: "ad1", value: task.ad1, prompt: "What minute did you see the first ad?" },
      { key: "duration", value: task.duration, prompt: "What is the duration of the video?" },
      { key: "ad2", value: task.ad2, prompt: "What minute did you see the second ad?" },
      { key: "ad3", value: task.ad3, prompt: "What minute did you see the third ad?" },
      { key: "track", value: task.trackmin, prompt: `What minute did you see the ${task.track}?` },
      { key: "track2", value: task.trackmin2, prompt: `What minute did you see the ${task.track2}?` }
    ];
  
    // Filter out already displayed questions
    const filteredQuestions = questions.filter(q => !previouslyDisplayed.includes(q.key));
  
    // Shuffle and select up to three questions
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 3);
  
    return selectedQuestions;
  };
  
  // Utility to verify answers
  export const verifyAnswers = (userAnswers: Record<string, string>, correctAnswers: Record<string, string>) => {
    let isCorrect = true;
  
    for (const key in userAnswers) {
      if (userAnswers[key] !== correctAnswers[key]) {
        isCorrect = false;
        break;
      }
    }
  
    return isCorrect;
  };
  