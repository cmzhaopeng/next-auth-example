
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

   