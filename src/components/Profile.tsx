import { log } from "console";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth(app);

  const logout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.code);
    }
  };
  return (
    <div className="profile_box">
      <div className="flex_box-lg">
        <div className="profile_image"></div>
        <div>
          <div className="profile_email">{auth?.currentUser?.email}</div>
          <div className="profile_name">
            {auth?.currentUser?.displayName || "사용자"}
          </div>
        </div>
      </div>
      <div role="presentation" className="profile_logout" onClick={logout}>
        로그아웃
      </div>
    </div>
  );
}
