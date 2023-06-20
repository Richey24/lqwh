import axios from "axios";
import { Location, Role, User } from "./settings";
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
               const response = await axios.get(`${baseUrl}/api/Admin/GetLocations`);
               if (response.status === 200 || response.status === 201) {
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

export const useGetUsers = () => {
     return async (setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/getusers`);
               if (response.status === 200 || response.status === 201) {
                    setUsers(
                         response.data.map((user) => ({
                              name: user.username,
                              id: user.userId,
                              email: user.email,
                              role: user.role,
                         })),
                    );
               }
          } catch (err) {
               console.log(err);
          }
     };
};
