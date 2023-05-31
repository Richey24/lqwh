/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layouts/default";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Auth } from "./layouts/auth";
import { Lockscreen } from "./pages/Auth/Lockscreen";
import { Login } from "./pages/Auth/Login";
import { Settings } from "./pages/Settings/settings";
//@ts-ignore
import $ from "jquery";
import { AppState } from "./pages/appState";
//@ts-ignore
window.$ = window.jQuery = $;

function App() {
     return (
          <AppState>
               <>
                  
                    <Routes>
                         <Route path="/" element={<DefaultLayout />}>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="settings" element={<Settings />} />
                         </Route>
                         <Route path="/auth" element={<Auth />}>
                              <Route path="lockscreen" element={<Lockscreen />} />
                              <Route path="login" element={<Login />} />
                         </Route>
                    </Routes>
               </>
          </AppState>
     );
}

export default App;
