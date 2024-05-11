import React from "react";
import Layout from "../components/Layout/Layout";

import "./Company.scss";
import QrCode from "../components/QRCODE/QrCode";

const Company = () => {
  // Dummy company details
  const companyDetails = {
    name: "SNEKHEAD",
    address: "123 Main Street, Cityville, ABC",
    industry: "Lifestyle",
    revenue: "$ 15000000",
    employees: "500+",
    founded: "2024",
  };

  return (
    <Layout>
      <div className="company-details">
        <div>
          <h1>Company Details</h1>
          <div className="details">
            <h2>{companyDetails.name}</h2>
            <p>
              <strong>Main office :</strong> {companyDetails.address}
            </p>
            <p>
              <strong>Industry :</strong> {companyDetails.industry}
            </p>
            <p>
              <strong>Revenue :</strong> {companyDetails.revenue}
            </p>
            <p>
              <strong>Number of Employees :</strong> {companyDetails.employees}
            </p>
            <p>
              <strong>Founded :</strong> {companyDetails.founded}
            </p>
          </div>
        </div>

        <div className="authenticity">
          <div>
            <QrCode />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Company;
