import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetMe = () => {
     return async (setUser: React.Dispatch<React.SetStateAction<any>>) => {
          try {
               const response = await axios.get(`${baseUrl}/api/Login/verify/me`);
               if (response.status === 200 || response.status === 201) {
                    // console.log(response.data);
                    // setRoles(
                    //      response.data.map((role) => ({ name: role.roleName, id: role.roleId })),
                    // );
               }
          } catch (err) {
               console.log(err);
          }
     };
};
