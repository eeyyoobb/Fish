
import Image from "next/image";

export const getLogo = (category: string) => {
  switch (category.toLowerCase()) {
    case 'youtube':
      return <Image width="40" height="40" src="https://img.icons8.com/nolan/64/youtube-play.png" alt="youtube-play" />;
    case 'telegram':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=63306&format=png&color=000000" alt="telegram" />;
    case 'instagram':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="instagram" />;
    case 'facebook':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="facebook" />;
    case 'linkedin':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=MR3dZdlA53te&format=png&color=000000" alt="linkedin" />;
    case 'x':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=000000" alt="x" />;
    case 'tiktok':
      return <Image width="40" height="40" src="https://img.icons8.com/?size=100&id=lTkH3THtr7SL&format=png&color=000000" alt="tiktok" />;
    case 'custom':
      return <Image width="40" height="40" src="/brandlogo.png" alt="custom" />;
    default:
      return null;
  }
};






