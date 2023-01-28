
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


M6.776,4.72h1.549v6.827H6.776V4.72z M11.751,4.669c-0.942,0-1.61,0.061-2.087,0.143v6.735h1.53 		V9.106c0.143,0.02,0.324,0.031,0.527,0.031c0.911,0,1.691-0.224,2.218-0.721c0.405-0.386,0.628-0.952,0.628-1.621 		c0-0.668-0.295-1.234-0.729-1.579C13.382,4.851,12.702,4.669,11.751,4.669z M11.709,7.95c-0.222,0-0.385-0.01-0.516-0.041V5.895 		c0.111-0.03,0.324-0.061,0.639-0.061c0.769,0,1.205,0.375,1.205,1.002C13.037,7.535,12.53,7.95,11.709,7.95z M10.117,0 		C5.523,0,1.8,3.723,1.8,8.316s8.317,11.918,8.317,11.918s8.317-7.324,8.317-11.917S14.711,0,10.117,0z M10.138,13.373 		c-3.05,0-5.522-2.473-5.522-5.524c0-3.05,2.473-5.522,5.522-5.522c3.051,0,5.522,2.473,5.522,5.522 		C15.66,10.899,13.188,13.373,10.138,13.373z