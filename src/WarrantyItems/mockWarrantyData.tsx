type WarrantyItem = {
    branch: string;
    employeeName: string;
    invoiceNumber: string;
    phoneNumber: string;
    dateReceived: string;
    description: string;
    status: 'Pending' | 'Received' | 'Replaced' | 'Rejected' | 'Sent Back';
    statusDate?: string; // Date & time when the status was updated
    rejectReason?: string; // Reason for rejection
};

const mockWarrantyData: WarrantyItem[] = [
    {
        branch: "Branch A",
        employeeName: "John Doe",
        invoiceNumber: "INV12345",
        phoneNumber: "123-456-7890",
        dateReceived: "2023-09-01",
        description: "Item not turning on.",
        status: "Pending"
    },
    {
        branch: "Branch B",
        employeeName: "Jane Smith",
        invoiceNumber: "INV12346",
        phoneNumber: "098-765-4321",
        dateReceived: "2023-08-31",
        description: "Screen flickering issue.",
        status: "Pending"
    },
    {
        branch: "Branch C",
        employeeName: "Alice Johnson",
        invoiceNumber: "INV12347",
        phoneNumber: "567-890-1234",
        dateReceived: "2023-09-02",
        description: "Audio not working.",
        status: "Pending"
    }
];

export default mockWarrantyData;
