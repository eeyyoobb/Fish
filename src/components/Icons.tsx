"use client";

import React, { useState } from 'react';
// import { 
//   PiChalkboardTeacherFill, 
//   PiChalkboardTeacherLight, 
//   PiNewspaperDuotone, 
//   PiNewspaperFill, 
//   PiSortAscending, 
//   PiStudentFill, 
//   PiStudentLight 
// } from 'react-icons/pi';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiParentFill, RiParentLine } from "react-icons/ri";
import { 
  MdAssignmentAdd, 
  MdClass, 
  MdGrade, 
  MdMeetingRoom, 
  MdOutlineAssignment, 
  MdOutlineClass, 
  MdOutlineGrade, 
  MdOutlineMeetingRoom 
} from 'react-icons/md';
import { FaCheckSquare } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { IoCalendarOutline, IoCalendarSharp } from "react-icons/io5";
import { CgMoreVerticalR } from "react-icons/cg";

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

const SchoolLogo: React.FC = () => (
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
  <lord-icon
    src="https://cdn.lordicon.com/vlnvqvew.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '30px', height: '30px' }}
  />
);

export const View: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/lxwurnrr.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '30px', height: '30px' }}
  />
);

export const Plus: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/zrkkrrpl.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '35px', height: '35px' }}
  />
);

export const Avatar: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/bgebyztw.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '50px', height: '50px' }}
  />
);

export const Search: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/wjyqkiew.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '25px', height: '25px' }}
  />
);

export const Announcements: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/mhjhxcxu.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '30px', height: '30px' }}
  />
);

export const Message: React.FC = () => (
  <lord-icon
    src="https://cdn.lordicon.com/motnbmtz.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '35px', height: '35px' }}
  />
);

export const Filter: React.FC = () => (
  <i className="fa-solid fa-filter"></i>
);

export const Sort: React.FC = () => (
  <><i className="fa-solid fa-arrow-up-wide-short"></i> style={iconStyle} </>
);

export const Home: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <AiFillHome onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <AiOutlineHome onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Teacher: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <><i className="fa-solid fa-user-plus"></i> onClick={() => setIsActive(false)} style={iconActiveStyle} </>
      ) : (
        <><i className="fa-solid fa-user-plus"></i> onClick={() => setIsActive(true)} style={iconStyle} </>
      )}
    </>
  );
};

export const Student: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <><i className="fa-solid fa-users-rectangle"></i>l onClick={() => setIsActive(false)} style={iconActiveStyle} </>
      ) : (
        <><i className="fa-solid fa-users-rectangle"></i> onClick={() => setIsActive(true)} style={iconStyle} </>
      )}
    </>
  );
};

export const Parent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <RiParentFill onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <RiParentLine onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Subject: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <MdOutlineClass onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <MdClass onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Class: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <MdMeetingRoom onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <MdOutlineMeetingRoom onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Lesson: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <><i className="fa-solid fa-suitcase"></i> onClick={() => setIsActive(false)} style={iconActiveStyle} </>
      ) : (
        <><i className="fa-solid fa-suitcase"></i> onClick={() => setIsActive(true)} style={iconStyle} </>
      )}
    </>
  );
};

export const Assignment: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <MdAssignmentAdd onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <MdOutlineAssignment onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Result: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <MdGrade onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <MdOutlineGrade onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Attendance: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <FaCheckSquare onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <CiSquareCheck onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const Calendar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      {isActive ? (
        <IoCalendarSharp onClick={() => setIsActive(false)} style={iconActiveStyle} />
      ) : (
        <IoCalendarOutline onClick={() => setIsActive(true)} style={iconStyle} />
      )}
    </>
  );
};

export const More: React.FC = () => (
  <CgMoreVerticalR style={iconStyle} />
);
