import React, { useState } from "react";
import "./CompanyDetails.css";

export type CompanyDetail = {
  tradeNameofbranch: string;
  tradeLicenseNo: string;
  tradeLicenseIssue: string;
  tradeLicenseExpiry: string;
  commercialLicense: string;
  commercialLicenseIssue: string;
  commercialLicenseExpiry: string;
  tenancyContract: string;
  tenancyContractIssueDate: string;
  tenancyContractEndDate: string;
  establishmentCard: string;
  establishmentCardIssue: string;
  establishmentCardExpiry: string;
  uaeCivilDefenseCertificateNum: string;
  uaeCivilDefenseCertificateIssue: string;
  uaeCivilDefenseCertificateExpiry: string;
  abuDhabiChamberNo: string;
  abuDhabiChamberIssue: string;
  abuDhabiChamberExpiry: string;
  kioskLicense: string;
  kioskLicenseIssue: string;
  kioskLicenseExpiry: string;
  taxRegistrationNumber: string;
  effectiveRegistrationDate: string;
  tdraCertificateNum: string;
  tdraCertificateIssue: string;
  tdraCertificateExpiry: string;
  insurancePolicy: string;
  insurancePolicyExpiry: string;
  insurancePolicyIssue: string;
  labours: number;
};

function CompanyDetails() {
  const [data, setData] = useState({
    tradeNameofbranch: "",
    tradeLicense: "",
    tradeLicenseIssue: "",
    tradeLicenseExpiry: "",
    commercialLicense: "",
    commercialLicenseIssue: "",
    commercialLicenseExpiry: "",
    tenancyContract: "",
    tenancyContractIssueDate: "",
    tenancyContractEndDate: "",
    establishmentCard: "",
    establishmentCardIssue: "",
    establishmentCardExpiry: "",
    uaeCivilDefenseCertificateNum: "",
    uaeCivilDefenseCertificateIssue: "",
    uaeCivilDefenseCertificateExpiry: "",
    abuDhabiChamberNo: "",
    abuDhabiChamberIssue: "",
    abuDhabiChamberExpiry: "",
    kioskLicense: "",
    kioskLicenseIssue: "",
    kioskLicenseExpiry: "",
    taxRegistrationNumber: "",
    effectiveRegistrationDate: "",
    tdraCertificateNum: "",
    tdraCertificateIssue: "",
    tdraCertificateExpiry: "",
    insurancePolicy: "",
    insurancePolicyIssue: "",
    insurancePolicyExpiry: "",
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
          placeholder="Trade name of branch"
          value={data.tradeNameofbranch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tradeLicense"
          placeholder="Trade License No"
          value={data.tradeLicense}
          onChange={handleChange}
        />
        <label htmlFor="tradeLicenseIssue">Trade License Issue:</label>
        <input
          type="date"
          id="tradeLicenseIssue"
          name="tradeLicenseIssue"
          placeholder="Trade License Issue"
          value={data.tradeLicenseIssue}
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
          placeholder="Commercial License No"
          value={data.commercialLicense}
          onChange={handleChange}
        />
        <label htmlFor="commercialLicenseIssue">
          Commercial License Issue:
        </label>
        <input
          type="date"
          id="commercialLicenseIssue"
          name="commercialLicenseIssue"
          placeholder="Commercial License Issue"
          value={data.commercialLicenseIssue}
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
        <label htmlFor="establishmentCardIssue">
          Establishment Card Issue:
        </label>
        <input
          type="date"
          id="establishmentCardIssue"
          name="establishmentCardIssue"
          placeholder="Establishment Card Issue"
          value={data.establishmentCardIssue}
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
        <label htmlFor="uaeCivilDefenseCertificateIssue">
          UAE Civil Defense Certificate Issue:
        </label>
        <input
          type="date"
          id="uaeCivilDefenseCertificateIssue"
          name="uaeCivilDefenseCertificateIssue"
          placeholder="UAE Civil Defense Certificate Issue"
          value={data.uaeCivilDefenseCertificateIssue}
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
        <label htmlFor="abuDhabiChamberIssue">Abu Dhabi Chamber Issue:</label>
        <input
          type="date"
          id="abuDhabiChamberIssue"
          name="abuDhabiChamberIssue"
          placeholder="Abu Dhabi Chamber Issue"
          value={data.abuDhabiChamberIssue}
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
        <label htmlFor="kioskLicenseIssue">Kiosk License Issue:</label>
        <input
          type="date"
          id="kioskLicenseIssue"
          name="kioskLicenseIssue"
          placeholder="Kiosk License Issue"
          value={data.kioskLicenseIssue}
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
        <label htmlFor="tdraCertificateIssue">TDRA Certificate Issue:</label>
        <input
          type="date"
          id="tdraCertificateIssue"
          name="tdraCertificateIssue"
          placeholder="TDRA Certificate Issue"
          value={data.tdraCertificateIssue}
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
        <label htmlFor="insurancePolicyIssue">Insurance Policy Issue:</label>
        <input
          type="date"
          name="insurancePolicyIssue"
          placeholder="Insurance Policy Issue"
          value={data.insurancePolicyIssue}
          onChange={handleChange}
        />
        <label htmlFor="insurancePolicyExpiry">Insurance Policy Expiry:</label>
        <input
          type="date"
          name="insurancePolicyExpiry"
          placeholder="Insurance Policy Expiry"
          value={data.insurancePolicyExpiry}
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

export default CompanyDetails;