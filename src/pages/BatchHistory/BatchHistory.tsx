import React, { useEffect, useState } from "react";
import { Container, Table, FormGroup, Label, Input } from "reactstrap";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { random } from "lodash";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import DateRangePicker from "./DateRange/DateRange";

const generateCoolColor = (level: number, temperature: number, opacity: number): string => {
     const levelRange = [0, 100]; // Example level range
     const temperatureRange = [-10, 50]; // Example temperature range

     const mappedLevel = (level - levelRange[0]) / (levelRange[1] - levelRange[0]);
     const mappedTemperature =
          (temperature - temperatureRange[0]) / (temperatureRange[1] - temperatureRange[0]);

     const red = Math.round(mappedTemperature * 255);
     const green = Math.round(mappedLevel * 255);
     const blue = random(100, 200);

     return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

interface TankHistory {
     batchId: number;
     date: string;
     level: number;
     temperature: number;
}

const BatchHistory: React.FC = () => {
     const [selectedBatches, setSelectedBatches] = useState<number[]>([]);
     const [tankHistory, setTankHistory] = useState<TankHistory[]>([]);
     const [active, setActive] = useState("weight");

     useEffect(() => {
          const generateDummyData = () => {
               const currentDate = new Date();

               const dummyData: TankHistory[] = [];

               for (let i = 1; i <= 15; i++) {
                    for (let j = 0; j < 7; j++) {
                         const date = new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDate.getDate() - j,
                         )
                              .toISOString()
                              .split("T")[0];

                         const level = Math.floor(Math.random() * 100) + 1;
                         const temperature = Math.floor(Math.random() * 50) + 1;

                         dummyData.push({
                              batchId: i,
                              date: date,
                              level: level,
                              temperature: temperature,
                         });
                    }
               }

               setTankHistory(dummyData);
          };

          generateDummyData();
     }, []);

     const toggleBatchSelection = (batchId: number) => {
          setSelectedBatches((prevSelectedBatches) => {
               if (prevSelectedBatches.includes(batchId)) {
                    return prevSelectedBatches.filter((id) => id !== batchId);
               } else {
                    return [...prevSelectedBatches, batchId];
               }
          });
     };

     const filteredHistory = tankHistory.filter((history) =>
          selectedBatches.includes(history.batchId),
     );

     const chartDatasets = selectedBatches.map((batchId) => {
          const batchHistory = filteredHistory.filter((history) => history.batchId === batchId);
          const backgroundColor = generateCoolColor(
               batchHistory[0].level,
               batchHistory[0].temperature,
               0.5,
          ); // Set opacity to 0.5
          const borderColor = generateCoolColor(
               batchHistory[0].level,
               batchHistory[0].temperature,
               1,
          );

          return {
               label: `Batch ${batchId}`,
               data: batchHistory.map((history) => history.level),
               backgroundColor,
               borderColor,
               borderWidth: 1,
          };
     });

     const chartData = {
          labels: [...new Set(filteredHistory.map((history) => history.date))]
               .slice(0, 30)
               .map((date) => date),
          datasets: chartDatasets,
     };

     const graphOptions = {
          scales: {
               x: {
                    title: {
                         display: true,
                         text: "Date / Time",
                    },
               },
               y: {
                    title: {
                         display: true,
                         text: "Weight (kg)",
                    },
                    beginAtZero: true,
               },
          },
          plugins: {
               legend: {
                    display: true,
               },
          },
          maintainAspectRatio: false,
     };

     const graphTemperatureOptions = {
          scales: {
               x: {
                    title: {
                         display: true,
                         text: "Date / Time",
                    },
               },
               y: {
                    title: {
                         display: true,
                         text: "Temperature (kg)",
                    },
                    beginAtZero: true,
               },
          },
          plugins: {
               legend: {
                    display: true,
               },
          },
          maintainAspectRatio: false,
     };

     return (
          <Container style={{ marginTop: 70 }}>
               <h1>Tank History</h1>
               <div
                    style={{
                         display: "flex",
                         alignItems: "flex-end",
                         justifyContent: "flex-end",
                         flexDirection: "column",
                         width: "100%",
                    }}
               >
                    <DateRangePicker />
                    <div
                         style={{
                              marginTop: "20px",
                              borderRadius: 8,
                              marginBottom: 50,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "2px solid #ebebeb",
                              width: "100%",
                              background: "#fff",
                         }}
                    >
                         {active === "weight" && (
                              <div
                                   style={{
                                        marginTop: "20px",

                                        padding: 16,
                                        borderRadius: 8,
                                        marginBottom: 16,
                                        width: "100%",
                                   }}
                              >
                                   <Line data={chartData} options={graphOptions} height={400} />
                              </div>
                         )}{" "}
                         {active === "temp" && (
                              <div
                                   style={{
                                        marginTop: "20px",

                                        padding: 16,
                                        borderRadius: 8,
                                        marginBottom: 16,

                                        width: "100%",
                                   }}
                              >
                                   {" "}
                                   <Line
                                        data={chartData}
                                        options={graphTemperatureOptions}
                                        height={400}
                                        //   width={"100%"}
                                   />
                              </div>
                         )}
                         <ToggleButton active={active} setActive={setActive} />
                    </div>
               </div>
               <div
                    style={{
                         display: "flex",
                         alignItems: "flex-start",
                         justifyContent: "flex-start",
                         gap: 30,
                    }}
               >
                    <FormGroup
                         style={{
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                              maxWidth: 500,
                              border: "1px solid rgb(162 158 158)",
                              padding: 8,
                              borderRadius: 8,
                              background: "#fff",
                         }}
                    >
                         <p style={{ width: "100%" }}>Storage</p>
                         {[...new Set(tankHistory.map((histoy) => histoy.batchId))]
                              .filter((t, idx) => idx < 8)
                              .map((batchId, index) => (
                                   <Label
                                        key={index}
                                        style={{
                                             border: "1px solid rgb(162 158 158)",
                                             padding: 2,
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             gap: 4,
                                             borderRadius: 8,
                                        }}
                                   >
                                        <Input
                                             type="checkbox"
                                             checked={selectedBatches.includes(batchId)}
                                             onChange={() => toggleBatchSelection(batchId)}
                                        />{" "}
                                        <span>Batch {batchId}</span>
                                   </Label>
                              ))}
                    </FormGroup>
                    <FormGroup
                         style={{
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                              border: "1px solid rgb(162 158 158)",
                              padding: 8,
                              borderRadius: 8,
                              background: "#fff",
                         }}
                    >
                         <p style={{ width: "100%" }}>PreMixing</p>
                         {[...new Set(tankHistory.map((histoy) => histoy.batchId))]
                              .filter((t, idx) => idx > 8 && idx < 13)
                              .map((batchId, index) => (
                                   <Label
                                        key={index}
                                        style={{
                                             border: "1px solid rgb(162 158 158)",
                                             padding: 2,
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             gap: 4,
                                             borderRadius: 8,
                                        }}
                                   >
                                        <Input
                                             type="checkbox"
                                             checked={selectedBatches.includes(batchId)}
                                             onChange={() => toggleBatchSelection(batchId)}
                                        />{" "}
                                        <span>T {batchId}</span>
                                   </Label>
                              ))}
                    </FormGroup>
                    <FormGroup
                         style={{
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                              border: "1px solid rgb(162 158 158)",
                              padding: 8,
                              borderRadius: 8,
                              background: "#fff",
                         }}
                    >
                         <p style={{ width: "100%" }}>Mixing</p>
                         {[...new Set(tankHistory.map((histoy) => histoy.batchId))]
                              .filter((t, idx) => idx > 12 && idx < 15)
                              .map((batchId, index) => (
                                   <Label
                                        key={index}
                                        style={{
                                             border: "1px solid rgb(162 158 158)",
                                             padding: 2,
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             gap: 4,
                                             borderRadius: 8,
                                        }}
                                   >
                                        <Input
                                             type="checkbox"
                                             checked={selectedBatches.includes(batchId)}
                                             onChange={() => toggleBatchSelection(batchId)}
                                        />{" "}
                                        <span>Batch {batchId}</span>
                                   </Label>
                              ))}
                    </FormGroup>
               </div>
          </Container>
     );
};

export default BatchHistory;
