

import {  Attendance,People,WalletIcon } from "./Icons";
import { Creator,Child, Auditor, } from "@/utils/Icons"
import {House ,CalendarDays,Volleyball,Shapes,LayoutList,Signature ,ChartNoAxesCombined} from 'lucide-react'

export const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <House/>,
          label: "Home",
          href: "/income",
          visible: ["admin", "creator", "child", "audit"],
        },
        {
          icon: Creator,
          label: "Creator",
          href: "/income/list/Creator",
          visible: ["admin", "auditor"],
        },
       
        {
          icon: Child,
          label: "Children",
          href: "/income/list/children",
          visible: ["admin", "parent","creator"],
        },
        {
          icon: Auditor,
          label: "Audit",
          href: "/income/list/parents",
          visible: ["admin", "auditor"],
        },
        {
          icon: <Shapes/>,
          label: "Category",
          href: "/income/list/catagories",
          visible: ["admin"],
        },
        {
          icon: <People/>,
          label: "My Tribes",
          href: "/income/list/tribes",
          visible: ["admin", "auditer"],
        },
        {
          icon: <LayoutList/>,
          label: "My Tasks",
          href: "/income/list/tasks",
          visible: ["admin", "creator", "parent"],
        },
        {
          icon: <Signature/>,
          label: "Approval",
          href: "/income/list/taskApproval",
          visible: ["admin", "creator","parent","auditor"],
        },
        {
          icon: <WalletIcon />,
          label: "Account",
          href: "/income/account",
          visible: ["admin", "creator","child","parent"],
        },
        // {
        //   icon: <BookOpenCheck/>,
        //   label: "Exams",
        //   href: "/income/list/exams",
        //   visible: ["admin", "creator", "child", "audit"],
        // },
        // {
        //   icon: <Assignment/>,
        //   label: "Assignments",
        //   href: "/income/list/assignments",
        //   visible: ["admin", "creator", "child", "audit"],
        // },
        {
          icon: <ChartNoAxesCombined/>,
          label: "Performance",
          href: "/income/list/results",
          visible: ["admin", "creator","parent","child"],
        },
        {
          icon: <Attendance/>,
          label: "Attendance",
          href: "/income/list/attendance",
          visible: ["admin", "creator", "child", "audit","parent"],
        },
        // {
        //   icon: <CalendarDays/>,
        //   label: "Events",
        //   href: "/income/list/events",
        //   visible: ["admin", "creator","audit","parent"],
        // },
        {
          icon: <Volleyball/>,
          label: "Game",
          href: "/",
          visible: ["admin", "creator", "child", "audit","parent"],
        },
      ],
    },
  ];