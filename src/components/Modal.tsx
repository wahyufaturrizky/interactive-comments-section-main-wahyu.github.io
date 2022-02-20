import { ColorBaseEnum, ColorBasePrimaryEnum } from "style/Color";

import "style/Modal.css";
import Button from "./Button";

interface ModalPropsInterface {
  headerTitle?: string;
  content?: string;
  padding?: number;
  txtButtonPrimary?: string;
  txtButtonSecondary?: string;
  backgroundColor?: string;
  widthModal?: number;
  isVisible?: boolean;
  onClickButtonSecondary?: () => void;
  onClickButtonPrimary?: () => void;
}

const Modal = (props: ModalPropsInterface) => {
  return (
    <>
      {props.isVisible && (
        <div className="container-modal">
          <div className="container-content-modal">
            <p
              className="font-700"
              style={{ color: ColorBaseEnum.grayishBlue, marginBottom: 16 }}
            >
              {props.headerTitle}
            </p>
            <p
              className="font-400"
              style={{ color: ColorBaseEnum.grayishBlue, marginBottom: 24 }}
            >
              {props.content}
            </p>
            <div style={{ display: "flex" }}>
              <Button
                type="button"
                label="NO, CANCEL"
                borderRadius={8}
                onClick={props.onClickButtonSecondary}
                color={ColorBaseEnum.white}
                backgroundColor={ColorBaseEnum.grayishBlue}
                borderColor={ColorBaseEnum.grayishBlue}
                paddingBottom={16}
                paddingLeft={16}
                paddingRight={16}
                paddingTop={16}
                fullWidth
                marginRight={8}
              />
              <Button
                onClick={props.onClickButtonPrimary}
                type="button"
                label="YES, DELETE"
                borderRadius={8}
                color={ColorBaseEnum.white}
                backgroundColor={ColorBasePrimaryEnum.softRed}
                borderColor={ColorBasePrimaryEnum.softRed}
                paddingBottom={16}
                paddingLeft={16}
                paddingRight={16}
                paddingTop={16}
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
