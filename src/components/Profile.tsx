import { log } from "console";
import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");
  } catch (err: any) {
    console.log(err);
    toast.error(err?.code);
  }
};

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile_box">
      <div className="flex_box-lg">
        <div className="profile_image"></div>
        <div>
          <div className="profile_email">{user?.email}</div>
          <div className="profile_name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div role="presentation" className="profile_logout" onClick={onSignOut}>
        로그아웃
      </div>
    </div>
  );
}
