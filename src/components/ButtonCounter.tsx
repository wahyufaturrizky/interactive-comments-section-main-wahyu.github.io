import { useState } from "react";
import { ColorBaseEnum } from "style/Color";

interface ButtonCounterPropsInterface {
  color?: string;
  className?: string;
  label?: string;
  marginBottom?: number;
  onClick?: () => void;
}
const ButtonCounter = (props: ButtonCounterPropsInterface) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isCliked, setIsCliked] = useState<boolean>(false);
  return (
    <p
      onClick={props.onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsCliked(true)}
      onMouseUp={() => setIsCliked(false)}
      className={props.className}
      style={{
        color: isHover ? ColorBaseEnum.darkBlue : props.color,
        marginBottom: 8,
        cursor: "pointer",
        opacity: isCliked ? 0.7 : 1,
      }}
    >
      {props.label}
    </p>
  );
};
export default ButtonCounter;
