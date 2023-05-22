/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layouts/default";
import { Dashboard } from "./pages/Dashboard/Dashboard";

//@ts-ignore
import $ from "jquery";
//@ts-ignore
window.$ = window.jQuery = $;

function App() {
     return (
          <>
               <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                         <Route path="/" element={<Dashboard />} />
                    </Route>
               </Routes>
          </>
     );
}

export default App;
