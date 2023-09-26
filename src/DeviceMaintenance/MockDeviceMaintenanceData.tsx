type DeviceMaintenanceItem = {
    branchName: string;
    customerName: string;
    serialNumber: string;
    phoneNumber: string;
    dateReceived: string;
    description: string;
    device: string;
    price: string;
    repairType: string;
    status: 'Pending' | 'Received' | 'Replaced' | 'Rejected' | 'Sent Back';
    statusDate?: string; // Date & time when the status was updated
    rejectReason?: string; // Reason for rejection
};

const mockMaintenanceData: DeviceMaintenanceItem[] = [
    {
        branchName: "Branch A",
        customerName: "John Doe",
        serialNumber: "SN12345",
        phoneNumber: "123-456-7890",
        dateReceived: "2023-09-01",
        device: "iPhone 12",
        price: "700",
        repairType: "Software Update",
        description: "Software malfunctioning after the last update.",
        status: "Pending"
    },
    {
        branchName: "Branch B",
        customerName: "Jane Smith",
        serialNumber: "SN12346",
        phoneNumber: "098-765-4321",
        dateReceived: "2023-08-31",
        device: "Samsung S21",
        price: "800",
        repairType: "Screen Replacement",
        description: "Screen cracked after dropping.",
        status: "Pending"
    },
    {
        branchName: "Branch C",
        customerName: "Alice Johnson",
        serialNumber: "SN12347",
        phoneNumber: "567-890-1234",
        dateReceived: "2023-09-02",
        device: "Pixel 6",
        price: "900",
        repairType: "Battery Replacement",
        description: "Battery draining fast.",
        status: "Pending"
    }
];

export default mockMaintenanceData;
