import IconButton, { IconButtonProps } from "./IconButton";
import clsx from "clsx";

interface CallControlButtonProps extends Omit<IconButtonProps, "variant"> {}

const CallControlButton = ({
  active,
  alert,
  className,
  icon,
  onClick,
  title,
  disabled,
}: CallControlButtonProps) => {
  return (
    <IconButton
      disabled={disabled}
      variant="secondary"
      active={active}
      alert={alert}
      icon={icon}
      title={title}
      className={clsx("call-control-button", className)}
      onClick={onClick}
    />
  );
};

export default CallControlButton;
