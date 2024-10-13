"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import "react-calendar/dist/Calendar.css";
import { useTheme } from "next-themes";
import { Event } from '@prisma/client';

type ValuePiece = Date | null;
type EventCalenar = any

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (date instanceof Date) {
      router.push(`?date=${date}`);
    }
  }, [date, router]);

  return <Calendar mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border" />;
};

export default EventCalendar;
