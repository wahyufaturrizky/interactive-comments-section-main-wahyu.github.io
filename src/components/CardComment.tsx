import {
  CommentListInterface,
  ReplieInterface,
  StateReqBodyCommentInterface,
} from "interface/Comment";
import { UserInterface } from "interface/User";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import "style/CardComment.css";
import { ColorBaseEnum, ColorBasePrimaryEnum } from "style/Color";
import Badge from "./Badge";
import Button from "./Button";
import ButtonCounter from "./ButtonCounter";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import ButtonReply from "./ButtonReply";
import CardCommentReply from "./CardCommentReply";
import InputCommentReply from "./InputCommentReply";
import InputTextArea from "./InputTextArea";

export type TypeScore = "increase" | "decrease";

const CardComment = (props: {
  data: CommentListInterface;
  dataUser?: UserInterface;
  stateReqBodyCommentReply: StateReqBodyCommentInterface;
  handleEditUserCommentReply: (e: any) => void;
  isShowUpdateCommentUser: boolean;
  editUserCommentReply?: ReplieInterface;
  updateScoreCommentReply: (data: ReplieInterface, type: TypeScore) => void;
  contentCommentUserReply?: string;
  isShowUpdateCommentUserReply?: boolean;
  handleReplyComment?: (e: any) => void;
  handleUpdateUserCommentReply: (
    data: ReplieInterface,
    content: string
  ) => void;
  handleSubmitCommentReply: (
    dataUpdateCommentReply: CommentListInterface,
    content: string
  ) => Promise<void>;
  isShowReply: boolean;
  setIsShowReply: Dispatch<SetStateAction<boolean>>;
  setIsShowUpdateCommentUser: Dispatch<SetStateAction<boolean>>;
  dataComment: CommentListInterface | undefined;
  editUserComment: CommentListInterface | undefined;
  handleEditUserComment: (e: any) => void;
  geteditUserCommentReply: (data: ReplieInterface) => void;
  contentCommentUser: string;
  setcontentCommentUser: Dispatch<SetStateAction<string>>;
  setEditUserComment: Dispatch<
    SetStateAction<CommentListInterface | undefined>
  >;
  setDataComment: Dispatch<SetStateAction<CommentListInterface | undefined>>;
  handleUpdateUserComment: (
    data: CommentListInterface,
    content: string
  ) => void;
  handleIncreaseScore: (data: CommentListInterface, type: TypeScore) => void;
  handleDecreaseScore: (data: CommentListInterface, type: TypeScore) => void;
  handleAskForDeleteComment: (data: CommentListInterface) => void;
  handleAskForDeleteCommentReply: (data: ReplieInterface) => void;
  setStateReqBodyCommentReply: Dispatch<
    SetStateAction<StateReqBodyCommentInterface>
  >;
}) => {
  return (
    <div>
      <div className="container-card-comment">
        <div className="container-score">
          <ButtonCounter
            label="+"
            onClick={() => props.handleIncreaseScore(props.data, "increase")}
            className="font-700"
            marginBottom={8}
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
                ? props.handleDecreaseScore(props.data, "decrease")
                : undefined
            }
            className="font-700"
            marginBottom={8}
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
                src={require(`../${props.data.user?.image.webp}`)}
                width={24}
                height={24}
                alt="avatar"
              />
              <p
                style={{ marginLeft: 16, color: ColorBaseEnum.darkBlue }}
                className="font-700"
              >
                {props.data.user?.username}
              </p>
              {props.data.user?.username === "wahyu fatur rizki" && (
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
            {props.data.user?.username === "wahyu fatur rizki" ? (
              <div className="container-delete-edit">
                <ButtonDelete
                  onClick={() => props.handleAskForDeleteComment(props.data)}
                  color={ColorBasePrimaryEnum.softRed}
                />
                <ButtonEdit
                  marginLeft={16}
                  color={ColorBasePrimaryEnum.moderateBlue}
                  onClick={() => {
                    props.setEditUserComment(props.data);
                    props.setcontentCommentUser(props.data.content || "");
                    props.setIsShowUpdateCommentUser(
                      !props.isShowUpdateCommentUser
                    );
                  }}
                />
              </div>
            ) : (
              <div className="container-button-reply">
                <ButtonReply
                  onClick={() => {
                    props.setStateReqBodyCommentReply({
                      ...props.stateReqBodyCommentReply,
                      content: `@${props.data.user?.username}, `,
                    });
                    props.setDataComment(props.data);
                  }}
                  color={ColorBasePrimaryEnum.moderateBlue}
                />
              </div>
            )}
          </div>
          {props.data.id === props.editUserComment?.id &&
          props.isShowUpdateCommentUser ? (
            <div style={{ marginTop: 16, marginLeft: 16 }}>
              <InputTextArea
                name="content"
                placeholder="Add comment..."
                width="98%"
                value={props.contentCommentUser}
                onChange={(e) => props.handleEditUserComment(e)}
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
                    props.handleUpdateUserComment(
                      props.data,
                      props.contentCommentUser
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
                {props.data.content}
              </p>

              <div className="is-mobile-input-score-and-edit-delete">
                <div className="container-score-on-mobile">
                  <ButtonCounter
                    label="+"
                    onClick={() =>
                      props.handleIncreaseScore(props.data, "increase")
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
                      props.handleDecreaseScore(props.data, "decrease")
                    }
                    className="font-700"
                    color={ColorBaseEnum.grayishBlue}
                  />
                </div>

                {props.data.user?.username === "wahyu fatur rizki" ? (
                  <div className="container-delete-edit-on-mobile">
                    <ButtonDelete
                      onClick={() =>
                        props.handleAskForDeleteComment(props.data)
                      }
                      color={ColorBasePrimaryEnum.softRed}
                    />
                    <ButtonEdit
                      marginLeft={16}
                      color={ColorBasePrimaryEnum.moderateBlue}
                      onClick={() => {
                        props.setEditUserComment(props.data);
                        props.setcontentCommentUser(props.data.content || "");
                        props.setIsShowUpdateCommentUser(
                          !props.isShowUpdateCommentUser
                        );
                      }}
                    />
                  </div>
                ) : (
                  <ButtonReply
                    onClick={() => {
                      props.setDataComment(props.data);
                      props.setIsShowReply(!props.isShowReply);
                    }}
                    color={ColorBasePrimaryEnum.moderateBlue}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {props.data.id === props.dataComment?.id && (
        <div style={{ marginTop: 16 }}>
          <InputCommentReply
            onClick={() => {
              props.setDataComment({ ...props.dataComment, id: null });
              props.handleSubmitCommentReply(
                props.data,
                props.stateReqBodyCommentReply.content || ""
              );
            }}
            data={props.dataUser}
            onChange={props.handleReplyComment}
            buttonLabel="REPLY"
            stateReqBodyCommentReply={props.stateReqBodyCommentReply}
          />
        </div>
      )}
      <div className="container-comment-reply">
        {props.data.replies?.map((data, index) => (
          <CardCommentReply
            geteditUserCommentReply={props.geteditUserCommentReply}
            handleAskForDeleteCommentReply={
              props.handleAskForDeleteCommentReply
            }
            key={index}
            data={data}
            editUserCommentReply={props.editUserCommentReply}
            contentCommentUserReply={props.contentCommentUserReply}
            isShowUpdateCommentUserReply={props.isShowUpdateCommentUserReply}
            handleEditUserCommentReply={props.handleEditUserCommentReply}
            handleUpdateUserCommentReply={props.handleUpdateUserCommentReply}
            updateScoreCommentReply={props.updateScoreCommentReply}
          />
        ))}
      </div>
    </div>
  );
};

export default CardComment;
