# How to extend the framework

## How to Construct a development database environment, Create a new schema and import the data

1. Create a new schema in the database
2. Copy the data from the public schema to the new schema
3. Change the schema name in .env file

``` sql
create SCHEMA test;

create table test."Account"(like "Account");
insert into test."Account" select * from "Account";

create table test."Address"(like "Address");
insert into test."Address" select * from "Address";

create table test."IpGroup"(like "IpGroup");
insert into test."IpGroup" select * from "IpGroup";

create table test."AddressIpGroup"(like "AddressIpGroup");
insert into test."AddressIpGroup" select * from "AddressIpGroup";

create table test."User" (like "User");
insert into test."User" select * from "User";

create table test."Group"(like "Group");
insert into test."Group" select * from "Group";

create table test."UserGroup"(like "UserGroup");
insert into test."UserGroup" select * from "UserGroup";


create table test."Privilege"(like "Privilege");
insert into test."Privilege" select * from "Privilege";

create table test."GroupPrivilege"(like "GroupPrivilege");
insert into test."GroupPrivilege" select * from "GroupPrivilege";

create table test."Address"(like "Address");
insert into test."Address" select * from "Address";

create table test."Post"(like "Post");
insert into test."Post" select * from "Post";

create table test."Session"(like "Session");
insert into test."Session" select * from "Session";

create table test."VerificationToken"(like "VerificationToken");
insert into test."VerificationToken" select * from "VerificationToken";

```

after that, change the .env file, add a new record into test."Privilege" and test."GroupPrivilege" table

``` sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

insert into test."Privilege"(id, name,privilege_type,privilege_content,description) values(uuid_generate_v4(),'权限管理','menu','/privilege','');

insert into test."GroupPrivilege" values(uuid_generate_v4(),'GroupAdmin','权限管理');

```

When you visit [http://localhost:3000](http://localhost:3000), you will see the new menu item on the sidebar.

## Add Main Menu Item on SideBar

First insert the privilege into Privilege table and GroupPrivilege table

```sql

insert into "Privilege"(id, name,privilege_type,privilege_content,description) values(uuid_generate_v4(),'权限管理','menu','/privilege','');

insert into "GroupPrivilege" values(uuid_generate_v4(),'GroupAdmin','权限管理');

```

## Add icon to the menu item

Visit [Heroicons Website](https://heroicons.com/) to find the icon you want to use, and copy the svg code to the menu item (Move the cursor to the icon you want to use, it will show the shortcut menu "COPY SVG" and "COPY JSX", click COPY SVG, the svg data will be copy into Clipboard). Paste the svg data into text editor, select the data content after the "d=" and before the " />" and copy it. Paste the data into the menu item record in the database (the column name is "description" )  

``` xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>
```

You need copy the data:

```txt
M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z
```

You can use the prisma studio open the database and edit the record. Use the below command:

 ```bash
    npx prisma studio
 ```

Or use the below sql command:

```sql
update "Privilege" set description='M...the data you copy...0z' where name='权限管理
```

If you check the code in Menu.tsx, you will find the data is used in the "d" attribute of the path element.

```tsx
 <div className="mr-2">
    <svg className="h-5 w-5 fill-current"  viewBox="0 0 24 24">
       <path d={item.description} />
    </svg>
 </div>
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
