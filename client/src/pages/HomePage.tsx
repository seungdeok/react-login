import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentUserInfo } from "../api/login";
import { UserInfo } from "../types/user";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isDataFetched = useRef(false);

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await getCurrentUserInfo();

      if (userInfo === null) return;

      setUserInfo(userInfo);

      isDataFetched.current = true;
    } catch (err) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (isDataFetched.current) return;
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Home page</h1>
      <div>
        <h2>User info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default HomePage;
