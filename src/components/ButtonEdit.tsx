import { ReactComponent as IconEdit } from "assets/images/icon-edit.svg";
import { useState } from "react";

interface ButtonEditPropsInterface {
  color?: string;
  marginLeft?: number;
  onClick?: () => void;
}

const ButtonEdit = (props: ButtonEditPropsInterface) => {
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
        marginLeft: props.marginLeft,
      }}
    >
      <IconEdit />
      <p
        style={{
          color: props.color,
          marginLeft: 8,
        }}
        className="font-500"
      >
        Edit
      </p>
    </div>
  );
};

export default ButtonEdit;
