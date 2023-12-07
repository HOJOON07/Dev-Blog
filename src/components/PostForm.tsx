import AuthContext from "context/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES, CategoryType, PostProps } from "./PostList";

export default function PostForm() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | string>("FrontEnd");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category,
        });
        toast.success("게시글 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
          category,
        });
        toast.success("게시글 생성했습니다.");
        navigate("/");
      }
      //파이어 스토어에 데이터 추가하는 로직
    } catch (err: any) {
      console.log(err);
      toast?.error(err.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }

    if (name === "category") {
      setCategory(value);
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form_block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        ></input>
      </div>
      <div className="form_block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form_block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        ></input>
      </div>
      <div className="form_block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        ></textarea>
      </div>
      <div className="form_block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form_btn-submit"
        />
      </div>
    </form>
  );
}
