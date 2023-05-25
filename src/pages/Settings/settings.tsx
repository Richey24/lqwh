import {tanks } from "../Dashboard/data.ts";

export const Settings = () => {
    return <>
      <div className="main-container " id="container">
         <div id="content" className="main-content">
            <div className="row">
                <div className="col-md-6">
                    <div className="table-responsive">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Dummy Data</h5>
                                <table className="table
                                ">
                                <thead>
                                    <tr>
                                        <th  scope="col">Title/Name</th>
                                        <th  scope="col">Fill Max Value</th>
                                        <th  scope="col">Type</th>
                                        <th  scope="col">Threshold</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tanks
                                        .filter((tank) => tank?.type === "normal")
                                        .map((tankProps, idx) => (
                                            <tr>
                                                <td>{tankProps.title}</td>
                                                <td>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                    <span className="table-inner-text">{tankProps.fillMaxValue}</span>
                                                </td>
                                                <td className="text-center">{tankProps.type}</td>
                                                <td className="text-center">{tankProps.threshold}</td>
                                                <td><button className="btn btn-sm btn-primary">Update Tank</button></td>
                                            </tr>
                                        ))}
                                    
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="table-responsive">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Dummy Data - Mix Tanks</h5>
                                <table className="table
                                ">
                                <thead>
                                    <tr>
                                        <th  scope="col">Title/Name</th>
                                        <th  scope="col">Fill Max Value</th>
                                        <th  scope="col">Type</th>
                                        <th  scope="col">Minimum Temperature</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tanks
                                        .filter((tank) => tank?.type === "mix")
                                        .map((tankProps, idx) => (
                                            <tr>
                                                <td>{tankProps.title}</td>
                                                <td>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                    <span className="table-inner-text">{tankProps.fillMaxValue}</span>
                                                </td>
                                                <td className="text-center">{tankProps.type}</td>
                                                <td className="text-center">{tankProps.minimumTemperature}</td>
                                                <td><button className="btn btn-sm btn-primary">Update Tank</button></td>
                                            </tr>
                                        ))}
                                    
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
    </>
}