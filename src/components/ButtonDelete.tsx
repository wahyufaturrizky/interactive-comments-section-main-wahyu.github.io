import { ReactComponent as IconDelete } from "assets/images/icon-delete.svg";
import { useState } from "react";

interface ButtonDeletePropsInterface {
  color?: string;
  onClick?: () => void;
}

const ButtonDelete = (props: ButtonDeletePropsInterface) => {
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
      <IconDelete />
      <p
        style={{
          color: props.color,
          marginLeft: 8,
        }}
        className="font-500"
      >
        Delete
      </p>
    </div>
  );
};

export default ButtonDelete;
