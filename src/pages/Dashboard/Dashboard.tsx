import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootTypes } from "../../store";
import Tank from "../../components/waterTank/tank.tsx";
import { tabs, tanks } from "./data.ts";
import classes from "./styles.module.css";
import { TankProps } from "./types.ts";
import { useGetTanks } from "./hooks.ts";

export const Dashboard = (props: any) => {
     const appstore = useSelector((state: RootTypes) => state.appStore);
     const [activeTab, setActiveTab] = useState(1);
     const [tankss, setTanks] = useState<TankProps[] | null>(null);
     const getTanks = useGetTanks();

     const handleTab = (value: any) => {
          setActiveTab(value);
     };

     function forceUpdate() {
          location.reload();
          // setTanks(tanks)
     }

     useEffect(() => {
          setInterval(() => {
               setTanks(null);
               setTanks(getTanks());
          }, 1000);
     }, []);

     return (
          <div>
               <div className="main-container " id="container">
                    <div id="content" className="main-content">
                         {tankss ? (
                              <div className="middle-content">
                                   <div className="mb-4">
                                        <nav
                                             className="breadcrumb-style-one"
                                             aria-label="breadcrumb"
                                        >
                                             <ol className="breadcrumb">
                                                  <li className="breadcrumb-item">
                                                       <a href="#">Storage Area</a>
                                                  </li>
                                             </ol>
                                        </nav>
                                   </div>
                                   <div className="row">
                                        <div className="col-md-11"></div>
                                        <div className="col-md-1 ">
                                             <button
                                                  className="btn pull-right float-right btn-success"
                                                  onClick={() => forceUpdate()}
                                             >
                                                  Refresh
                                             </button>
                                        </div>
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
                                                                      onClick={() =>
                                                                           handleTab(idx + 1)
                                                                      }
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
                                                  ?.filter((tank) => tank?.type === "normal")
                                                  ?.map((tankProps, idx) => (
                                                       <Tank {...tankProps} />
                                                  ))}
                                        </div>
                                   ) : (
                                        <div className="col layout-top-spacing gy-6">
                                             <div
                                                  className={classes.containerRoot}
                                                  style={{ width: "50%" }}
                                             >
                                                  {tankss
                                                       ?.filter((tank) => tank?.type === "premix")
                                                       ?.map((tankProps, idx) => (
                                                            <Tank {...tankProps} />
                                                       ))}
                                             </div>
                                             <div
                                                  className={classes.containerRoot}
                                                  style={{ width: "50%" }}
                                             >
                                                  {tankss
                                                       ?.filter((tank) => tank?.type === "mix")
                                                       ?.map((tankProps, idx) => (
                                                            <Tank {...tankProps} />
                                                       ))}
                                             </div>
                                        </div>
                                   )}
                              </div>
                         ) : (
                              <div
                                   className="spinner-container d-flex justify-content-center align-items-center"
                                   style={{ width: "100%", minHeight: "400px" }}
                              >
                                   <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                   </div>
                              </div>
                         )}

                         <div className="footer-wrapper">
                              <div className="footer-section f-section-1"></div>
                              <div className="footer-section f-section-2"></div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
