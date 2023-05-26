import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

export const AppState = ({ children }: { children: React.ReactChild }) => {
     const [tanksStore, setTanksStore] = useState(null);

     return (
          <AppContext.Provider value={{ tanksStore, setTanksStore }}>
               {children}
          </AppContext.Provider>
     );
};
