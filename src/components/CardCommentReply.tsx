import { CommentListInterface, ReplieInterface } from "interface/Comment";
import moment from "moment";
import { ColorBaseEnum, ColorBasePrimaryEnum } from "style/Color";
import Badge from "./Badge";
import ButtonCounter from "./ButtonCounter";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import ButtonReply from "./ButtonReply";

import "style/CardCommentReply.css";
import Button from "./Button";
import InputTextArea from "./InputTextArea";
import { TypeScore } from "./CardComment";

const CardCommentReply = (props: {
  data: ReplieInterface;
  editUserCommentReply?: ReplieInterface;
  contentCommentUserReply?: string;
  handleEditUserCommentReply: (e: any) => void;
  isShowUpdateCommentUserReply?: boolean;
  geteditUserCommentReply: (data: ReplieInterface) => void;
  updateScoreCommentReply: (data: ReplieInterface, type: TypeScore) => void;
  handleUpdateUserCommentReply: (
    data: ReplieInterface,
    content: string
  ) => void;
  handleAskForDeleteCommentReply: (data: ReplieInterface) => void;
}) => {
  return (
    <div>
      <div className="container-card-comment">
        <div className="container-score">
          <ButtonCounter
            label="+"
            onClick={() =>
              props.updateScoreCommentReply(props.data, "increase")
            }
            className="font-700"
            color={ColorBaseEnum.grayishBlue}
          />
          <p
            style={{
              color: ColorBasePrimaryEnum.moderateBlue,
              marginBottom: 8,
            }}
            className="font-500"
          >
            {props.data.score}
          </p>
          <ButtonCounter
            label="-"
            onClick={() =>
              (props.data.score || 0) > 1
                ? props.updateScoreCommentReply(props.data, "decrease")
                : undefined
            }
            className="font-700"
            color={ColorBaseEnum.grayishBlue}
          />
        </div>
        <div className="container-content">
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={require(`../${props.data.user.image.webp}`)}
                width={24}
                height={24}
                alt="avatar"
              />
              <p
                style={{ marginLeft: 16, color: ColorBaseEnum.darkBlue }}
                className="font-700"
              >
                {props.data.user.username}
              </p>
              {props.data.user.username === "wahyu fatur rizki" && (
                <Badge
                  label="you"
                  paddingTop={2}
                  paddingBottom={2}
                  paddingLeft={8}
                  paddingRight={8}
                  borderRadius={4}
                  marginLeft={8}
                  color={ColorBasePrimaryEnum.moderateBlue}
                />
              )}
              <p
                style={{ marginLeft: 16, color: ColorBaseEnum.grayishBlue }}
                className="font-400"
              >
                {moment(props.data.createdAt).fromNow()}
              </p>
            </div>
            {props.data.user.username === "wahyu fatur rizki" ? (
              <div className="container-delete-edit">
                <ButtonDelete
                  onClick={() =>
                    props.handleAskForDeleteCommentReply(props.data)
                  }
                  color={ColorBasePrimaryEnum.softRed}
                />
                <ButtonEdit
                  onClick={() => props.geteditUserCommentReply(props.data)}
                  marginLeft={16}
                  color={ColorBasePrimaryEnum.moderateBlue}
                />
              </div>
            ) : (
              <div className="container-button-reply">
                <ButtonReply color={ColorBasePrimaryEnum.moderateBlue} />
              </div>
            )}
          </div>
          {props.data.id === props.editUserCommentReply?.id &&
          props.isShowUpdateCommentUserReply ? (
            <div style={{ marginTop: 16, marginLeft: 16 }}>
              <InputTextArea
                name="content"
                placeholder="Add comment..."
                width="98%"
                value={props.contentCommentUserReply}
                onChange={(e) => props.handleEditUserCommentReply(e)}
                cols={80}
                rows={2}
                borderRadius={8}
                padding={16}
                borderColor={ColorBaseEnum.LightGray}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 16,
                }}
              >
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
                  onClick={() => {
                    props.handleUpdateUserCommentReply(
                      props.data,
                      props.contentCommentUserReply || ""
                    );
                  }}
                  label={"UPDATE"}
                />
              </div>
            </div>
          ) : (
            <div>
              <p
                style={{
                  color: ColorBaseEnum.grayishBlue,
                  marginTop: 16,
                }}
                className="font-400"
              >
                <span
                  style={{ color: ColorBasePrimaryEnum.moderateBlue }}
                  className="font-500"
                >
                  @{props.data.replyingTo}
                </span>{" "}
                {props.data.content.replace(`@${props.data.replyingTo}, `, "")}
              </p>

              <div className="is-mobile-input-score-and-edit-delete">
                <div className="container-score-on-mobile">
                  <ButtonCounter
                    label="+"
                    onClick={() =>
                      props.updateScoreCommentReply(props.data, "increase")
                    }
                    className="font-700"
                    color={ColorBaseEnum.grayishBlue}
                  />
                  <p
                    style={{
                      color: ColorBasePrimaryEnum.moderateBlue,
                    }}
                    className="font-500"
                  >
                    {props.data.score}
                  </p>
                  <ButtonCounter
                    label="-"
                    onClick={() =>
                      (props.data.score || 0) > 1
                        ? props.updateScoreCommentReply(props.data, "decrease")
                        : undefined
                    }
                    className="font-700"
                    color={ColorBaseEnum.grayishBlue}
                  />
                </div>

                {props.data.user?.username === "wahyu fatur rizki" ? (
                  <div className="container-delete-edit-on-mobile">
                    <ButtonDelete
                      onClick={() =>
                        props.handleAskForDeleteCommentReply(props.data)
                      }
                      color={ColorBasePrimaryEnum.softRed}
                    />
                    <ButtonEdit
                      marginLeft={16}
                      color={ColorBasePrimaryEnum.moderateBlue}
                      onClick={() => props.geteditUserCommentReply(props.data)}
                    />
                  </div>
                ) : (
                  <ButtonReply color={ColorBasePrimaryEnum.moderateBlue} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCommentReply;
