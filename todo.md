
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


  {/*
          getCellClassName={(params:GridCellParams) => {
            if (params.field!=="description" ) {
              return '';
            }
            return params.value==="" ? 'super-app-theme--isnull' : 'hasValue'}}
          */}



    let hasNull=false;
    rows.map((item) => { 
      if(item.description===""){
        setInfo("Please input the description!");
        hasNull=true;
      }
    });

    if (hasNull) return;
