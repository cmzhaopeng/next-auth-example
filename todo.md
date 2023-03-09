
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
   

11. replace the style with tailWindCSS

12. replace the main page with react-admin-dashboard


13. Header.tsx according the menu and user privilege to show the sub menu, and change the sub menu background color when the sub menu is selected.

14. adjust the pages directory structure, add pages/admin, pages/post, pages/address, when the browser in the admin page, the SideBar menu item will get the link string, and according the left string change the background.

15. the menu item in the database privilege table, should have sort number, and the menu item in the SideBar should be sort by the sort number.


You need to select the svg icon that has the same viewBox size as the other icons in the sidebar, and has no other parameters in the svg tag. Otherwise, the icon will not be displayed correctly.


16. add TodoList model, add TodoList Notifications and link, and add the TodoList component in the TodoList page. 


17. after npm run build, you need modify the .env file such as NEXTAUTH_URL=http://192.168.2.55:3000, but can't access in localhost, when use ldap login. if you access from localhost, you need modify the .env file such as NEXTAUTH_URL=http://127.0.0.1:3000, not NEXTAUTH_URL=http://localhost:3000,  https://github.com/nextauthjs/next-auth/discussions/4870 Keep getting CLIENT_FETCH_ERROR in production. NEXTAUTH_URL is set #4870

if you use oauth, it has other problem.

Account management

    M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z
    
about

M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z