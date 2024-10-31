import React, { useState } from 'react';
import {
  Home,
  HomeIcon,
  Users,
  UserPlus,
  UsersRound,
  BookOpen,
  School,
  Briefcase,
  ClipboardList,
  GraduationCap,
  CheckSquare,
  Calendar,
  MoreVertical,
  Trash2,
  Eye,
  Plus,
  User,
  Send,
  Phone,
  Search,
  Bell,
  MessageSquare,
  SlidersHorizontal,
  ArrowDownNarrowWide
} from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": any;
    }
  }
}

// Reusable styles
const iconStyle = { width: '25px', height: '25px' };
const iconActiveStyle = { ...iconStyle, color: "orange" };

export const SchoolLogo: React.FC = () => (
  <div>
    <h1>School</h1>
    <lord-icon
      src="https://cdn.lordicon.com/bhmovrlt.json"
      trigger="in"
      delay="2000"
      style={{ width: '50px', height: '50px' }}
    ></lord-icon>
  </div>
);

export const Delete: React.FC = () => (
  <Trash2 className="w-6 h-6 text-orange-500 hover:text-orange-600" />
);

export const View: React.FC = () => (
  <Eye className="w-6 h-6 text-orange-500 hover:text-orange-600" />
);

export const PlusIcon: React.FC = () => (
  <Plus className="w-7 h-7 text-orange-500 hover:text-orange-600" />
);

export const Avatar: React.FC = () => (
  <User className="w-10 h-10 text-orange-500 hover:text-orange-600" />
);

export const SearchIcon: React.FC = () => (
  <Search className="w-5 h-5 text-orange-500 hover:text-orange-600" />
);

export const Announcements: React.FC = () => (
  <Bell className="w-6 h-6 text-orange-500 hover:text-orange-600" />
);

export const Message: React.FC = () => (
  <MessageSquare className="w-7 h-7 text-orange-500 hover:text-orange-600" />
);

export const Filter: React.FC = () => (
  <SlidersHorizontal className="w-5 h-5" />
);

export const Sort: React.FC = () => (
  <ArrowDownNarrowWide className="w-5 h-5" />
);

export const HomeNav: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Home onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <HomeIcon onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Teacher: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <UserPlus onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <UserPlus onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Student: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Users onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <Users onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Parent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <UsersRound onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <UsersRound onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Subject: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <BookOpen onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <BookOpen onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Class: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <School onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <School onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Lesson: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Briefcase onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <Briefcase onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Assignment: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <ClipboardList onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <ClipboardList onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Result: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <GraduationCap onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <GraduationCap onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Attendance: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <CheckSquare onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <CheckSquare onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const CalendarIcon: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Calendar onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <Calendar onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const PhoneIcon: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Phone onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <Phone onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const Mail: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return isActive ? (
    <Send onClick={() => setIsActive(false)} style={iconActiveStyle} />
  ) : (
    <Send onClick={() => setIsActive(true)} style={iconStyle} />
  );
};

export const More: React.FC = () => (
  <MoreVertical style={iconStyle} />
);