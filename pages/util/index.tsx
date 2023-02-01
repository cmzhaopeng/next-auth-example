//pages/util/index.ts
import about from '../about';
export namespace Constants {
   export const ADDRESS=process.env.NEXT_PUBLIC_MENU_ADDRESS; 
   export const ADDRESS_STATUS=process.env.NEXT_PUBLIC_MENU_ADDRESS_STATUS;; 
}

import React from 'react'

export default function index() {
  return (
   <>
   <p>
      hello
   </p>
   </>
   )
}
