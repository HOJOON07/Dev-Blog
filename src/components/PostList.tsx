import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export type CategoryType = "FrontEnd" | "BackEnd" | "Web" | "Native";

export const CATEGORIES: CategoryType[] = [
  "FrontEnd",
  "BackEnd",
  "Web",
  "Native",
];

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  uid?: string;
  updatedAt?: string;
  category?: string;
  comments?: CommentsInterFace[];
}

export interface CommentsInterFace {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

type TabType = "all" | "my";

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    // 정렬이 안된채로 데이터를 가져오는 코드
    //const datas = await getDocs(collection(db, "posts"));
    //초기화 해주는 코드
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;
    if (activeTab === "my") {
      //내 글만
      postsQuery = query(
        postsRef,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (activeTab === "all") {
      //모든 글
      postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    } else {
      //카테고리 글 보여주기
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }
    const datas = await getDocs(postsQuery);
    datas.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post_navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post_navigation-active" : ""}
          >
            전체 글
          </div>
          <div
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post_navigation-active" : ""}
          >
            나의 글
          </div>
          {CATEGORIES?.map((category) => {
            return (
              <div
                key={category}
                role="presentation"
                onClick={() => setActiveTab(category)}
                className={
                  activeTab === category ? "post_navigation-active" : ""
                }
              >
                {category}
              </div>
            );
          })}
        </div>
      )}
      <div className="post_list">
        {posts?.length > 0 ? (
          posts.map((post, index) => (
            <div key={post.id} className="post_box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post_profile-box">
                  <div className="post_profile"></div>
                  <div className="post_author-name">{post?.email}</div>
                  <div className="post_date">{post?.createdAt}</div>
                </div>
                <div className="post_title">{post?.title}</div>
                <div className="post_text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post_utils-box">
                  <div
                    className="post_delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post_no-post">"게시글이 없습니다."</div>
        )}
      </div>
    </>
  );
}
