import { ColorBaseEnum } from "style/Color";

interface BadgePropsInterface {
  label?: string;
  color?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  borderRadius?: number;
  marginLeft?: number;
}

const Badge = (props: BadgePropsInterface) => {
  return (
    <p
      style={{
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        borderRadius: props.borderRadius,
        backgroundColor: props.color,
        marginLeft: props.marginLeft,
        color: ColorBaseEnum.white,
        textTransform: "lowercase",
      }}
      className="font-400"
    >
      You
    </p>
  );
};

export default Badge;
