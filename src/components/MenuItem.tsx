

import {  Assignment, Attendance,  Class,  Lesson, Result, Subject, } from "./Icons";
import { Creator,Admin,Child, Auditor, } from "@/utils/Icons"
import {House ,BookOpenCheck,CalendarDays,Volleyball } from 'lucide-react'

export const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <House/>,
          label: "Home",
          href: "/income",
          visible: ["admin", "creater", "child", "audit"],
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
          icon: <Lesson/>,
          label: "Approval",
          href: "/income/list/taskApproval",
          visible: ["admin", "creator"],
        },
        {
          icon: <BookOpenCheck/>,
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
          icon: <CalendarDays/>,
          label: "Events",
          href: "/income/list/events",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: <Volleyball/>,
          label: "Pool",
          href: "/game",
          visible: ["admin", "creator", "child", "audit"],
        },
      ],
    },
  ];