import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useGetMe = () => {
     return async (
          setUser: React.Dispatch<React.SetStateAction<any>>,
          setLoading: React.Dispatch<React.SetStateAction<boolean>>,
     ) => {
          try {
               setLoading(true);
               const response = await axios.get(`${baseUrl}/api/Login/verify/me`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
               });
               if (response.status === 200 || response.status === 201) {
                    setUser(response.data);
               }
               setTimeout(() => setLoading(false), 900);
          } catch (err) {
               toast.error("Something Went Wrong, Pls Try to Relogin");
               localStorage.removeItem("token");
               setLoading(false);
               location.pathname = "/";
               console.log(err);
          }
     };
};
