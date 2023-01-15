
1. Modify the [...nextauth].js] file to check if the ldap authenticate user in the User table, if not, reject it. 
finished.

2. add user registration page, and add user registration function for ldap user. 
   add admin email in the env file.
   in Header component, if the email is admin, show the admin link.
    in the admin page, show the user list  
finished.

3. CRUD for the user table. 
finished.

4. add hint or prompting message after the user operation.

   before reload the users from the database, if add, edit, delete operation is not save to the database, show the message to the user, if the user select to reload the users, the operation will be lost.
   if the user select to confirm  the operation, the data will be reload from the database.
   if the user select to cancel,  do nothing.

   finished.

5. add export function for the user table, export the data to a csv file. 

6. import function for the user table, import the data from a csv file.

7. add session custom data

finished


8. add user group table
   relation with user table 
   id，group_name,group_description,user_id 

finished

9. add privilege table
   id, privilege_type, privilege_name, privilege_content, group_id
finished


10. add dict table
   
   id, code, description,ref_table, ref_column

  I have another table Privilege, and the many to many relation with Group use GroupPrivilege table, if I query a user 's privilege,  how to write the prisma query

   If you want to query the privileges of a user, you can use the .groups() relation in the Prisma query to traverse the many-to-many relation between User and Group. Here's an example of how you can query the privileges of a user with ID 1:

Copy code
query {
  user(where: {id: 1}) {
    id
    name
    groups {
      id
      name
      privileges {
        id
        name
      }
    }
  }
}
This query returns the user with ID 1, along with their name and the groups they belong to. For each group, it also returns the group's id, name, and all the privileges that are associated with the group via GroupPrivilege table.

You can also filter the privileges based on certain condition using privileges field on Group type by using .privileges(where: {...})

Copy code
query {
  user(where: {id: 1}) {
    id
    name
    groups {
      id
      name
      privileges(where: {name_contains: "admin"}) {
        id
        name
      }
    }
  }
}
This query returns the user with ID 1, along with their name and the groups they belong to. For each group, it also returns the group's id, name, and all the privileges that are associated with the group via GroupPrivilege table but only those privileges that contain 'admin' in their name.

You can use different filters, sorting, pagination options on the privileges field based on your requirement.



