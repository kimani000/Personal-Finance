import { ExpenseCategory } from "../enums/expense-category";

export class Budget {
    id!: number;
    name: string;
    projectedCost: number;
    actualCost: number;
    difference?: number;
    category?: ExpenseCategory;

    constructor(name: string, projectedCost: number, actualCost: number) {
        this.name = name;
        this.projectedCost = projectedCost;
        this.actualCost = actualCost;
    }
}