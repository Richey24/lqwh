import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const batch = {
     id: "1",
     batchNumber: "B001",
     productName: "Product A",
     quantity: 100,
     productionDate: "2022-01-01",
};

const BatchView = () => {
     return (
          <Card
               className="mx-auto mt-3"
               style={{
                    maxWidth: "400px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                    transition: "0.3s",
                    backgroundColor: "#f5f5f5",
               }}
          >
               <CardBody>
                    <CardTitle tag="h5" className="mb-4">
                         Batch Details
                    </CardTitle>
                    <div className="d-flex justify-content-between mb-2">
                         <CardText className="font-weight-bold">Batch Number:</CardText>
                         <CardText>{batch.batchNumber}</CardText>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                         <CardText className="font-weight-bold">Product Name:</CardText>
                         <CardText>{batch.productName}</CardText>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                         <CardText className="font-weight-bold">Quantity:</CardText>
                         <CardText>{batch.quantity}</CardText>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                         <CardText className="font-weight-bold">Production Date:</CardText>
                         <CardText>{batch.productionDate}</CardText>
                    </div>
               </CardBody>
          </Card>
     );
};

export default BatchView;
