import Router from "./components/Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);
  // auth를 체크하기 전에 (initialize)전 에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
    // !! 두개는 확실한 boolean값을 가지기 위해 사용된다.
    // currentUser의 값이 있으면 true이고 없으면 false값을 가진다.
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        console.log("사용자가 로그인한 상태입니다.");
      } else {
        setIsAuthenticated(false);
        console.log("사용자가 로그아웃한 상태입니다.");
      }
      setInit(true);
    });
  }, [auth]);
  console.log(auth);
  return (
    <>
      <ToastContainer></ToastContainer>
      {init ? (
        <Router isAuthenticated={isAuthenticated}></Router>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default App;
