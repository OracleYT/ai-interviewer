// import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
// import clsx from "clsx";

// import Apps from "./icons/Apps";
// import Avatar from "./Avatar";
import Feedback from "./icons/Feedback";
import Help from "./icons/Help";
import IconButton from "./IconButton";
// import PlainButton from "./PlainButton";
// import Videocam from "./icons/Videocam";
import Settings from "./icons/Settings";
import useTime from "../hooks/useTime";
import { useState } from "react";
import AiIcon from "./icons/AiIcon";

interface HeaderProps {
  navItems?: boolean;
}

const Header = ({ navItems = true }: HeaderProps) => {
  // const { isLoaded, isSignedIn, user } = useUser();
  // const { isLoaded } = useUser();
  // const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const { currentDateTime } = useTime();
  // const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <header className="w-full px-4 pt-4 flex items-center justify-between bg-white">
      <div className="w-60 max-w-full">
        <a href="/#" className="flex items-center gap-2 w-full">
          <AiIcon />
          <div className="font-product-sans text-2xl leading-6 text-meet-gray select-none">
            <span className="font-medium">Ai </span>
            <span>Interview</span>
          </div>
        </a>
      </div>
      <div className="flex items-center cursor-default">
        {navItems && (
          <>
            <div className="hidden md:block mr-2 text-lg leading-4.5 text-meet-gray select-none">
              {currentDateTime}
            </div>
            <div className="hidden sm:contents [&>button]:mx-2.5">
              <IconButton title="Support" icon={<Help />} />
              <IconButton title="Report a problem" icon={<Feedback />} />
              <IconButton title="Settings" icon={<Settings />} />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
