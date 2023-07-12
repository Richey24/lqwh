import { faker } from "@faker-js/faker";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../appState";
import { toast } from "react-toastify";
import { TankProps } from "../Dashboard/types";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetHistory = () => {
     const { setTanksStore } = useContext<{
          tanksStore: TankProps[] | null;
          setTanksStore: any;
     }>(AppContext);

     return async () => {
          try {
               const headers = {
                    params: {
                         startdate: "1990-07-12T15:24:51.507Z",
                         enddate: "2023-07-12T15:24:51.507Z",
                    },
               };
               const response = await axios.get(`${baseUrl}/api/tank/gettankhistory`, headers);
               if (response.status === 200) {
                    console.log("hi");
               }
               // return
          } catch (err) {
               console.log(err);
          }
     };
};
