import { createContext, useEffect, useState } from "react";
import { Lockscreen } from "./Auth/Lockscreen";
import { useIdleTimer } from "react-idle-timer";
import { useGetMe, useLockScreen, useUnlockScreen } from "./hooks";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useGetRoles } from "./Settings/hooks";
import BatchView from "../components/BatchCheck/BatchCheck";

export const AppContext = createContext<any>(null);

const timeout = 120_000;

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const [openModal, setOpenModal] = useState(false);
     const [user, setUser] = useState<any>(null);
     const unLockScreen = useUnlockScreen();
  
     const getMe = useGetMe();
     const getRoles = useGetRoles();
     const lockScreen = useLockScreen();

     const onIdle = () => {
          if (!location.pathname.match("/auth")) {
               setOpen(true);
               if (user) {
                    lockScreen(
                         user.email,
                         () => {
                              getMe(setUser, setLoading);
                         },
                         () => {},
                    );
               }
          }
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
          if (user && user?.locked && !location.pathname.match("/auth")) {
               setOpen(!user.locked ? false : true);
          }
     }, [user]);

     useIdleTimer({
          onIdle,
          timeout,
          throttle: 500,
     });

     const toggleModal = () => {
          setOpenModal((prev) => !prev);
     };

     return (
          <AppContext.Provider
               value={{
                    tanksStore,
                    setTanksStore,
                    open,
                    setOpen,
                    user,
                    setUser,
                    toggleBatchViewModal: toggleModal,
               }}
          >
               <Lockscreen onClick={unLockScreen} />
               <BatchView open={openModal} toggleModal={toggleModal} />
               {loading && <LoadingScreen />}
               {children}
          </AppContext.Provider>
     );
};
