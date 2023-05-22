import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootTypes } from "../../store";
import Tank from "../../components/waterTank/tank.tsx";
import { tabs, tanks } from "./data.ts";
import classes from "./styles.module.css";

export const Dashboard = (props: any) => {
     const appstore = useSelector((state: RootTypes) => state.appStore);
     const [activeTab, setActiveTab] = useState(1);
     const [ tankss, setTanks ] = useState([])


     const handleTab = (value: any) => {
          setActiveTab(value);
     };

     function forceUpdate() {
        location.reload()
        // setTanks(tanks)
     }

     useEffect(() => {
        setTanks(tanks)
     }, [])

     return (
          <div>
               <div className="main-container " id="container">
                    <div id="content" className="main-content">
                         <div className="middle-content">
                              <div className="mb-4">
                                   <nav className="breadcrumb-style-one" aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                             <li className="breadcrumb-item">
                                                  <a href="#">Storage Area</a>
                                                  <br />
                                                  <button className="btn btn-primary" onClick={() => forceUpdate()}>Refresh</button>
                                             </li>
                                        </ol>
                                   </nav>
                              </div>

                              

                              <div className="row">
                                   <div className="col-md-12">
                                        <div className="simple-pill">
                                             <ul
                                                  className="nav nav-pills mb-3"
                                                  id="pills-tab"
                                                  role="tablist"
                                             >
                                                  {tabs.map((tab, idx) => (
                                                       <li
                                                            className="nav-item"
                                                            role="presentation"
                                                            key={idx}
                                                       >
                                                            <button
                                                                 onClick={() => handleTab(idx + 1)}
                                                                 className={`nav-link ${
                                                                      activeTab === idx + 1 &&
                                                                      "active"
                                                                 }`}
                                                                 type="button"
                                                            >
                                                                 {tab}
                                                            </button>
                                                       </li>
                                                  ))}
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                              {activeTab === 1 ? (
                                   <div className={classes.containerRoot}>
                                        {tankss
                                             .filter((tank) => tank?.type === "normal")
                                             .map((tankProps, idx) => (
                                                  <Tank {...tankProps} />
                                             ))}
                                   </div>
                              ) : (
                                   <div className="row layout-top-spacing gy-4">
                                        <div
                                             className={classes.containerRoot}
                                             style={{ width: "70%" }}
                                        >
                                             {tankss
                                                  .filter((tank) => tank?.type === "premix")
                                                  .map((tankProps, idx) => (
                                                       <Tank {...tankProps} />
                                                  ))}
                                        </div>
                                        <div
                                             className={classes.containerRoot}
                                             style={{ width: "70%" }}
                                        >
                                             {tankss
                                                  .filter((tank) => tank?.type === "mix")
                                                  .map((tankProps, idx) => (
                                                       <Tank {...tankProps} />
                                                  ))}
                                        </div>
                                   </div>
                              )}
                         </div>

                         <div className="footer-wrapper">
                              <div className="footer-section f-section-1"></div>
                              <div className="footer-section f-section-2"></div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
