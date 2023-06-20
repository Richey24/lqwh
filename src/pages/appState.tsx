import { createContext, useEffect, useState } from "react";
import { Lockscreen } from "./Auth/Lockscreen";
import { useIdleTimer } from "react-idle-timer";
import { useGetMe } from "./hooks";

export const AppContext = createContext<any>(null);

const timeout = 1000_000;

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);
     const [open, setOpen] = useState(false);
     const [user, setUser] = useState<any>(null);
     const getMe = useGetMe();

     const onIdle = () => {
          setOpen(true);
     };

     useEffect(() => {
          getMe(setUser);
     }, []);

     useIdleTimer({
          onIdle,
          timeout,
          throttle: 500,
     });

     return (
          <AppContext.Provider value={{ tanksStore, setTanksStore, open, setOpen, user }}>
               <Lockscreen />
               {children}
          </AppContext.Provider>
     );
};
