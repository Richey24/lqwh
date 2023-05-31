import { useContext, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { AppContext } from "../appState";

export function Lockscreen() {
     const { open, setOpen } = useContext(AppContext);
     const [backdrop] = useState(true);
     const [keyboard] = useState(true);

     return (
          <Modal
               isOpen={open}
               //    toggle={toggle}
               //    className={className}
               backdrop={backdrop}
               keyboard={keyboard}
               style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    boxShadow:
                         "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(0, 0, 0, 0.01) 0px 1px 2px 0px",
               }}
          >
               <ModalBody
                    style={{
                         backgroundColor: "#fff",
                         borderRadius: 8,
                         border: "1px solid #fff",
                         outline: 0,
                    }}
               >
                    <div className="card-body">
                         <div className="row">
                              <div className="col-md-12 mb-3">
                                   <div className="media mb-4">
                                        <div className="avatar avatar-lg me-3">
                                             <img
                                                  alt="avatar"
                                                  src="../src/assets/img/profile-7.jpeg"
                                                  className="rounded-circle"
                                             />
                                        </div>

                                        <div className="media-body align-self-center">
                                             <h3 className="mb-0">Shaun Park</h3>
                                             <p className="mb-0">
                                                  Enter your password to unlock your ID
                                             </p>
                                        </div>
                                   </div>
                              </div>
                              <div className="col-12">
                                   <div className="mb-4">
                                        <label className="form-label">Password</label>
                                        <input type="text" className="form-control" />
                                   </div>
                              </div>
                              <div className="col-12">
                                   <div className="mb-4">
                                        <Button
                                             className="btn btn-secondary w-100"
                                             onClick={() => setOpen(false)}
                                        >
                                             UNLOCK
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </ModalBody>
          </Modal>
     );
}
