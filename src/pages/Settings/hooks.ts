import axios from "axios";
import { Location, Role, User } from "./settings";
import { toast } from "react-toastify";
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

export const useSaveLocations = () => {
     return async (locationName: string, onSuccess: () => void, onError: () => void) => {
          try {
               const response = await axios.post(
                    `${baseUrl}/api/Admin/addLocation/${locationName}`,
               );
               if (response.status === 200 || response.status === 201) {
                    onSuccess?.();
               }
          } catch (err) {
               console.log(err);
               onError();
               toast.error("Something Went Wrong");
          }
     };
};

export const useGetUsers = () => {
     return async (
          setUsers: React.Dispatch<React.SetStateAction<User[]>>,
          setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
     ) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Admin/getusers`);
               if (response.status === 200 || response.status === 201) {
                    console.log("now", response);
                    setUsers(
                         response.data.map((user) => ({
                              name: user.username,
                              id: user.userId,
                              email: user.email,
                              role: user.roleId,
                         })),
                    );
                    setLoading?.(false);
               }
          } catch (err) {
               console.log(err);
          }
     };
};

export const useSaveUserRoleLocation = () => {
     const getUsers = useGetUsers();
     return async (
          body: { userId: number; roleId: number; locationId: number },
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
          setUsers: React.Dispatch<React.SetStateAction<User[]>>,
     ) => {
          try {
               setLoading(true);
               const response = await axios.post(`${baseUrl}/api/Admin/UpdateRoleLocation`, body);
               if (response.data) {
                    toast.success("Role Assigned");
                    getUsers(setUsers, setLoading);
               } else {
                    setLoading(false);
               }
          } catch (err) {
               setLoading(false);
               console.log(err);
          }
     };
};
