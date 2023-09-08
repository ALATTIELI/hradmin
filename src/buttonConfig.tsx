export type ButtonConfiguration = {
    position: string;
    buttons: string[];
};

export const commonButtons = [ ];

export const positionButtons: ButtonConfiguration[] = [
    {
      position: "Software Engineer",
      buttons: ["Stock Order", "Warranty Items", "Borrow Items", "Device Maintenance"]
    },
    {
      position: "Product Manager",
      buttons: ["Reports", "Admin"]
    },
    // ... Add more configurations for other positions as needed
];

// export const allowed = positionButtons.map(buttonConfig => buttonConfig.position);

export default positionButtons; // if you meant to export positionButtons as default
