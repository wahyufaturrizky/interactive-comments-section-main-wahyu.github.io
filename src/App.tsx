/* eslint-disable @typescript-eslint/no-explicit-any */
import CardComment, { TypeScore } from "components/CardComment";
import InputComment from "components/InputComment";
import Layout from "components/Layout";
import Modal from "components/Modal";
import {
  CommentListInterface,
  ReplieInterface,
  StateReqBodyCommentInterface,
} from "interface/Comment";
import { UserInterface } from "interface/User";
import React, { useCallback, useEffect, useState } from "react";
import "style/App.css";
import { ColorBaseEnum } from "style/Color";

interface ModalInterface {
  isVisible?: boolean;
  dataModal?: null | CommentListInterface;
  dataModalReply?: null | ReplieInterface;
}

const App = () => {
  const [commentDataList, setCommentDataList] = useState<
    Array<CommentListInterface>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataComment, setDataComment] = useState<CommentListInterface>();
  const [editUserComment, setEditUserComment] =
    useState<CommentListInterface>();
  const [isShowUpdateCommentUser, setIsShowUpdateCommentUser] =
    useState<boolean>(false);
  const [isShowReply, setIsShowReply] = useState<boolean>(false);
  const [contentCommentUser, setcontentCommentUser] = useState<string>("");

  const handleEditUserComment = (e: any) => {
    setcontentCommentUser(e.target.value);
  };
  const [stateModal, setstateModal] = useState<ModalInterface>({
    isVisible: false,
    dataModal: null,
    dataModalReply: null,
  });
  const { isVisible, dataModal, dataModalReply } = stateModal;
  const [dataUser, setDataUser] = useState<UserInterface>();
  const [stateReqBodyComment, setStateReqBodyComment] =
    useState<StateReqBodyCommentInterface>({
      content: null,
      imagePng: null,
      imageWebp: null,
      username: null,
    });
  const [stateReqBodyCommentReply, setStateReqBodyCommentReply] =
    useState<StateReqBodyCommentInterface>({
      content: null,
      imagePng: null,
      imageWebp: null,
      username: null,
    });

  const [editUserCommentReply, setEditUserCommentReply] =
    useState<ReplieInterface>();
  const [contentCommentUserReply, setcontentCommentUserReply] =
    useState<string>("");
  const [isShowUpdateCommentUserReply, setIsShowUpdateCommentUserReply] =
    useState<boolean>(false);

  const handleEditUserCommentReply = (e: any) => {
    setcontentCommentUserReply(e.target.value);
  };

  const geteditUserCommentReply = (data: ReplieInterface) => {
    const tempDataUser = commentDataList.find(
      (finding) => finding.user?.username === data.replyingTo
    );

    const tempgetEditUser = tempDataUser?.replies?.find(
      (finding) => finding.id === data.id
    );

    setEditUserCommentReply(tempgetEditUser);
    setcontentCommentUserReply(tempgetEditUser?.content || "");
    setIsShowUpdateCommentUserReply(!isShowUpdateCommentUserReply);
  };

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments"
      );
      if (res.status === 200) {
        const response = await res.json();

        setCommentDataList(response);
      }
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAskForDeleteComment = (data: CommentListInterface) => {
    setstateModal({
      dataModal: data,
      isVisible: true,
    });
  };

  const handleAskForDeleteCommentReply = (data: ReplieInterface) => {
    setstateModal({
      dataModalReply: data,
      isVisible: true,
    });
  };

  const addComment = async () => {
    setIsLoading(true);

    if (stateReqBodyComment.content !== null) {
      try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var reqBody = JSON.stringify({
          content: stateReqBodyComment?.content,
          createdAt: new Date(),
          score: 0,
          user: {
            image: {
              png: stateReqBodyComment?.imagePng,
              webp: stateReqBodyComment?.imageWebp,
            },
            username: stateReqBodyComment?.username,
          },
          replies: [],
        });

        await fetch(
          "https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments",
          {
            method: "POST",
            headers: myHeaders,
            body: reqBody,
            redirect: "follow",
          }
        );
      } catch (error) {
        window.alert(error);
        setIsLoading(false);
      } finally {
        setStateReqBodyComment({ ...stateReqBodyComment, content: null });
        fetchComments();
      }
    } else {
      setStateReqBodyComment({ ...stateReqBodyComment, content: null });
      window.alert("Plesae fill your comment");
      setIsLoading(false);
    }
  };

  const updateScoreComment = async (
    dataUpdateScoreUser: CommentListInterface,
    type: TypeScore
  ) => {
    setIsLoading(true);

    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var reqBody = JSON.stringify({
        score:
          type === "increase"
            ? (dataUpdateScoreUser.score || 0) + 1
            : dataUpdateScoreUser.score === 1
            ? dataUpdateScoreUser.score
            : (dataUpdateScoreUser.score || 0) - 1,
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${dataUpdateScoreUser.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
    } finally {
      fetchComments();
    }
  };

  const updateScoreCommentReply = async (
    dataUpdateScoreUser: ReplieInterface,
    type: TypeScore
  ) => {
    setIsLoading(true);

    const tempComment = commentDataList.find(
      (finding) => finding.user?.username === dataUpdateScoreUser.replyingTo
    );

    const tempUpdateContenReply = tempComment?.replies?.map((mapping) => {
      if (mapping.id === dataUpdateScoreUser.id) {
        return {
          ...mapping,
          score:
            type === "increase"
              ? (dataUpdateScoreUser.score || 0) + 1
              : dataUpdateScoreUser.score === 1
              ? dataUpdateScoreUser.score
              : (dataUpdateScoreUser.score || 0) - 1,
        };
      } else {
        return mapping;
      }
    });

    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var reqBody = JSON.stringify({
        replies: tempUpdateContenReply,
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${tempComment?.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
    } finally {
      fetchComments();
    }
  };

  const handleUpdateUserComment = async (
    dataUpdateCommentUser: CommentListInterface,
    content: string
  ) => {
    setIsLoading(true);
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var reqBody = JSON.stringify({
        content: content,
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${dataUpdateCommentUser.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      window.alert(error);
      setIsShowUpdateCommentUser(false);
      setIsLoading(false);
    } finally {
      setIsShowUpdateCommentUser(false);
      fetchComments();
    }
  };

  const handleUpdateUserCommentReply = async (
    dataUpdateCommentUser: ReplieInterface,
    content: string
  ) => {
    setIsLoading(true);

    const tempComment = commentDataList.find(
      (finding) => finding.user?.username === dataUpdateCommentUser.replyingTo
    );

    const tempUpdateContenReply = tempComment?.replies?.map((mapping) => {
      if (mapping.id === dataUpdateCommentUser.id) {
        return { ...mapping, content: content };
      } else {
        return mapping;
      }
    });
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var reqBody = JSON.stringify({
        replies: tempUpdateContenReply,
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${tempComment?.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
      setIsShowUpdateCommentUserReply(false);
    } finally {
      setIsShowUpdateCommentUserReply(false);
      fetchComments();
    }
  };

  const handleSubmitCommentReply = async (
    dataUpdateCommentReply: CommentListInterface,
    content: string
  ) => {
    setIsLoading(true);
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const tempReplies = commentDataList.find(
        (finding) => finding.id === dataUpdateCommentReply.id
      );

      const dataReply = {
        id: new Date().valueOf(),
        content: content,
        createdAt: new Date(),
        score: 4,
        replyingTo: dataUpdateCommentReply.user?.username,
        user: {
          image: {
            png: "assets/images/avatars/image-wahyu.png",
            webp: "assets/images/avatars/image-wahyu.png",
          },
          username: "wahyu fatur rizki",
        },
      };

      var reqBody = JSON.stringify({
        replies: [...(tempReplies?.replies || []), dataReply],
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${dataUpdateCommentReply.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
    } finally {
      fetchComments();
    }
  };

  const handleDeleteCommentReply = async () => {
    setIsLoading(true);
    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const tempComment = commentDataList.find(
        (finding) => finding.user?.username === dataModalReply?.replyingTo
      );

      const tempDeleteReply = tempComment?.replies?.filter(
        (filter) => filter.id !== dataModalReply?.id
      );

      var reqBody = JSON.stringify({
        replies: tempDeleteReply,
      });

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${tempComment?.id}`,
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
          redirect: "follow",
        }
      );
    } catch (error) {
      setstateModal({ ...stateModal, isVisible: false });
      window.alert(error);
      setIsLoading(false);
    } finally {
      setstateModal({ ...stateModal, isVisible: false });
      fetchComments();
    }
  };

  const handleConfirmDeleteComment = async () => {
    setIsLoading(true);

    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      await fetch(
        `https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/comments/${dataModal?.id}`,
        {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        }
      );
    } catch (error) {
      setstateModal({ ...stateModal, isVisible: false });
      window.alert(error);
      setIsLoading(false);
    } finally {
      setstateModal({ ...stateModal, isVisible: false });
      fetchComments();
    }
  };

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://my-json-server.typicode.com/wahyufaturrizky/server-mock-frontend-mentor-comment-wahyu/currentUser"
      );
      if (res.status === 200) {
        const response = await res.json();
        setStateReqBodyComment({
          ...stateReqBodyComment,
          imagePng: response.image.png,
          imageWebp: response.image.webp,
          username: response.username,
        });

        setDataUser(response);
      }
    } catch (error) {
      window.alert(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchComments();
    fetchUser();
  }, [fetchComments, fetchUser]);

  const handleChange = (e: any) => {
    setStateReqBodyComment({
      ...stateReqBodyComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleReplyComment = (e: any) => {
    setStateReqBodyCommentReply({
      ...stateReqBodyCommentReply,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="container-wraper-card">
        {isLoading ? (
          <p
            className="font-500"
            style={{ textAlign: "center", color: ColorBaseEnum.grayishBlue }}
          >
            Loading comments...
          </p>
        ) : (
          commentDataList.map((data, index) => (
            <CardComment
              handleAskForDeleteComment={handleAskForDeleteComment}
              handleAskForDeleteCommentReply={handleAskForDeleteCommentReply}
              handleIncreaseScore={updateScoreComment}
              handleDecreaseScore={updateScoreComment}
              key={index}
              data={data}
              dataUser={dataUser}
              handleUpdateUserComment={handleUpdateUserComment}
              setDataComment={setDataComment}
              dataComment={dataComment}
              editUserComment={editUserComment}
              setEditUserComment={setEditUserComment}
              isShowUpdateCommentUser={isShowUpdateCommentUser}
              setIsShowUpdateCommentUser={setIsShowUpdateCommentUser}
              isShowReply={isShowReply}
              setIsShowReply={setIsShowReply}
              contentCommentUser={contentCommentUser}
              setcontentCommentUser={setcontentCommentUser}
              handleEditUserComment={handleEditUserComment}
              handleReplyComment={handleReplyComment}
              setStateReqBodyCommentReply={setStateReqBodyCommentReply}
              stateReqBodyCommentReply={stateReqBodyCommentReply}
              handleSubmitCommentReply={handleSubmitCommentReply}
              geteditUserCommentReply={geteditUserCommentReply}
              editUserCommentReply={editUserCommentReply}
              contentCommentUserReply={contentCommentUserReply}
              isShowUpdateCommentUserReply={isShowUpdateCommentUserReply}
              handleEditUserCommentReply={handleEditUserCommentReply}
              handleUpdateUserCommentReply={handleUpdateUserCommentReply}
              updateScoreCommentReply={updateScoreCommentReply}
            />
          ))
        )}

        <div style={{ marginTop: 16 }}>
          <InputComment
            data={dataUser}
            stateReqBodyComment={stateReqBodyComment}
            onClick={addComment}
            onChange={handleChange}
            buttonLabel="SEND"
          />
        </div>
      </div>

      <Modal
        isVisible={isVisible}
        headerTitle="Delete Comment"
        content="Are you sure you want to delete this comment ? his will remove the comment and can’t be un done"
        onClickButtonPrimary={() =>
          dataModalReply
            ? handleDeleteCommentReply()
            : handleConfirmDeleteComment()
        }
        onClickButtonSecondary={() =>
          setstateModal({ ...stateModal, isVisible: false })
        }
      />

      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by
        <a
          href="https://www.linkedin.com/in/wahyu-fatur-rizky/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Wahyu Fatur Rizki
        </a>
        .
      </div>
    </Layout>
  );
};

export default App;
