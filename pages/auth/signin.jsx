import React from "react";

import { getCsrfToken, getProviders,signIn } from "next-auth/react";





export default function signin({ csrfToken }) {
  return (
    <>
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
          src="/Buy-Australia.png"
          alt=""
        />
        <div className="">
          <form action="/api/auth/callback/github" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="http://localhost:3000/api/auth/callback/github" />
            <button type="submit" className="bg-red-400 mt-6 rounded-lg p-3 text-white hover:bg-red-500">
              <span>Sign in with GitHub</span>
            </button>
          </form>
          <p className="mt-10"/>
          <form action="/api/auth/callback/credentials" method="POST" className="flex item-center mr-2">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <div className="flex-row">

            <div>

              <label className="ml-12" > uid </label>

              <input className="border-none bg-blue-100 flex-2 focus:ring-0 focus:outline-none" name="username"
                id="input-username-for-credentials-provider" type="text"   placeholder="Enter you uid..."/>
            </div>
            <div className="mt-5">

              <label > password </label>
              <input className="border-none bg-blue-100 flex-2 focus:ring-0 focus:outline-none" name="password" id="input-password-for-credentials-provider"
                type="password" 
              />
            </div>
            <button className="bg-red-400  ml-3 mt-6 rounded-lg p-3 text-white hover:bg-red-500" type="submit">Sign in with LDAP</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    
    },
  };
}
