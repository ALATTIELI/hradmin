export type UserRequest = {
  id: number;
  branch: string;
  name: string;
  type: string;
  details: string;
  status: "pending" | "approved" | "rejected";
};

const mockRequests: UserRequest[] = [
  {
    id: 1,
    name:"adel",
    branch: "Branch A",
    type: "sick leave",
    details: "Feeling unwell and need a day off.",
    status: "pending",
  },
  {
    id: 2,
    name:"mohammed",
    branch: "Branch B",
    type: "sick leave",
    details: "Caught a cold, need two days off.",
    status: "approved",
  },
  {
    id: 3,
    name:"jafar",
    branch: "Branch A",
    type: "vacation",
    details: "Going on a family trip for a week.",
    status: "pending",
  },
  {
    id: 4,
    name:"adnan",
    branch: "Branch C",
    type: "unpaid leave",
    details: "Need a month off for personal reasons.",
    status: "rejected",
  },
];

export default mockRequests;
