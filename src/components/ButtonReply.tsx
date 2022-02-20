import { ReactComponent as IconReply } from "assets/images/icon-reply.svg";
import { useState } from "react";

interface ButtonReplyPropsInterface {
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonReply = (props: ButtonReplyPropsInterface) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isCliked, setIsCliked] = useState<boolean>(false);
  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsCliked(true)}
      onMouseUp={() => setIsCliked(false)}
      style={{
        cursor: "pointer",
        opacity: isCliked ? 0.7 : isHover ? 0.4 : 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconReply />
      <p
        style={{
          color: props.color,
          marginLeft: 8,
        }}
        className="font-500"
      >
        Reply
      </p>
    </div>
  );
};

export default ButtonReply;
