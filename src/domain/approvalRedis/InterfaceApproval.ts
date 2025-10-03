export interface Approval {
    userId: string;
    status: "pending" | "approved" | "auto-approved";
    attempts: number;
}