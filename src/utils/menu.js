import { list, check, todo, Home,heart } from "./Icons";  // Make sure these components are correctly imported


export const menu = [
  {
    title: "MENU",
    items: [
      { 
        id: 1,
        icon: Home,  // Capitalized component names
        label: "Home",
        link: "/income",
        visible: ["school/admin", "school/teacher", "school/student", "school/parent"],
      },
      {
        id: 2,
        icon: heart,  // Corrected to List
        label: "Tasks",
        link: "/income",
        visible: ["school/admin", "todo/employee", "school/student", "school/parent"],
      },
      {
        id: 3,
        icon: check ,  // Corrected to Check
        label: "Completed",
        link: "/completed",
        visible: ["school/admin", "school/teacher", "school/student", "school/parent"],
      },
      {
        id: 4,
        icon: todo ,  // Corrected to Todo
        label: "To-Do",
        link: "/todo",
        visible: ["school/admin", "school/teacher", "school/student", "school/parent"],
      },
    ],
  },
];
