import React from "react";
import { getCsrfToken } from "next-auth/react";

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
          <form action="/api/auth/signin/github" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="http://localhost:3000/address" />
            <button type="submit" className="bg-red-400 mt-6 rounded-lg p-3 text-white hover:bg-red-500">
              <span>Sign in with GitHub</span>
            </button>
          </form>
          <p className="mt-10"/>
          <form action="/api/auth/callback/credentials" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
              <label className="ml-12" > uid </label>

              <input className="border-blue-500 placeholder-blue-500 focus:border-blue-500" name="username"
                id="input-username-for-credentials-provider" type="text"  label="uid" />
            <div className="mt-4">
              <label  for="input-password-for-credentials-provider"> password </label>
              <input name="password" id="input-password-for-credentials-provider"
                type="password" placeholder label="password"
              />
            </div>
            <button className="bg-red-400  ml-3 mt-6 rounded-lg p-3 text-white hover:bg-red-500" type="submit">Sign in with LDAP</button>
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
