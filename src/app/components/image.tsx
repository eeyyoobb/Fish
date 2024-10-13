import Image from "next/image";
import { Avatar } from "./Icons";

interface AvatarImgProps {
  src: string; // Define a prop for the image source
}

export const logos ="/logos.gif"
export const avatar ="/avatar.png"
export const logo ="/logos.gif"

export const AvatarImg: React.FC<AvatarImgProps> = ({ src }) => {
  return (
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover items-center"
/>
  )};

           
