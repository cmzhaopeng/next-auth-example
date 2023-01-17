const ldap = require("ldapjs")
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"


export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 40000,
      },
    }), 
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "uid", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // You might want to pull this call out so we're not making a new LDAP client on every login attemp
        const user= await prisma.user.findFirst({
                where: {
                  name: credentials.username,
                },
              })
        const client = ldap.createClient({
          url: process.env.LDAP_URI,
        })
         if(!user){
                console.log("User not found in user table")
                return null
           }

        // Essentially promisify the LDAPJS client.bind function
        return new Promise((resolve, reject) => {
          client.bind("uid="+credentials.username+","+process.env.LDAP_DN, credentials.password, (error) => {
            if (error) {
              reject(error)
            } else {
              console.log("Logged in")
             resolve({
             //   username: credentials.username,
             //   password: credentials.password,
             // 
               id: user.id, 
               name: credentials.username, 
               email: user.email, 
               image: user.image, 
                
              }) 
            }
          })
        })
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token, user }) {
      // Add property to session, like an access_token from a provider.
      session.user.username = session.user.name.split(" ").join().toLocaleLowerCase();
      session.user.uid= token.sub?token.sub:session.user.id;
      const formData = new FormData();
      formData.append("email", session.user.email);
      formData.append("password", process.env.APP_KEY);

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: formData,
      })
      
      const data = await response.json();
      console.log(data);
/*
      const res=await  fetch("http://localhost:8080/home", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZ0AxMzkuY29tIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjczODc2MDgyLCJpYXQiOjE2NzM2MTY4ODIsImlzcyI6IkJpa2FzaCJ9.Zx0PHYnvUNJwuOzU4oAFtBqONwgEs5p-bY3oICnUXKw",
        },

      });

      const data2 = await res.json();

      console.log(data2);
      */
    /* 
     await fetch("http://localhost:8080/login", {
        method: "POST",
        body: formData,
      }).then((response) => response.json())
      .then((data) => {
        const jwtToken = data.token;
        console.log("Success:", jwtToken);
        return {...session, jwtToken:"skskskjwtToken", } ;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      */
      return {...session, jwtToken:data.token } ;
    }

  },
  
  /*  async session({ session, token, user }) {
      return { ...session, user: { username: token.username? token.username:session.user.name, uid:token.sub } }
    },
  } */
})