import React from 'react'
import { getCsrfToken } from 'next-auth/react'

export default function signin({ csrfToken }) {
  return (
<>
<div >
                    <form action="/api/auth/signin/github" method="POST"><input type="hidden"
                            name="csrfToken"
                            value={csrfToken} /><input
                            type="hidden" name="callbackUrl" value="http://localhost:3000/address" /><button
                            type="submit" class="button"
                            ><img
                                id="provider-logo" src="https://authjs.dev/img/providers/github.svg" /><img
                                id="provider-logo-dark"
                                src="https://authjs.dev/img/providers/github-dark.svg" /><span>Sign in with
                                GitHub</span></button></form>
                </div>
                <div >
                    <hr />
                    <form action="/api/auth/callback/credentials" method="POST"><input
                            type="hidden" name="csrfToken"
                            value={csrfToken} />
                        <div><label class="section-header"
                                for="input-username-for-credentials-provider">uid</label><input name="username"
                                id="input-username-for-credentials-provider" type="text" placeholder label="uid" />
                        </div>
                        <div><label class="section-header"
                                for="input-password-for-credentials-provider">password</label><input name="password"
                                id="input-password-for-credentials-provider" type="password" placeholder
                                label="password" /></div><button type="submit">Sign in with LDAP</button>
                    </form>
                    </div>

</>

  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}