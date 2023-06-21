// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
     Container,
     Row,
     Col,
     Card,
     CardBody,
     Input,
     Modal,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
} from "reactstrap";
import { DndProvider, useDrop, useDrag, DragObjectWithType } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetLocations } from "../hooks";
import { toast } from "react-toastify";
import { CreateLocationModal } from "../CreateLocation/CreateLocation";
import { IoMdAdd } from "react-icons/io";

interface Tank {
     id: number;
     name: string;
     locationId: number;
}

interface Location {
     id: number;
     name: string;
     //  tanks: Tank[];
}

interface AssignedTankProps {
     tank: Tank;
}

interface UnassignedTankProps {
     tank: Tank;
}

interface DropResult {
     tankId: number;
     locationId: number;
}

export const TanksLocation: React.FC = () => {
     const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
     const [locations, setLocations] = useState<Location[]>([]);
     const [tanks, setTanks] = useState<Tank[]>([
          { id: 1, name: "Tank 1", locationId: 0 },
          { id: 2, name: "Tank 2", locationId: 0 },
          { id: 3, name: "Tank 3", locationId: 0 },
          // Add more tanks as needed
     ]);
     const getLocations = useGetLocations();
     const [assignedTanks, setAssignedTanks] = useState<Location[]>(locations);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [dropType, setDropType] = useState<{ type: string | null; tank: Tank | null }>({
          type: "",
          tank: null,
     });
     const [locationModal, setLocationModal] = useState(false);

     useEffect(() => {
          getLocations(setLocations);
     }, []);

     const AssignedTanksDropZone: React.FC<{ location: Location }> = ({ location }) => {
          const [{ isOver }, drop] = useDrop<DragObjectWithType>(
               () => ({
                    accept: "tank",
                    drop: (item: DropResult) => {
                         //  console.log(item);
                         const tank = tanks.find((t) => t.id === item.tankId);
                         //  console.log(item, tank);
                         if (selectedLocation) {
                              if (tank) {
                                   setDropType({ type: "assign", tank });
                                   setIsModalOpen(true);
                              }
                         } else {
                              toast.error("Pls, Choose a Location");
                         }
                    },
                    collect: (monitor) => ({
                         isOver: !!monitor.isOver(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drop}
                    style={{
                         minHeight: "200px",
                         background: isOver ? "lightblue" : "white",
                         border: "1px dashed rgb(153 126 183)",
                         flex: 1,
                         width: "100%",
                    }}
                    className="p-2 rounded"
               >
                    {tanks
                         .filter((tank) => tank.locationId === selectedLocation?.id)
                         .map((tank) => (
                              <AssignedTank key={tank.id} tank={tank} />
                         ))}
               </div>
          );
     };

     const AssignedTank: React.FC<AssignedTankProps> = ({ tank }) => {
          const [{ isDragging }, drag] = useDrag<DragObjectWithType>(
               () => ({
                    type: "tank",
                    item: { tankId: tank.id },
                    collect: (monitor) => ({
                         isDragging: !!monitor.isDragging(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drag}
                    style={{
                         opacity: isDragging ? 0.5 : 1,
                         cursor: "move",
                         marginBottom: 8,
                    }}
               >
                    <Card>
                         <CardBody>{tank.name}</CardBody>
                    </Card>
               </div>
          );
     };

     const UnassignedTanksDropZone: React.FC = () => {
          const [{ isOver }, drop] = useDrop<any>(
               () => ({
                    accept: "tank",
                    drop: (item: DropResult) => {
                         const tank = tanks.find((t) => t.id === item.tankId);
                         if (tank) {
                              setIsModalOpen(true);
                              setDropType({ type: "unassign", tank });
                         }
                    },
                    collect: (monitor) => ({
                         isOver: !!monitor.isOver(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drop}
                    style={{
                         minHeight: "200px",
                         background: isOver ? "lightblue" : "white",
                         border: "1px dashed rgb(153 126 183)",
                    }}
                    className="p-2 rounded"
               >
                    {tanks
                         .filter((tank) => tank.locationId === 0)
                         .map((tank) => (
                              <UnassignedTank key={tank.id} tank={tank} />
                         ))}
               </div>
          );
     };

     const UnassignedTank: React.FC<UnassignedTankProps> = ({ tank }) => {
          const [{ isDragging }, drag] = useDrag<unknown>(
               () => ({
                    type: "tank",
                    item: { tankId: tank.id },
                    collect: (monitor) => ({
                         isDragging: !!monitor.isDragging(),
                    }),
               }),
               [],
          );

          return (
               <div
                    ref={drag}
                    style={{
                         opacity: isDragging ? 0.5 : 1,
                         cursor: "move",
                         marginBottom: 8,
                    }}
               >
                    <Card>
                         <CardBody>
                              {tank.name}
                              {/* <button onClick={onAssign}>Assign</button> */}
                         </CardBody>
                    </Card>
               </div>
          );
     };

     const handleConfirm = () => {
          // Handle confirmed drop action here
          setIsModalOpen(false);
          if (dropType.type === "unassign") {
               setTanks((preTanks) => {
                    return preTanks.map((tank) => {
                         if (tank.id === dropType.tank?.id) {
                              return {
                                   ...tank,
                                   locationId: 0,
                              };
                         } else {
                              return tank;
                         }
                    });
               });
          } else if (dropType.type === "assign") {
               setTanks((preTanks) => {
                    return preTanks.map((tank) => {
                         if (tank.id === dropType.tank?.id) {
                              return {
                                   ...tank,
                                   locationId: selectedLocation?.id || 0,
                              };
                         } else {
                              return tank;
                         }
                    });
               });
          }
     };

     const handleCancel = () => {
          // Handle canceled drop action here
          setIsModalOpen(false);
     };

     return (
          <Container>
               <Modal isOpen={isModalOpen} toggle={handleCancel} className="custom-modal">
                    <ModalHeader toggle={handleCancel}>
                         {dropType.type === "assign" ? "Assign" : "Unassign"}
                    </ModalHeader>
                    <ModalBody>
                         Are you sure you want to{" "}
                         {dropType.type === "assign" ? "Assign" : "Unassign"} Tank?
                    </ModalBody>
                    <ModalFooter>
                         <Button color="primary" onClick={handleConfirm}>
                              Confirm
                         </Button>
                         <Button color="secondary" onClick={handleCancel}>
                              Cancel
                         </Button>
                    </ModalFooter>
               </Modal>
               <CreateLocationModal
                    isOpen={locationModal}
                    toggleModal={() => setLocationModal((prev) => !prev)}
                    onCreateLocation={CreateLocationModal}
               />
               <div className="mb-2 pb-2 d-flex align-items-center gap-2 w-100">
                    <Input
                         type="select"
                         value={selectedLocation ? selectedLocation.id : ""}
                         onChange={(e) => {
                              const { value } = e.target;
                              const selectedL = locations.find(
                                   (location) => location.id === parseInt(value),
                              );
                              if (selectedL) setSelectedLocation(selectedL);
                         }}
                    >
                         <option value="">-- Select Locations --</option>
                         {locations.map((location) => (
                              <option key={location.id} value={location.id}>
                                   {location.name}
                              </option>
                         ))}
                    </Input>
                    <Button
                         color="primary"
                         onClick={() => setLocationModal((prev) => !prev)}
                         className="rounded-circle"
                    >
                         <IoMdAdd />
                    </Button>
               </div>
               <Row>
                    <Col>
                         <h3>Available/Unassigned Tanks</h3>
                         <DndProvider backend={HTML5Backend}>
                              <UnassignedTanksDropZone />
                         </DndProvider>
                    </Col>
                    <Col
                         style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                         }}
                    >
                         {selectedLocation ? (
                              <h3>Tanks Assigned to {selectedLocation?.name}</h3>
                         ) : (
                              <h3>Select a Location</h3>
                         )}
                         <DndProvider backend={HTML5Backend}>
                              <AssignedTanksDropZone location={assignedTanks[0]} />
                         </DndProvider>
                    </Col>
               </Row>
          </Container>
     );
};
