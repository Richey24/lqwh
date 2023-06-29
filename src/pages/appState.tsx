import { createContext, useEffect, useState } from "react";
import { Lockscreen } from "./Auth/Lockscreen";
import { useIdleTimer } from "react-idle-timer";
import { useGetMe } from "./hooks";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useGetRoles } from "./Settings/hooks";

export const AppContext = createContext<any>(null);

const timeout = 1000_000;

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const [user, setUser] = useState<any>(null);

     const getMe = useGetMe();
     const getRoles = useGetRoles();

     const onIdle = () => {
          setOpen(true);
     };

     useEffect(() => {
          if (localStorage.getItem("token")) {
               getMe(setUser, setLoading);
          }
     }, []);

     useEffect(() => {
          if (user && !user.role) {
               getRoles(undefined, (role) => setUser((me) => ({ ...me, role })), user.roleId);
          }
     }, [user]);

     useIdleTimer({
          onIdle,
          timeout,
          throttle: 500,
     });

     return (
          <AppContext.Provider value={{ tanksStore, setTanksStore, open, setOpen, user, setUser }}>
               <Lockscreen />
               {loading && <LoadingScreen />}
               {children}
          </AppContext.Provider>
     );
};
