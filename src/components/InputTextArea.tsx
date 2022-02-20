import { useState } from "react";
import { ColorBaseEnum } from "style/Color";

interface InputTextAreaPropsInterface {
  cols?: number;
  rows?: number;
  padding?: number;
  borderRadius?: number;
  width?: string;
  borderColor?: string;
  name?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  onChange?: (e: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputTextArea = (props: InputTextAreaPropsInterface) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <textarea
      style={{
        width: props.width,
        padding: props.padding,
        borderRadius: props.borderRadius,
        border: isFocus
          ? `2px solid ${ColorBaseEnum.darkBlue}`
          : `2px solid ${props.borderColor}`,
        cursor: "pointer",
      }}
      name={props.name}
      placeholder={props.placeholder}
      cols={props.cols}
      value={props.value}
      rows={props.rows}
      onChange={props.onChange}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    ></textarea>
  );
};

export default InputTextArea;
