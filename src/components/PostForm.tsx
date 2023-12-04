export default function PostForm() {
  return (
    <form action="post" method="POST" className="form">
      <div className="form_block">
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" required></input>
      </div>
      <div className="form_block">
        <label htmlFor="summary">요약</label>
        <input type="text" name="summary" id="summary" required></input>
      </div>
      <div className="form_block">
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" required></textarea>
      </div>
      <div className="form_block">
        <input type="submit" value="제출" className="form_btn-submit" />
      </div>
    </form>
  );
}
