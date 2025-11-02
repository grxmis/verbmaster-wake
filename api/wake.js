import fetch from "node-fetch";

// URL της κύριας εφαρμογής Render
const URL_TO_WAKE = "https://verbmaster.onrender.com";

/**
 * Scheduled function configuration για Vercel
 * Τρέχει κάθε 10 λεπτά
 */
export const config = {
  runtime: "edge",
  schedule: "*/10 * * * *" // cron expression: κάθε 10 λεπτά
};

export default async function handler(req) {
  try {
    const response = await fetch(URL_TO_WAKE);
    if (response.ok) {
      console.log("Wake-up successful!");
      return new Response(JSON.stringify({ message: "Wake-up successful!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      console.log(`Wake-up failed: ${response.status}`);
      return new Response(JSON.stringify({ message: "Wake-up failed", status: response.status }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return new Response(JSON.stringify({ message: "Error occurred", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
