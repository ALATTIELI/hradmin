import React, { useState } from "react";
import"./CompanyDetails.css"
import companyDetailsData from "./CompanyDetailsData";




export type CompanyDetail = {
    branchName: string;
    tradeLicense: string;
    tradeLicenseExpiry: string;
    commercialLicense: string;
    commercialLicenseExpiry: string;
    tenancyContract: string;
    tenancyContractIssueDate: string;
    tenancyContractEndDate: string;
    establishmentCard: string;
    establishmentCardExpiry: string;
    uaeCivilDefenseCertificateNum: string;
    uaeCivilDefenseCertificateExpiry: string;
    abuDhabiChamberNo: string;
    abuDhabiChamberExpiry: string;
    kioskLicense: string;
    kioskLicenseExpiry: string;
    taxRegistrationNumber: string;
    effectiveRegistrationDate: string;
    tdraCertificateNum: string;
    tdraCertificateExpiry: string;
    insurancePolicy: string;
    labours: number;
  };

  
function CompanyDetails() {
  const [data, setData] = useState({
    branchName: "",
    tradeLicense: "",
    tradeLicenseExpiry: "",
    commercialLicense: "",
    commercialLicenseExpiry: "",
    tenancyContract: "",
    tenancyContractIssueDate: "",
    tenancyContractEndDate: "",
    establishmentCard: "",
    establishmentCardExpiry: "",
    uaeCivilDefenseCertificateNum: "",
    uaeCivilDefenseCertificateExpiry: "",
    abuDhabiChamberNo: "",
    abuDhabiChamberExpiry: "",
    kioskLicense: "",
    kioskLicenseExpiry: "",
    taxRegistrationNumber: "",
    effectiveRegistrationDate: "",
    tdraCertificateNum: "",
    tdraCertificateExpiry: "",
    insurancePolicy: "",
    labours: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="company-details">
      <h2>Company Details</h2>
      <form>
        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          value={data.branchName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tradeLicense"
          placeholder="Trade License"
          value={data.tradeLicense}
          onChange={handleChange}
        />
        <label htmlFor="tradeLicenseExpiry">Trade License Expiry:</label>
        <input
          type="date"
          id="tradeLicenseExpiry"
          name="tradeLicenseExpiry"
          placeholder="Trade License Expiry"
          value={data.tradeLicenseExpiry}
          onChange={handleChange}
        />

        <input
          type="text"
          name="commercialLicense"
          placeholder="Commercial License"
          value={data.commercialLicense}
          onChange={handleChange}
        />
        <label htmlFor="commercialLicenseExpiry">
          Commercial License Expiry:
        </label>
        <input
          type="date"
          id="commercialLicenseExpiry"
          name="commercialLicenseExpiry"
          placeholder="Commercial License Expiry"
          value={data.commercialLicenseExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tenancyContract"
          placeholder="Tenancy Contract"
          value={data.tenancyContract}
          onChange={handleChange}
        />
        <label htmlFor="tenancyContractIssueDate">
          Tenancy Contract Issue Date:
        </label>
        <input
          type="date"
          id="tenancyContractIssueDate"
          name="tenancyContractIssueDate"
          placeholder="Tenancy Contract Issue Date"
          value={data.tenancyContractIssueDate}
          onChange={handleChange}
        />
        <label htmlFor="tenancyContractEndDate">
          Tenancy Contract End Date:
        </label>
        <input
          type="date"
          id="tenancyContractEndDate"
          name="tenancyContractEndDate"
          placeholder="Tenancy Contract End Date"
          value={data.tenancyContractEndDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="establishmentCard"
          placeholder="Establishment Card"
          value={data.establishmentCard}
          onChange={handleChange}
        />
        <label htmlFor="establishmentCardExpiry">
          Establishment Card Expiry:
        </label>
        <input
          type="date"
          id="establishmentCardExpiry"
          name="establishmentCardExpiry"
          placeholder="Establishment Card Expiry"
          value={data.establishmentCardExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="uaeCivilDefenseCertificateNum"
          placeholder="UAE Civil Defense Certificate No."
          value={data.uaeCivilDefenseCertificateNum}
          onChange={handleChange}
        />
        <label htmlFor="uaeCivilDefenseCertificateExpiry">
          UAE Civil Defense Certificate Expiry:
        </label>
        <input
          type="date"
          id="uaeCivilDefenseCertificateExpiry"
          name="uaeCivilDefenseCertificateExpiry"
          placeholder="UAE Civil Defense Certificate Expiry"
          value={data.uaeCivilDefenseCertificateExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="abuDhabiChamberNo"
          placeholder="Abu Dhabi Chamber No."
          value={data.abuDhabiChamberNo}
          onChange={handleChange}
        />
        <label htmlFor="abuDhabiChamberExpiry">Abu Dhabi Chamber Expiry:</label>
        <input
          type="date"
          id="abuDhabiChamberExpiry"
          name="abuDhabiChamberExpiry"
          placeholder="Abu Dhabi Chamber Expiry"
          value={data.abuDhabiChamberExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="kioskLicense"
          placeholder="Kiosk License"
          value={data.kioskLicense}
          onChange={handleChange}
        />
        <label htmlFor="kioskLicenseExpiry">Kiosk License Expiry:</label>
        <input
          type="date"
          id="kioskLicenseExpiry"
          name="kioskLicenseExpiry"
          placeholder="Kiosk License Expiry"
          value={data.kioskLicenseExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="taxRegistrationNumber"
          placeholder="Tax Registration Number"
          value={data.taxRegistrationNumber}
          onChange={handleChange}
        />
        <label htmlFor="effectiveRegistrationDate">
          Effective Registration Date:
        </label>
        <input
          type="date"
          id="effectiveRegistrationDate"
          name="effectiveRegistrationDate"
          placeholder="Effective Registration Date"
          value={data.effectiveRegistrationDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tdraCertificateNum"
          placeholder="TDRA Certificate No."
          value={data.tdraCertificateNum}
          onChange={handleChange}
        />
        <label htmlFor="tdraCertificateExpiry">TDRA Certificate Expiry:</label>
        <input
          type="date"
          id="tdraCertificateExpiry"
          name="tdraCertificateExpiry"
          placeholder="TDRA Certificate Expiry"
          value={data.tdraCertificateExpiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="insurancePolicy"
          placeholder="Insurance Policy"
          value={data.insurancePolicy}
          onChange={handleChange}
        />
        <input
          type="number"
          name="labours"
          placeholder="Number of Labours"
          value={data.labours}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
