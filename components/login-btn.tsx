
import {useSession, signIn, signOut} from 'next-auth/react'

export default function Component(){
    const { data: session } = useSession()
    if (session) {
      return (
      <>
         <span>{session.user.username}</span>
          <button onClick={() => signOut()}>登出</button>
        </>
      )
    }
    return (
        <button onClick={() => signIn()}>登录</button>
    )
}
