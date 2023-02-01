
import {useSession, signIn, signOut} from 'next-auth/react'

export default function Component(){
    const { data: session } = useSession()
    if (session) {
      return (
      <>
        {session.user && ( 
          <div>
               <span>{session.user.name}</span>
                 <button onClick={() => signOut()}>登出</button>
                 </div>
          
          )
        }
        </>
       
      )
    }
    return (
        <button onClick={() => signIn()}>登录</button>
    )
}
