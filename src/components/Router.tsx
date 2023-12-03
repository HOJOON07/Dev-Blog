import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostList from "../pages/posts";
import PostDetail from "../pages/posts/detail";
import PostNew from "../pages/posts/new";
import PostEdit from "../pages/posts/edit";
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/posts" element={<PostList></PostList>}></Route>
      <Route path="/posts:id" element={<PostDetail></PostDetail>}></Route>
      <Route path="/posts/new" element={<PostNew></PostNew>}></Route>
      <Route path="/posts/edit/:id" element={<PostEdit></PostEdit>}></Route>
      <Route path="/profile" element={<ProfilePage></ProfilePage>}>
        Profile Page
      </Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
      <Route path="*" element={<Navigate replace to="/"></Navigate>}></Route>
    </Routes>
  );
}
