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
        const client = ldap.createClient({
          url: process.env.LDAP_URI,
        })

        // Essentially promisify the LDAPJS client.bind function
        return new Promise((resolve, reject) => {
          client.bind("uid="+credentials.username+","+process.env.LDAP_DN, credentials.password, (error) => {
            if (error) {
              console.error("Failed")
              reject()
            } else {
              console.log("Logged in")
             resolve({
             //   username: credentials.username,
             //   password: credentials.password,
             // 
               id: credentials.username, 
               name: credentials.username, 
               email: credentials.username+"@example.com", 
               image: null, 
                
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
/*   callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.username = user.username? user.username:user.name
        token.password = user.password
        console.log(token.username)
      }
      return token
    },
    async session({ session, token, user }) {
      return { ...session, user: { username: token.username? token.username:session.user.name, uid:token.sub } }
    },
  } */
})