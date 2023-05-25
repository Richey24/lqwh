import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
export const Lockscreen = () => {
    return (
       <>
         <div className="auth-container d-flex h-100">
            <div className="container mx-auto align-self-center">
                <div className="row">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        
                                        <div className="media mb-4">
                                            
                                            <div className="avatar avatar-lg me-3">
                                                <img alt="avatar" src="../src/assets/img/profile-7.jpeg" className="rounded-circle" />
                                            </div>

                                            <div className="media-body align-self-center">

                                                <h3 className="mb-0">Shaun Park</h3>
                                                <p className="mb-0">Enter your password to unlock your ID</p>

                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <label className="form-label">Password</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-4">
                                            < Link to="/" className="btn btn-secondary w-100">UNLOCK</Link>
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