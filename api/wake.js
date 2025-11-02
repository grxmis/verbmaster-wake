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
    // Στέλνουμε το request χωρίς να περιμένουμε την απάντηση
    fetch(URL_TO_WAKE).catch(() => {}); 

    // Επιστρέφουμε αμέσως επιβεβαίωση
    return new Response(JSON.stringify({ message: "Wake-up triggered!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error occurred", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
