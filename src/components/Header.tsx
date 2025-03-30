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
// import AiIcon from "./icons/AiIcon";
import { Avatar } from "stream-chat-react";

interface HeaderProps {
  navItems?: boolean;
  user?: any;
}

const Header = ({ navItems = true, user }: HeaderProps) => {
  const { currentDateTime } = useTime();
  const onLogoClick = () => {
    document.location.href = "/";
  };

  return (
    <header className="w-full px-4 flex items-center justify-between bg-white select-none">
      <div className="w-60 max-w-full" onClick={onLogoClick}>
        <div className="flex items-center gap-2 w-full">
          <img
            src="/assets/ulster-university.svg"
            alt="logo"
            className="w-20 h-20"
          />
          <div className="font-product-sans text-2xl leading-6 text-meet-gray">
            <span className="font-medium">CAS </span>
            <span>Interview</span>
          </div>
        </div>
      </div>
      <div className="flex items-center cursor-default">
        {navItems && (
          <>
            <div className="hidden md:block mr-2 text-lg leading-4.5 text-meet-gray">
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
      {user && (
        <div className="flex items-end gap-2 select-none">
          <div className="text-end">
            <div className="text-sm">{user?.name}</div>
            <div className="text-xs">{user?.email}</div>
          </div>
          <div 
          className="bg-black rounded-full text-white"
          >
            <Avatar
              // image="/assets/profile-picture.png"
              name={user?.name}
              size={40}
              user={user}
              shape="circle"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
