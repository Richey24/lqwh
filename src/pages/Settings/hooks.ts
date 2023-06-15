import axios from "axios";
import { Location, Role } from "./settings";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetRoles = () => {
     return async (setRoles: React.Dispatch<React.SetStateAction<Role[]>>) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/GetRoles`);
               if (response.status === 200 || response.status === 201) {
                    setRoles(
                         response.data.map((role) => ({ name: role.roleName, id: role.roleId })),
                    );
               }
          } catch (err) {
               console.log(err);
          }
     };
};

export const useGetLocations = () => {
     return async (setLocations: React.Dispatch<React.SetStateAction<Location[]>>) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/GetAlLocations`);
               if (response.status === 200 || response.status === 201) {
                    console.log("loca", response);
                    setLocations(
                         response.data.map((location) => ({
                              name: location.sitename,
                              id: location.locId,
                         })),
                    );
               }
          } catch (err) {
               console.log(err);
          }
     };
};
