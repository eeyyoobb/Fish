

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
          href: "/income/list/teachers",
          visible: ["admin", "creater"],
        },
       
        {
          icon: Child,
          label: "childs",
          href: "/income/list/students",
          visible: ["admin", "creater"],
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
          href: "/income/list/subjects",
          visible: ["admin"],
        },
        {
          icon: <Class/>,
          label: "Classes",
          href: "/income/list/classes",
          visible: ["admin", "creater"],
        },
        {
          icon: <Lesson/>,
          label: "Lessons",
          href: "/income/list/lessons",
          visible: ["admin", "creater"],
        },
        {
          icon: <Exam/>,
          label: "Exams",
          href: "/income/list/exams",
          visible: ["admin", "creater", "child", "audit"],
        },
        {
          icon: <Assignment/>,
          label: "Assignments",
          href: "/income/list/assignments",
          visible: ["admin", "creater", "child", "audit"],
        },
        {
          icon: <Result/>,
          label: "Results",
          href: "/income/list/results",
          visible: ["admin", "creater", "child", "audit"],
        },
        {
          icon: <Attendance/>,
          label: "Attendance",
          href: "/income/list/attendance",
          visible: ["admin", "creater", "child", "audit"],
        },
        {
          icon: <Calendar/>,
          label: "Events",
          href: "/income/list/events",
          visible: ["admin", "creater", "child", "audit"],
        },
      ],
    },
  ];