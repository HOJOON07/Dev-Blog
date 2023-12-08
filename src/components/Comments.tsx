import React, { useContext, useState } from "react";
import { CommentsInterFace, PostProps } from "./PostList";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import { log } from "console";

// const Comments_MOCK = [
//   {
//     id: 1,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
//   {
//     id: 2,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
//   {
//     id: 3,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
//   {
//     id: 4,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
//   {
//     id: 5,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
//   {
//     id: 6,
//     email: "ghwns107@naver.com",
//     content: "댓글입니다. 1",
//     createdAt: "2023-10-10",
//   },
// ];

interface CommentProps {
  post: PostProps;
  getPost: (id: string) => void;
}

export default function Comments({ post, getPost }: CommentProps) {
  const [comments, setComments] = useState("");
  const { user } = useContext(AuthContext);
  console.log(post);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComments(value);
    }
  };

  const handleDeleteComment = async (data: CommentsInterFace) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirm && post.id) {
      const postRef = doc(db, "posts", post?.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });
      toast.success("댓글을 삭제했습니다.");
      getPost(post.id);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentsObj = {
            content: comments,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentsObj),
          });
          await getPost(post?.id);
        }
      }
      toast.success("댓글을 생성했습니다.");
      setComments("");
    } catch (err: any) {
      console.log(err);
      toast.error(err.code);
    }
  };

  return (
    <div className="comments">
      <form className="comments_form" onSubmit={onSubmit}>
        <div className="form_block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comments}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form_block form_block-reverse">
          <input type="submit" value="입력" className="form_btn-submit" />
        </div>
      </form>
      <div className="comments_list">
        {post.comments
          ?.slice(0)
          .reverse()
          .map((comments) => {
            return (
              <div key={comments.createdAt} className="comments_box">
                <div className="comments_profile-box">
                  <div className="comments_email ">{comments?.email}</div>
                  <div className="comments_date">{comments?.createdAt}</div>
                  {comments.uid === user?.uid && (
                    <div
                      className="comments_delete"
                      onClick={() => handleDeleteComment(comments)}
                    >
                      삭제
                    </div>
                  )}
                </div>
                <div className="comments_text">{comments?.content}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

//지옥짬뽕 3단계랑 탕수욕 소 짬뽕 국물 추가 되나요??
