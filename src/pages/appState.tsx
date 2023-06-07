import { createContext, useState } from "react";
import { Lockscreen } from "./Auth/Lockscreen";
import { useIdleTimer } from "react-idle-timer";

export const AppContext = createContext<any>(null);

const timeout = 1000_000;

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);
     const [open, setOpen] = useState(false);

     const onIdle = () => {
          setOpen(true);
     };

     useIdleTimer({
          onIdle,
          timeout,
          throttle: 500,
     });

     return (
          <AppContext.Provider value={{ tanksStore, setTanksStore, open, setOpen }}>
               <Lockscreen />
               {children}
          </AppContext.Provider>
     );
};
