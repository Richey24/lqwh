import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const TankUpdateForm = ({ tanks, setActiveTank, handleDisplay }) => {
     const [selectedTank, setSelectedTank] = useState("");
     const [updatedDetails, setUpdatedDetails] = useState<any>({});

     console.log("details", updatedDetails);

     const handleTankSelection = (event) => {
          const tankId = JSON.parse(event.target.value);
          setSelectedTank(tankId);
          setUpdatedDetails(tankId);
          setActiveTank(tankId);
          handleDisplay();
     };

     const handleInputChange = (event) => {
          const { name, value } = event.target;

          setUpdatedDetails((prevDetails) => ({
               ...prevDetails,
               [name]: value,
          }));
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          console.log("Updated Tank Details:", updatedDetails);
     };

     return (
          <div>
               <h2 className="mb-5">Update Tank Details</h2>
               <Form onSubmit={handleSubmit}>
                    <FormGroup>
                         <Label for="tankSelect">Select Tank:</Label>
                         <Input
                              type="select"
                              name="tankSelect"
                              id="tankSelect"
                              onChange={handleTankSelection}
                         >
                              <option value="">Select a tank...</option>
                              {tanks &&
                                   tanks.map((tank, idx) => (
                                        <option key={idx} value={JSON.stringify(tank)}>
                                             {tank.title}
                                        </option>
                                   ))}
                         </Input>
                    </FormGroup>

                    {selectedTank && (
                         <>
                              <FormGroup>
                                   <Label for="batchNumber">Batch Number:</Label>
                                   <Input
                                        type="text"
                                        name="batchNumber"
                                        id="batchNumber"
                                        onChange={handleInputChange}
                                        value={updatedDetails?.batchNumber || ""}
                                   />
                              </FormGroup>
                              <FormGroup>
                                   <Label for="fillValue">Weight:</Label>
                                   <Input
                                        type="text"
                                        name="fillValue"
                                        id="fillValue"
                                        onChange={handleInputChange}
                                        value={updatedDetails?.fillValue || ""}
                                   />
                              </FormGroup>
                              <FormGroup>
                                   <Label for="temperature">Temperature:</Label>
                                   <Input
                                        type="text"
                                        name="temperature"
                                        id="temperature"
                                        onChange={handleInputChange}
                                        value={updatedDetails?.temperature || ""}
                                   />
                              </FormGroup>{" "}
                              <FormGroup>
                                   <Label for="formula">Formula:</Label>
                                   <Input
                                        type="text"
                                        name="formula"
                                        id="formula"
                                        onChange={handleInputChange}
                                        value={updatedDetails?.formula || ""}
                                   />
                              </FormGroup>{" "}
                         </>
                    )}
               </Form>
          </div>
     );
};
