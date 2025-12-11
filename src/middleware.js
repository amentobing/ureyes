import { ObjectId } from "mongodb";
import { MongoDB } from "./lib/mongodb";

export async function onRequest({ locals, cookies, url, redirect }, next) {
  // Hapus Data Cookies yang sudah kadaluarsa
  const dbCookies = await new MongoDB("sessions").getAll();
  dbCookies.map(async (cookie) => {
    if (Date.now() > cookie.expires) await new MongoDB("sessions").deleteOne(cookie._id);
  });

  if (url.pathname.startsWith("/") && url.pathname !== "/" && url.pathname !== "/register") {
    const sessionID = cookies.get("sessionID")?.value;
    const userSession = await new MongoDB("sessions").getUserFromSession(sessionID);
    if (!userSession) return redirect(`/?from=${url.pathname}`);
    locals.userData = userSession;
    return next();
  }

  if (url.pathname === "/") {
    const sessionID = cookies.get("sessionID")?.value;
    const userSession = await new MongoDB("sessions").getUserFromSession(sessionID);
    if (!userSession) {
      locals.prompt = "needLogin";
    } else {
      locals.userData = userSession;
    }
    return next();
  }

  return next();
}
