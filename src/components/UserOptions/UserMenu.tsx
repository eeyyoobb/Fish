"use client";

import { signOut } from "next-auth/react";
import MenuItem from "./MenuItem";

import { UsersIcon, YoutubeIcon, SignOut } from "@/components/Icons";
// import { useContext } from "react";
// import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
// import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onClose }) => {
  // const createChannelModal = useContext(CreateChannelModalContext);

  // const currentChannel = useContext(CurrentChannelContext);

  const router = useRouter();
  
  return (
    <>
      <div className="h-screen w-screen fixed z-30 " onClick={onClose} />
      <div className="absolute rounded-md shadow-md w-72 bg-zinc-800 right-2 top-16 text-sm flex flex-col overflow-hidden z-40">
        <MenuItem
          logo={<UsersIcon />}
          label="Your channel"
          onClick={() => {
            // if (!currentChannel) {
            //   createChannelModal?.onOpen();
            // } else {
            //   router.push(`/channel/${currentChannel.id}`);
            // }

            // onClose();
          }}
        />
        <MenuItem
          logo={<YoutubeIcon />}
          label="YouTube Studio"
          onClick={() => {
            // if (!currentChannel) {
            //   createChannelModal?.onOpen();
            // } else {
            //   router.push(`/studio`);
            // }

            onClose();
          }}
        />
        <MenuItem
          logo={<SignOut/>}
          label="Sign out"
          onClick={() => {
            signOut();
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default UserMenu;
