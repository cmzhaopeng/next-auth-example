

const privilege=await prisma.$queryRaw `select distinct p.name as name, p.privilege_type as "privilegeType", p.privilege_content as "privilegeContent",
    p.description as description, p.sort_no  from "Privilege" p left join "GroupPrivilege" gp on p.name=gp.privilege_name
    left join "Group" g on gp.group_name=g.name left join "UserGroup" ug on g.name=ug.group_name
    left join "User" u on u.email=ug.user_email where p.privilege_type=${menu} and u.email=${email} order by p.sort_no`

field sort_no should be in the result fields list because using 'distinct', if not, prisma would throw error: in query list must have SELECT DISTINCT, ORDER BY EXPRESS. If in pgAdimn query tool, it is not required.

the ${menu}, transferred by the browser, might have sql injection risk, so it is better to use the prisma parameter to transfer the parameter.
