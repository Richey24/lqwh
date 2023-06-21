// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import React, { useContext, useEffect, useState } from "react";
import {
     Container,
     Nav,
     NavItem,
     NavLink,
     TabContent,
     TabPane,
     Row,
     Col,
     Button,
     FormGroup,
     Label,
     Input,
     Form,
} from "reactstrap";
import { TankUpdateForm } from "./UpdateTank/UpdateTank";
import { AppContext } from "../appState";
import { TankProps } from "../Dashboard/types";
import Tank from "../../components/waterTank/tank";
import { useSpring, animated } from "@react-spring/web";
import { useGetRoles } from "./hooks";
import { TanksLocation } from "./TanksLocation/TanksLocation";
import { RolesLocation } from "./RolesLocation/RolesLocation";

interface ProfileData {
     name: string;
     email: string;
     password: string;
     image: string | null;
}

interface TankData {
     tankName: string;
     tankSize: string;
}

interface IdleScreenSettings {
     enabled: boolean;
     idleTime: number;
}

export interface Role {
     id: number;
     name: string;
     // tanks: string[];
}

export interface Location {
     id: number;
     name: string;
}

export interface User {
     id: number | string;
     name: string;
     email: string;
     role: number | null;
}

export const Settings: React.FC = () => {
     const [activeTab, setActiveTab] = useState("profile");
     const [activeTank, setActiveTank] = useState<any>(null);
     const [springs, api] = useSpring(() => ({
          from: { y: 100, opacity: 0 },
     }));
     const [profile, setProfile] = useState<ProfileData>({
          name: "",
          email: "",
          password: "",
          image: null,
     });
     const [polling, setPolling] = useState<any>({
          time: 0,
     });
     const [idleScreenSettings, setIdleScreenSettings] = useState<IdleScreenSettings>({
          enabled: false,
          idleTime: 0,
     });
     const { tanksStore, setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);
     const [roles, setRoles] = useState<Role[]>([]);
     const [tab, setTab] = useState(0);

     const getRoles = useGetRoles();

     const toggleTab = (tabT: string) => {
          if (activeTab !== tabT) {
               setActiveTab(tabT);
          }
     };

     useEffect(() => {
          getRoles(setRoles);
     }, []);

     const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
          const { name, value, files } = e.target;
          if (name === "image" && files) {
               const reader = new FileReader();
               reader.onload = () => {
                    if (reader.readyState === 2) {
                         setProfile((prevState) => ({
                              ...prevState,
                              image: reader.result as string,
                         }));
                    }
               };
               reader.readAsDataURL(files[0]);
          } else {
               setProfile((prevState) => ({
                    ...prevState,
                    [name]: value,
               }));
          }
     };

     const handleIdleScreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value, checked } = e.target;
          if (name === "enabled") {
               setIdleScreenSettings((prevState) => ({
                    ...prevState,
                    enabled: checked,
               }));
          } else if (name === "idleTime") {
               setIdleScreenSettings((prevState) => ({
                    ...prevState,
                    idleTime: parseInt(value, 10),
               }));
          }
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Handle profile update logic here
          console.log("Updated profile:", profile);
          if (activeTab === "polling") {
               localStorage.setItem("polling", JSON.stringify(polling));
          }
     };

     const handlePollingChange = (e: React.ChangeEvent) => {
          setPolling({ time: (e.target as any).value });
     };

     const handleIdleScreenSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          // Handle idle screen settings update logic here
          // console.log("Updated idle screen settings:", idleScreenSettings);
     };

     // const handleRoleCreate = (e: React.FormEvent) => {
     //      e.preventDefault();
     //      // Generate a unique ID for the new role
     //      const newRoleId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;
     //      // Create a new role object
     //      const newRole: Role = {
     //           id: newRoleId,
     //           name: "",
     //      };
     //      // Add the new role to the state
     //      setRoles((prevState) => [...prevState, newRole]);
     //      setTab(1);
     // };

     const handleDisplay = () => {
          api.start({
               from: {
                    y: 100,
                    opacity: 0,
               },
               to: {
                    y: 0,
                    opacity: 1,
               },
          });
     };

     // console.log("selectedUser", selectedUser);
     return (
          <Container style={{ marginTop: 60 }}>
               <h1 className="mb-4">Settings</h1>
               <Nav tabs>
                    <NavItem>
                         <NavLink
                              className={activeTab === "profile" ? "active" : ""}
                              onClick={() => toggleTab("profile")}
                         >
                              Profile
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "tanks" ? "active" : ""}
                              onClick={() => toggleTab("tanks")}
                         >
                              Tanks Configuration
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "idleScreen" ? "active" : ""}
                              onClick={() => toggleTab("idleScreen")}
                         >
                              Idle Screen
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "polling" ? "active" : ""}
                              onClick={() => toggleTab("polling")}
                         >
                              Polling
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "roles" ? "active" : ""}
                              onClick={() => toggleTab("roles")}
                         >
                              Roles & Locations
                         </NavLink>
                    </NavItem>
                    <NavItem>
                         <NavLink
                              className={activeTab === "tanksLocations" ? "active" : ""}
                              onClick={() => toggleTab("tanksLocations")}
                         >
                              Tanks & Locations
                         </NavLink>
                    </NavItem>
               </Nav>
               <TabContent
                    activeTab={activeTab}
                    style={{
                         display: "flex",
                         alignItems: "flex-start",
                         justifyContent: "flex-start",
                         padding: "32px",
                         backgroundColor: "#fff",
                         marginTop: 10,
                         borderRadius: 8,
                    }}
               >
                    <TabPane
                         tabId="profile"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row className="d-flex align-items-start justify-content-start">
                              <Col sm="6" className="">
                                   <Form>
                                        <FormGroup>
                                             <Label for="image">Profile Image</Label>
                                             {profile.image && (
                                                  <div className="mt-2 mb-2">
                                                       <img
                                                            src={profile.image}
                                                            alt="Profile"
                                                            className="img-fluid"
                                                            style={{
                                                                 borderRadius: "50%",
                                                                 height: 100,
                                                                 width: 100,
                                                            }}
                                                       />
                                                  </div>
                                             )}
                                             <Input
                                                  type="file"
                                                  name="image"
                                                  id="image"
                                                  onChange={handleProfileChange}
                                                  accept="image/*"
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="name">Name</Label>
                                             <Input
                                                  type="text"
                                                  name="name"
                                                  id="name"
                                                  value={profile.name}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="email">Email</Label>
                                             <Input
                                                  type="email"
                                                  name="email"
                                                  id="email"
                                                  value={profile.email}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="password">Password</Label>
                                             <Input
                                                  type="password"
                                                  name="password"
                                                  id="password"
                                                  value={profile.password}
                                                  onChange={handleProfileChange}
                                                  required
                                             />
                                        </FormGroup>
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="tanks"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <TankUpdateForm
                                        tanks={tanksStore}
                                        setActiveTank={setActiveTank}
                                        handleDisplay={handleDisplay}
                                   />
                              </Col>
                              <Col
                                   sm="4"
                                   className="d-flex align-items-center justify-content-center w-50"
                              >
                                   <animated.div
                                        style={{
                                             width: "50%",
                                             ...springs,
                                        }}
                                   >
                                        {activeTank && (
                                             <Tank
                                                  {...(activeTank as TankProps)}
                                                  style={{ width: "100%", maxWidth: 350 }}
                                             />
                                        )}
                                   </animated.div>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="idleScreen"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <Form onSubmit={handleIdleScreenSubmit}>
                                        <FormGroup
                                             switch
                                             className="w-100 d-flex align-items-center justify-content-between m-0 p-0 py-1 pb-2"
                                        >
                                             <Label
                                                  style={{ marginLeft: 0 }}
                                                  className="ml-0"
                                                  for="enabled"
                                                  check
                                             >
                                                  Enable Idle Screen
                                             </Label>
                                             <Input
                                                  type="switch"
                                                  id="enabled"
                                                  name="enabled"
                                                  checked={idleScreenSettings.enabled}
                                                  onChange={handleIdleScreenChange}
                                             />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label for="idleTime">Idle Time (in minutes)</Label>
                                             <Input
                                                  type="number"
                                                  name="idleTime"
                                                  id="idleTime"
                                                  value={idleScreenSettings.idleTime}
                                                  onChange={handleIdleScreenChange}
                                                  min={1}
                                             />
                                        </FormGroup>
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="polling"
                         style={{
                              width: "100%",
                         }}
                    >
                         <Row>
                              <Col sm="6" className="">
                                   <Form onSubmit={handleIdleScreenSubmit}>
                                        <FormGroup>
                                             <Label for="idleTime">Polling Time (in minutes)</Label>
                                             <Input
                                                  type="number"
                                                  name="idleTime"
                                                  id="idleTime"
                                                  value={polling?.time || 1}
                                                  onChange={handlePollingChange}
                                                  min={1}
                                             />
                                        </FormGroup>
                                   </Form>
                              </Col>
                         </Row>
                    </TabPane>
                    <TabPane
                         tabId="roles"
                         style={{
                              width: "100%",
                         }}
                    >
                         <RolesLocation />
                    </TabPane>
                    <TabPane
                         tabId="tanksLocations"
                         style={{
                              width: "100%",
                         }}
                    >
                         <TanksLocation />
                    </TabPane>
               </TabContent>
               {activeTab !== "roles" && activeTab !== "tanksLocations" && (
                    <div
                         className="w-100 p-4 "
                         style={{
                              backgroundColor: "#fff",
                              marginTop: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              borderRadius: 8,
                         }}
                    >
                         <Button
                              color="primary"
                              style={{ marginLeft: 8 }}
                              className="ml-2"
                              // type="submit"
                              onClick={handleSubmit}
                         >
                              Save Settings
                         </Button>
                    </div>
               )}
          </Container>
     );
};
