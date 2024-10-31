"use client"

import React, { useState } from 'react';
import { FiFilter } from "react-icons/fi";
import { PiChalkboardTeacherFill, PiChalkboardTeacherLight, PiNewspaperDuotone, PiNewspaperFill, PiSortAscending, PiStudentFill ,PiStudentLight} from 'react-icons/pi';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiParentFill, RiParentLine ,} from "react-icons/ri";
import { MdAssignmentAdd, MdClass, MdGrade, MdMeetingRoom, MdOutlineAssignment, MdOutlineClass, MdOutlineGrade, MdOutlineMeetingRoom } from 'react-icons/md';
import { FaCheckSquare, FaRegCalendarAlt } from "react-icons/fa";
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

export const SchoolLogo: React.FC = () => {
  return (
    
    <div>
      <h1>School</h1>
      <lord-icon
        src="https://cdn.lordicon.com/bhmovrlt.json"
        trigger="in"
        delay="2000" // delay should be a string
        style={{ width: '50px', height: '50px' }} // Correct style object
        
      ></lord-icon>
    </div>
  );
};

export const Delete: React.FC = () => {
  return (
    <div>
     <lord-icon
    src="https://cdn.lordicon.com/vlnvqvew.json"
    trigger="hover"
    colors="primary:#e8b730,secondary:#915110"
    style={{ width: '30px', height: '30px' }}>
   </lord-icon>  
    </div>
  );
};


export const View: React.FC = () => {
  return (
    <div>
    <lord-icon
        src="https://cdn.lordicon.com/lxwurnrr.json"
        trigger="hover"
        colors="primary:#e8b730,secondary:#915110"
        style={{ width: '30px', height: '30px' }}
    ></lord-icon>
    </div>
  );
};

export const Plus: React.FC = () => {
  return (
    <div>
      <lord-icon
        src="https://cdn.lordicon.com/zrkkrrpl.json"
        trigger="hover"
        colors="primary:#e8b730,secondary:#915110"
        style={{ width: '35px', height: '35px' }}>
      </lord-icon>
    </div>
  );
};

export const Avatar: React.FC = () => {
  return (
    <div>
      <lord-icon
          src="https://cdn.lordicon.com/bgebyztw.json"
          trigger="hover"
          colors="primary:#e8b730,secondary:#915110"
          style={{ width: '50px', height: '50px' }}>
      </lord-icon>
      </div>
  );
};

export const Search: React.FC = () => {
  return (
    <div>
     <lord-icon
        src="https://cdn.lordicon.com/wjyqkiew.json"
        trigger="hover"
        colors="primary:#e8b730,secondary:#915110"
        style={{ width: '25px', height: '25px' }}>
     </lord-icon>
    </div>
  );
};
export const Announcements: React.FC = () => {
  return (
    <div>
      <lord-icon
        src="https://cdn.lordicon.com/mhjhxcxu.json"
        trigger="hover"
        colors="primary:#e8b730,secondary:#915110"
        style={{  width: '30px', height: '30px' }}>
      </lord-icon>
      </div>
  );
};
export const Message: React.FC = () => {
  return (
    <div>
        <lord-icon
            src="https://cdn.lordicon.com/motnbmtz.json"
            trigger="hover"
            colors="primary:#e8b730,secondary:#915110"
            style={{  width: '35px', height: '35px'  }}>
        </lord-icon>
      </div>
  );
};

export const Filter: React.FC = () => {
  return ( 
    <>
      <FiFilter 
      style={{ width: '25px', height: '25px' }}/>
      </>
  )};

  export const Sort: React.FC = () => {
    return ( 
      <>
        <PiSortAscending 
         style={{ width: '25px', height: '25px' }}
        />
      </>
    )};

    export const Home: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <AiFillHome onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <AiOutlineHome onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };

     export const Teacher: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <PiChalkboardTeacherFill onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <PiChalkboardTeacherLight onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Student: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <PiStudentFill onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <PiStudentLight onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };

     export const Parent: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <RiParentFill onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <RiParentLine onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Subject: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <MdOutlineClass onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <MdClass onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };

     export const Class: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <MdMeetingRoom onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <MdOutlineMeetingRoom onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Lesson: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <PiNewspaperFill  onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <PiNewspaperDuotone onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     
     export const Assignment: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <MdAssignmentAdd  onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <MdOutlineAssignment onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Result: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <MdGrade onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <MdOutlineGrade onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Attendance: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <FaCheckSquare onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <CiSquareCheck onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Calendar: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <IoCalendarSharp onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <IoCalendarOutline onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };
     export const Exam: React.FC = () => {
      const [isActive, setIsActive] = useState(false);
      return ( 
        <>
          {isActive ? (
             <PiChalkboardTeacherFill onClick={() => setIsActive(false)} 
              style={{ width: '25px', height: '25px' ,color: "orange" }} /> 
              ) : (
            <PiChalkboardTeacherLight onClick={() => setIsActive(true)} 
             style={{ width: '20px', height: '20px' }}
             />  
         )}
      </>
      );
     };

     export const More: React.FC = () => {
     
      return (<CgMoreVerticalR />)}

     // components/Icons.tsx
export const ChildIcon = () => (
  <i className="fa-solid fa-children text-xs" />
);

export const ParentIcon = () => (
  <i className="fa-solid fa-user-tie text-xs" />
);

export const WalletIcon = () => (
  <i className="fa-solid fa-wallet text-xs" />
);

export const Man = () => (
<i className="fa-solid fa-person"></i>
);

export const Woman = () => (
<i className="fa-solid fa-person-dress"></i>
);

export const Close = () => (
  <i className="fa-solid  fa-circle-xmark"></i>
  );

  





