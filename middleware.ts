import { NextRequest,NextResponse,NextFetchEvent} from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import prisma from "./lib/prisma";

import { getSession } from "next-auth/react";


/*
async function  getPrivilege(name: string,user_email:string) {

    const menu= name
    const email= user_email

    const privilege=await prisma.$queryRaw `select distinct p.name as name, p.privilege_type as "privilegeType", p.privilege_content as "privilegeContent",
    p.description as description, p.sort_no  from "Privilege" p left join "GroupPrivilege" gp on p.name=gp.privilege_name
    left join "Group" g on gp.group_name=g.name left join "UserGroup" ug on g.name=ug.group_name
    left join "User" u on u.email=ug.user_email where p.privilege_type=${menu} and u.email=${email} order by p.sort_no`
  
    console.log(privilege);

}
*/

export async function middleware( req:NextRequest,event:NextFetchEvent) {

    console.log("middleware.ts")
   // if(req.nextUrl.pathname==="/admin"){
        const token = await getToken({ req, secret: process.env.SECRET});
        if (!token) {
            return NextResponse.redirect(new URL("/api/auth/signin", req.url));
        }
        console.log(token.email);
        /*    
        if(privilege.length===0){
            return NextResponse.redirect(new URL("/", req.url));
        }
     */ 
 //   }

   
    
}

export const config={
    matcher:['/admin','/api/addr/:path*','/api/user/:path*','/address','/api/addr','/api/user','/api/post','/create','/drafts',]
}
