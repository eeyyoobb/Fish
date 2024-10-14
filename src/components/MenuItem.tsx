

import {  Assignment, Attendance, Calendar, Class, Exam, Home, Lesson,  Audit, Result, Subject, } from "./Icons";
import { Creator,Admin,Child, Auditor, } from "@/utils/Icons"

export const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <Home/>,
          label: "Home",
          href: "/income",
          visible: ["admin", "creater", "child", "audit"],
        },
        {
          icon: Admin,
          label: "admin",
          href: "/admin",
          visible: ["admin", "creater"],
        },
        {
          icon: Creator,
          label: "creators",
          href: "/income/list/creator",
          visible: ["admin", "creator"],
        },
       
        {
          icon: Child,
          label: "childs",
          href: "/income/list/children",
          visible: ["admin", "creator"],
        },
        {
          icon: Auditor,
          label: "audits",
          href: "/income/list/parents",
          visible: ["admin", "creater"],
        },
        {
          icon: <Subject/>,
          label: "Subjects",
          href: "/income/list/catagories",
          visible: ["admin"],
        },
        {
          icon: <Class/>,
          label: "Classes",
          href: "/income/list/tribes",
          visible: ["admin", "creator"],
        },
        {
          icon: <Lesson/>,
          label: "Lessons",
          href: "/income/list/tasks",
          visible: ["admin", "creator"],
        },
        {
          icon: <Exam/>,
          label: "Exams",
          href: "/income/list/exams",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: <Assignment/>,
          label: "Assignments",
          href: "/income/list/assignments",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: <Result/>,
          label: "Results",
          href: "/income/list/results",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: <Attendance/>,
          label: "Attendance",
          href: "/income/list/attendance",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: <Calendar/>,
          label: "Events",
          href: "/income/list/events",
          visible: ["admin", "creator", "child", "audit"],
        },
      ],
    },
  ];