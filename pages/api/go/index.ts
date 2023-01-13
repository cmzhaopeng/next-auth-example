// pages/api/go/index.ts

import { getSession } from "next-auth/react";

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
      message: "You must be Admin to view the protected content on this page.",
    });
    return;
  }

  await fetch('http://localhost:8080/home', {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Authorization': 'BearereyJhbGciOiJIUzI0NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZ0AxMzkuY29tIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjczODU1NzIwLCJpYXQiOjE2NzM1OTY1MjAsImlzcyI6IkJpa2FzaCJ9.YaGN0JPwXw7-_kfHsYkdevYRRV0D1WwlBRpqZ8sMxKs',
        },
        })
        .then(response => response.text())
        .then(data => res.josn(data))
        .catch(error => console.error('Error:', error))
}
