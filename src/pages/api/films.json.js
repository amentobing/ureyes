import { MongoDB } from "../../lib/mongodb";

export async function GET({ request }) {
  try {
    // Logika database aman di sini (Server Side)
    const juduls = await new MongoDB("films").getAllJuduls();

    return new Response(JSON.stringify(juduls), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
