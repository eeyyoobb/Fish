"use client";

import { useContext, useState } from "react";
import SignInButton from "./SignInButton";
// import { CurrentUserContext } from "@/context/CurrentUserContext";
// import IconButton from "@/Common/IconButton";
import { Video } from 'lucide-react';
// import Avatar, { AvatarSize } from "@/Common/Avatar";
import UserMenu from "./UserMenu";
// import { CurrentChannelContext } from "@/context/CurrentChannelContext";
// import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { useRouter } from "next/navigation";
import  {ModeToggle}  from "@/components/theme";

const UserOptions = () => {
  // const currentUser = useContext(CurrentUserContext);
  // const currentChannel = useContext(CurrentChannelContext);

  // const createChannelModal = useContext(CreateChannelModalContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const handleUploadClick = () => {
    // if (!currentChannel) createChannelModal?.onOpen();
    // else router.push("/studio/upload");
  };

  return  
  //currentUser ? 
  (
    <>
      <div className="flex items-center gap-4 mr-4">
         {/* <IconButton onClick={handleUploadClick} */}
         {/* > */}
          <Video /*className="h-7 w-7" *//>
          
        {/* </IconButton>  */}
        <ModeToggle/>
         {/* <Avatar
          size={AvatarSize.small}
          imageSrc={currentUser.image}
          onClick={() => setMenuOpen(true)}
        />  */}
      
      </div>
     {menuOpen ? <UserMenu onClose={() => setMenuOpen(false)} /> : null}
    </>
  // ) : (
  //   <SignInButton />
  );
};

export default UserOptions;
