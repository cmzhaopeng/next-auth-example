# How to extend the framework

## Add Main Menu Item on SideBar

First insert the privilege into Privilege table and GroupPrivilege table

```sql

insert into "Privilege"(id, name,privilege_type,privilege_content,description) values(uuid_generate_v4(),'权限管理','menu','/privilege','');

insert into "GroupPrivilege" values(uuid_generate_v4(),'GroupAdmin','权限管理');

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
