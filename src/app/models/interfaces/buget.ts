import { ExpenseCategory } from "../enums/expense-category";

export interface IBudget {
    id: number;
    name: string;
    projectedCost: number;
    actualCost: number;
    difference?: number;
    category?: ExpenseCategory;
}