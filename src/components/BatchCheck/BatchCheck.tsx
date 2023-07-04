import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const batch = {
     id: "1",
     batchNumber: "B001",
     productName: "Product A",
     quantity: 100,
     productionDate: "2022-01-01",
};

const BatchView = ({ open, toggleModal }) => {
     const navigate = useNavigate();

     const handleTankHistory = () => {
          // Logic to handle tank history
          navigate("/batch-history");
          toggleModal();
     };

     return (
          <>
               <Modal isOpen={open} toggle={toggleModal} size="md">
                    <ModalHeader
                         toggle={toggleModal}
                         style={{ backgroundColor: "#fff", color: "#000" }}
                    >
                         Batch Details
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: "#fff", color: "#000" }}>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Liquid:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.batchNumber}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Description:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.productName}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Quantity:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.quantity}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Batch:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.productionDate}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>Date:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.productionDate}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>pH:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.productionDate}
                              </div>
                         </div>
                         <div className="mb-4 d-flex align-items-start justify-content-start gap-1">
                              <strong>pH spec:</strong>
                              <div className="flex-fill bg-dark px-2 rounded ml-2">
                                   {batch.productionDate}
                              </div>
                         </div>
                         <div className="text-center">
                              <Button color="secondary" onClick={handleTankHistory}>
                                   Check Tank History
                              </Button>
                         </div>
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: "#fff", color: "#000" }}>
                         <Button color="danger" onClick={toggleModal}>
                              Close
                         </Button>
                    </ModalFooter>
               </Modal>
          </>
     );
};

export default BatchView;
