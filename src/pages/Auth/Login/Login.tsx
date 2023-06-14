import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";

interface FormState {
     email: string;
     password: string;
     emailError: string;
     passwordError: string;
     loading: boolean;
     [key: string]: string | boolean; // Index signature
}

export const Login = () => {
     const navigate = useNavigate();
     const login = useLogin();

     // State object containing email and password
     const [formState, setFormState] = useState<FormState>({
          email: "",
          password: "",
          emailError: "",
          passwordError: "",
          loading: false,
     });

     // Regular expression for email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     // Destructure values from formState for easier access
     const { email, password, emailError, passwordError, loading } = formState;

     const handleSubmit = async (e: FormEvent) => {
          e.preventDefault();

          // Perform validation
          if (!email) {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "Email is required",
                    formError: "",
               }));
          } else if (!emailRegex.test(email)) {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "Invalid email format",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    emailError: "",
                    formError: "",
               }));
          }

          if (!password) {
               setFormState((prevState) => ({
                    ...prevState,
                    passwordError: "Password is required",
                    formError: "",
               }));
          } else {
               setFormState((prevState) => ({
                    ...prevState,
                    passwordError: "",
                    formError: "",
               }));
          }

          // If all fields are valid, proceed with login logic
          if (email && password) {
               setFormState((prevState) => ({
                    ...prevState,
                    loading: true,
               }));

               console.log("Logging in...");
               await login(
                    { email, password },
                    () => {
                         setFormState((prevState) => ({
                              ...prevState,
                              loading: false,
                         }));
                         navigate("/");
                    },
                    (formError) => {
                         setFormState((prevState) => ({
                              ...prevState,
                              loading: false,
                              formError,
                         }));
                         toast.error(formError);
                    },
               );
          }
     };

     const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormState((prevState) => ({
               ...prevState,
               [name]: value,
               formError: "",
          }));
     };

     return (
          <>
               <div className="auth-container d-flex">
                    <div className="container mx-auto align-self-center">
                         <div className="row">
                              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                                   <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                             <div className="row">
                                                  <div className="col-md-12 mb-3">
                                                       <h2>Sign In</h2>
                                                       <p>Enter your email and password to login</p>
                                                  </div>
                                                  <div className="col-md-12">
                                                       <div className="mb-3">
                                                            <label className="form-label">
                                                                 Email
                                                            </label>
                                                            <input
                                                                 type="email"
                                                                 className="form-control"
                                                                 name="email"
                                                                 value={
                                                                      formState["email"] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                       </div>
                                                       <div
                                                            style={{
                                                                 color: "red",
                                                                 width: "100%",
                                                            }}
                                                       >
                                                            {formState?.emailError}
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="mb-4">
                                                            <label className="form-label">
                                                                 Password
                                                            </label>
                                                            <input
                                                                 type="password"
                                                                 className="form-control"
                                                                 name="password"
                                                                 value={
                                                                      formState[
                                                                           "password"
                                                                      ] as string
                                                                 }
                                                                 onChange={handleInputChange}
                                                            />
                                                            <div
                                                                 style={{
                                                                      color: "red",
                                                                      width: "100%",
                                                                 }}
                                                            >
                                                                 {formState?.passwordError}
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="mb-3">
                                                            <div className="form-check form-check-primary form-check-inline me-3">
                                                                 {" "}
                                                                 <label
                                                                      className="form-check-label me-3"
                                                                      style={{
                                                                           marginLeft: -18,
                                                                           fontSize: 14,
                                                                      }}
                                                                 >
                                                                      Dont have Account ?
                                                                      <a
                                                                           style={{
                                                                                color: "blue",
                                                                                marginLeft: 4,
                                                                                cursor: "pointer",
                                                                           }}
                                                                           href="/auth/register"
                                                                      >
                                                                           Sign up
                                                                      </a>
                                                                 </label>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="col-12">
                                                       <div className="mb-3">
                                                            <div className="form-check form-check-primary form-check-inline">
                                                                 <input
                                                                      className="form-check-input me-3"
                                                                      type="checkbox"
                                                                      id="form-check-default"
                                                                 />
                                                                 <label
                                                                      className="form-check-label"
                                                                      htmlFor="form-check-default"
                                                                 >
                                                                      Remember me
                                                                 </label>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div className="col-12">
                                                       <div className="mb-4">
                                                            <button
                                                                 onClick={handleSubmit}
                                                                 className="btn btn-secondary w-100"
                                                            >
                                                                 {loading ? <Spinner /> : "SIGN IN"}
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};
