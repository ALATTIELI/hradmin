import { CompanyDetail } from './CompanyDetails'; // Adjust this import path


const companyDetailsData: { companies: CompanyDetail[] } = {
    companies: [
      {
        branchName: "Headquarters",
        tradeLicense: "ABC123",
        tradeLicenseExpiry: "2025-01-15",
        commercialLicense: "DEF456",
        commercialLicenseExpiry: "2025-02-20",
        tenancyContract: "GHI789",
        tenancyContractIssueDate: "2022-01-01",
        tenancyContractEndDate: "2023-01-01",
        establishmentCard: "JKL012",
        establishmentCardExpiry: "2025-03-25",
        uaeCivilDefenseCertificateNum: "MNO345",
        uaeCivilDefenseCertificateExpiry: "2025-04-10",
        abuDhabiChamberNo: "PQR678",
        abuDhabiChamberExpiry: "2025-05-15",
        kioskLicense: "STU901",
        kioskLicenseExpiry: "2025-06-05",
        taxRegistrationNumber: "XYZ234",
        effectiveRegistrationDate: "2020-01-01",
        tdraCertificateNum: "VWX567",
        tdraCertificateExpiry: "2025-07-20",
        insurancePolicy: "Policy123",
        labours: 50
      },
      // Other company details can be added here
    ],
  };
  
  export default companyDetailsData;
  