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
When you visit http://localhost:3000, you will see the new menu item on the sidebar.





## Add Main Menu Item on SideBar

First insert the privilege into Privilege table and GroupPrivilege table

```sql

insert into "Privilege"(id, name,privilege_type,privilege_content,description) values(uuid_generate_v4(),'权限管理','menu','/privilege','');

insert into "GroupPrivilege" values(uuid_generate_v4(),'GroupAdmin','权限管理');

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
