import { useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
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
        </div>
      )}
      <div className="post_list">
        {[...Array(10)].map((e, index) => (
          <Link to={`/posts/${index}`} key={index}>
            <div key={index} className="post_box">
              <div className="post_profile-box">
                <div className="post_profile"></div>
                <div className="post_author-name">패스트캠퍼스</div>
                <div className="post_date">2023.07.28 토요일</div>
              </div>
              <div className="post_title">게시글</div>
              <div className="post_text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                obcaecati quaerat recusandae alias aspernatur debitis illum
                animi explicabo? In voluptate molestias eos neque nulla
                asperiores distinctio delectus! Minus, illum asperiores. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                obcaecati quaerat recusandae alias aspernatur debitis illum
                animi explicabo? In voluptate molestias eos neque nulla
                asperiores distinctio delectus! Minus, illum asperiores. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Nobis
              </div>
              <div className="post_utils-box">
                <div className="post_delete">삭제</div>
                <div className="post_edit">수정</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
