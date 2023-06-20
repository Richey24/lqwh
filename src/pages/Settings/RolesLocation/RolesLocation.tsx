/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-check
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
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetLocations, useGetRoles, useGetUsers } from "../hooks";
import { toast } from "react-toastify";
import { Role, User } from "../settings";

interface Tank {
     id: number;
     name: string;
     locationId: number;
     users: number[];
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

export const RolesLocation: React.FC = () => {
     const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
     const [locations, setLocations] = useState<Location[]>([]);
     const [tanks, setTanks] = useState<Tank[]>([
          { id: 1, name: "Tank 1", locationId: 1, users: [] },
          { id: 2, name: "Tank 2", locationId: 2, users: [] },
          { id: 3, name: "Tank 3", locationId: 1, users: [] },
          // Add more tanks as needed
     ]);
     const getLocations = useGetLocations();
     const [assignedTanks, setAssignedTanks] = useState<Location[]>(locations);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [dropType, setDropType] = useState<{ type: string | null; tank: Tank | null }>({
          type: "",
          tank: null,
     });
     const [selectedUser, setSelectedUser] = useState<null | User>(null);
     const [users, setUsers] = useState<User[]>([]);
     const [selectedRole, setSelectedRole] = useState<null | Role>();
     const [roles, setRoles] = useState<Role[]>([]);

     const getUsers = useGetUsers();
     const getRoles = useGetRoles();

     useEffect(() => {
          getLocations(setLocations);
          getUsers(setUsers);
          getRoles(setRoles);
     }, []);

     console.log(tanks);
     const AssignedTanksDropZone: React.FC<{ location: Location }> = ({ location }) => {
          //@ts-ignore
          const [{ isOver }, drop] = useDrop<any>(
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
                    }}
               >
                    {tanks
                         // .filter((tank) => tank.locationId === selectedLocation?.id)
                         .filter((tank) => {
                              if (tank.users.some((userId) => userId === selectedUser?.id)) {
                                   return tank;
                              }
                         })
                         .map((tank) => (
                              <AssignedTank key={tank.id} tank={tank} />
                         ))}
               </div>
          );
     };

     const AssignedTank: React.FC<AssignedTankProps> = ({ tank }) => {
          //@ts-ignore
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
                         <CardBody>{tank.name}</CardBody>
                    </Card>
               </div>
          );
     };

     const UnassignedTanksDropZone: React.FC = () => {
          //@ts-ignore
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
                    }}
               >
                    {tanks
                         .filter((tank) => tank.locationId === selectedLocation?.id)
                         .filter((tank) => {
                              if (!tank.users.some((userId) => userId === selectedUser?.id)) {
                                   return tank;
                              }
                         })
                         .map((tank) => (
                              <UnassignedTank key={tank.id} tank={tank} />
                         ))}
               </div>
          );
     };

     const UnassignedTank: React.FC<UnassignedTankProps> = ({ tank }) => {
          //@ts-ignore
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
                         <CardBody>{tank.name}</CardBody>
                    </Card>
               </div>
          );
     };

     const handleConfirm = () => {
          // Handle confirmed drop action here
          setIsModalOpen(false);
          // console.log("drop", dropType);
          if (dropType.type === "unassign") {
               setTanks((preTanks) => {
                    return preTanks.map((tank) => {
                         if (tank.id === dropType.tank?.id) {
                              return {
                                   ...tank,
                              };
                         } else {
                              return tank;
                         }
                    });
               });
          } else if (dropType.type === "assign") {
               //@ts-ignore
               setTanks((preTanks) => {
                    return preTanks.map((tank) => {
                         if (tank.id === dropType.tank?.id) {
                              return {
                                   ...tank,
                                   users: [...new Set([...tank.users, selectedUser?.id])],
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

     const handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value: userId } = e.target;

          if (users.find((user) => user.id === +userId))
               setSelectedUser(users.find((user) => user.id === +userId) as User);
     };

     const handleAssignRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target;
          const selectedRoleL = roles.find((role) => role.id === parseInt(value));
          if (selectedRoleL) setSelectedRole(selectedRoleL);
     };

     const handleSaveRole = () => {
          if (selectedRole) {
               setSelectedUser((user) => ({ ...user, role: selectedRole?.id || 1 } as User));
               setUsers((usersT) => {
                    return usersT.map((user) => {
                         if (selectedUser && user.id === selectedUser.id) {
                              return { ...user, role: selectedRole.id };
                         }
                         return user;
                    });
               });
          } else {
               toast.warn("Pls, Select a Role");
          }
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

               <Row>
                    <Col>
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
                         </div>
                         {selectedLocation && (
                              <DndProvider backend={HTML5Backend}>
                                   <UnassignedTanksDropZone />
                              </DndProvider>
                         )}
                    </Col>
                    <Col>
                         <div className="mb-2 pb-2 d-flex align-items-end justify-content-end flex-column gap-2 w-100">
                              <Input
                                   type="select"
                                   value={selectedUser ? selectedUser.id : ""}
                                   onChange={(e) => handleChangeUser(e as any)}
                              >
                                   <option value="">-- Select User --</option>
                                   {users &&
                                        users?.map((user) => (
                                             <option key={user.id} value={user.id}>
                                                  {user.name}
                                             </option>
                                        ))}
                              </Input>

                              {selectedUser && (selectedUser?.role === 0 || !selectedUser?.role) ? (
                                   <>
                                        <div className="w-75 d-flex align-items-end justify-content-end flex-column gap-2">
                                             <Input
                                                  type="select"
                                                  value={selectedRole ? selectedRole.id : ""}
                                                  onChange={(e) => handleAssignRole(e as any)}
                                             >
                                                  <option value="">-- Select Role --</option>
                                                  {roles.map((role: any) => (
                                                       <option key={role.id} value={role.id}>
                                                            {role.name}
                                                       </option>
                                                  ))}
                                             </Input>
                                             <Button color="primary" onClick={handleSaveRole}>
                                                  Assign Role
                                             </Button>
                                        </div>
                                   </>
                              ) : (
                                   selectedUser &&
                                   (selectedUser.role || selectedUser.role !== 0) && (
                                        <Button color="primary">Change Role</Button>
                                   )
                              )}
                         </div>
                         {selectedUser && (selectedUser?.role !== 0 || selectedUser?.role) && (
                              <DndProvider backend={HTML5Backend}>
                                   <AssignedTanksDropZone location={assignedTanks[0]} />
                              </DndProvider>
                         )}
                    </Col>
               </Row>
          </Container>
     );
};