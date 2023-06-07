import { faker } from "@faker-js/faker";
import axios from "axios";
import { TankProps } from "./types";
import { useContext } from "react";
import { AppContext } from "../appState";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetTanks = () => {
     const { setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);

     return async () => {
          try {
               const response = await axios.get(`${baseUrl}/api/tank/gettanks`);
               console.log(response);
               if (response.status === 200) {
                    const tankKeys = Object.keys(response.data);
                    let tanks: TankProps[] = [];
                    tankKeys.forEach((key) => {
                         const names = key.split("_");
                         if (tanks.some((tank) => tank.number === +names[1])) {
                              const newTanks = tanks.map((tank) => {
                                   if (tank.number === +names[1]) {
                                        if (names[2] === "Batch") {
                                             return {
                                                  ...tank,
                                                  batchNumber: response.data[key],
                                             };
                                        } else if (names[2] === "Weight") {
                                             return {
                                                  ...tank,
                                                  fillValue: response.data[key],
                                             };
                                        } else if (names[2] === "Temp") {
                                             return {
                                                  ...tank,
                                                  temperature: response.data[key],
                                                  color: +names[1] === 809 ? "#DC3545" : "#038aff",
                                                  minimumTemperature: 10,
                                                  temperatureMsm: "celcius",
                                                  temperatureColor: "#DC3545",
                                                  type: +names[1] === 809 ? "HotWater" : "mix",
                                                  title: `T${names[1]}`,
                                             };
                                        }
                                   }

                                   return tank;
                              });

                              tanks = newTanks;
                         } else {
                              if (names[2] === "Batch") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `Line ${names[1]}`,
                                        fillValue: 0,
                                        type: "normal",
                                        number: +names[1],
                                        batchNumber: response.data[key],
                                   });
                              } else if (names[2] === "Weight") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `Line ${names[1]}`,
                                        fillValue: response.data[key],
                                        type: "normal",
                                        number: +names[1],
                                        batchNumber: 0,
                                   });
                              } else if (names[2] === "Temp") {
                                   tanks.push({
                                        color: "#038aff",
                                        fillMaxValue: 100,
                                        threshold: 6000,
                                        title: `T${names[1]}`,
                                        fillValue: 0,
                                        type: "mix",
                                        number: +names[1],
                                        batchNumber: 0,
                                        temperature: response.data[key],
                                        minimumTemperature: 10,
                                        temperatureMsm: "celcius",
                                        temperatureColor: "#DC3545",
                                   });
                              }
                         }
                    });
                    // .filter((tank) => tank !== undefined);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setTanksStore(tanks.filter((tank) => tank.title.split(" ")[1] !== "CIP"));
                    // console.log(response.data, tankKeys, tanks);
               }
               // return
          } catch (err) {
               console.log(err);
          }
     };
};
