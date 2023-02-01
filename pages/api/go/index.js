// pages/api/go/index.ts

import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req, res) {
  // At this position, you should have a session object with a user object
  // ensure the user is authenticated and has admin privileges
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({
      message:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!isAdmin) {
    res.status(401).json({
      message: "You must login to view the protected content on this page.",
    });
    return;
  }

  console.log(session)

  const response = await fetch("http://localhost:8080/home", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " + session.jwtToken,
    },
  });

  const data2 = await response.json();

  console.log(data2);
  console.log("api/go/index.ts")
  return res.json(data2);

}
