# Note for debug


```tsx
const privilege=await prisma.$queryRaw `select distinct p.name as name, p.privilege_type as "privilegeType", p.privilege_content as "privilegeContent",
    p.description as description, p.sort_no  from "Privilege" p left join "GroupPrivilege" gp on p.name=gp.privilege_name
    left join "Group" g on gp.group_name=g.name left join "UserGroup" ug on g.name=ug.group_name
    left join "User" u on u.email=ug.user_email where p.privilege_type=${menu} and u.email=${email} order by p.sort_no`
```

Field sort_no should be in the result fields list because using 'distinct', if not, prisma would throw error: in query list must have SELECT DISTINCT, ORDER BY EXPRESS. If in pgAdimn query tool, it is not required.

the ${menu}, transferred by the browser, might have sql injection risk, so it is better to use the prisma parameter to transfer the parameter.

in pages/auth/signin.jsx,the github form action is :

``` jsx

<form action="/api/auth/signin/github" method="POST">

```

not

``` jsx 
 <form action="/api/auth/callback/github" method="POST">

 <input type="hidden" name="callbackUrl" value="/" />

```

 not
 
``` jsx 

<input type="hidden" name="callbackUrl" value="//api/auth/callback/github" />

```


These path is different with

```jsx 
 
 <form action="/api/auth/callback/credentials" method="POST" className="flex item-center mr-2">

```

 If you use proxy to access github oauth, you need to change the /node_modules/next-auth/core/lib/oauth/client.js file. to use HttpsProxyAgent

add env variable: 

``` .env

http_proxy=http://....

```

``` bash

npm install https-proxy-ageng

```

This client.js might be changed if you use npm update next-auth or other npm command. If have oAuth Error, you may need to check this file.

If your github auth cannot be confirmed, you can delete the Account data in Account table and try again.



## font reference error

error - Failed to download `Inter` from Google Fonts. Using fallback font instead.

Delete or Rem the reference from `/pages/index.tsx` 

``` tsx

import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

```

If not, it will spend long time to wait for downloading the font.

