import { Route , Routes } from 'react-router-dom';

import { DefaultLayout } from "./layouts/default";
import { Dashboard } from "./pages/Dashboard/Dashboard";

import $ from "jquery"; 
window.$ = window.jQuery = $;

import { router } from "./routes";


function App() {
  return (
    <>
       <Routes>
          <Route path="/"  element={<DefaultLayout />}  >
                <Route path="/" element={<Dashboard />}         /> 
          </Route> 
      </Routes>
    </>
  )
}

export default App
