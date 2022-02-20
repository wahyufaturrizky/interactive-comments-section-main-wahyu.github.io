import { useState } from "react";

type ButtonType = "button" | "submit" | "reset";

interface ButtonPropsInterface {
  label?: string;
  borderRadius?: number;
  fullWidth?: boolean;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  marginTop?: number;
  marginRight?: number;
  paddingTop?: number;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  type?: ButtonType;
  onClick?: () => void;
}
const Button = (props: ButtonPropsInterface) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isCliked, setIsCliked] = useState<boolean>(false);
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsCliked(true)}
      onMouseUp={() => setIsCliked(false)}
      style={{
        width: props.fullWidth ? "100%" : undefined,
        marginRight: props.marginRight,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        color: props.color,
        border: `1px solid ${props.borderColor}`,
        cursor: "pointer",
        opacity: isCliked ? 0.7 : isHover ? 0.5 : 1,
      }}
    >
      {props.label}
    </button>
  );
};

export default Button;
