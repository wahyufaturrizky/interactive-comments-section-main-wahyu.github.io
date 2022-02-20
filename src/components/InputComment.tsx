/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateReqBodyCommentInterface } from "interface/Comment";
import { UserInterface } from "interface/User";
import { ColorBaseEnum, ColorBasePrimaryEnum } from "style/Color";
import "style/InputComment.css";
import Button from "./Button";
import InputTextArea from "./InputTextArea";

interface InputCommentInterface {
  data?: UserInterface;
  buttonLabel?: string;
  onClick?: () => void;
  onChange?: (e: any) => void;
  stateReqBodyComment?: StateReqBodyCommentInterface;
}

const InputComment = (props: InputCommentInterface) => {
  return (
    <div>
      <div className="container-input-component">
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div className="container-avatar">
            {props.data?.image.webp && (
              <img
                width={30}
                height={30}
                src={require(`../${props.data?.image.webp}`)}
                alt="user-avatar"
              />
            )}
          </div>
          <div className="container-input-comment">
            <InputTextArea
              name="content"
              placeholder="Add comment..."
              width="100%"
              value={props.stateReqBodyComment?.content || ""}
              onChange={props.onChange}
              cols={80}
              rows={2}
              borderRadius={8}
              padding={16}
              borderColor={ColorBaseEnum.LightGray}
            />
          </div>
          <div className="container-send-button">
            <Button
              type="button"
              borderRadius={8}
              paddingLeft={16}
              paddingRight={16}
              paddingBottom={8}
              color={ColorBaseEnum.white}
              paddingTop={8}
              borderColor={ColorBasePrimaryEnum.moderateBlue}
              backgroundColor={ColorBasePrimaryEnum.moderateBlue}
              onClick={props.onClick}
              label={props.buttonLabel}
            />
          </div>
        </div>
        <div className="is-mobile-input-component">
          {props.data?.image.webp && (
            <img
              width={30}
              height={30}
              src={require(`../${props.data?.image.webp}`)}
              alt="user-avatar"
            />
          )}

          <Button
            type="button"
            borderRadius={8}
            paddingLeft={16}
            paddingRight={16}
            paddingBottom={8}
            color={ColorBaseEnum.white}
            paddingTop={8}
            borderColor={ColorBasePrimaryEnum.moderateBlue}
            backgroundColor={ColorBasePrimaryEnum.moderateBlue}
            onClick={props.onClick}
            label={props.buttonLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default InputComment;
