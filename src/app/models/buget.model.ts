import { ExpenseCategory } from "../enums/expense-category";
import { Expense } from "./expense.model";
import { IBudget } from "./interfaces/buget.interface";

export class Budget implements IBudget {
    id!: number;
    name: string;
    projectedCost: number;
    actualCost: number;
    difference: number;
    category?: ExpenseCategory;

    constructor(name: string, projectedCost: number, actualCost: number, category?: ExpenseCategory) {
        this.name = name;
        this.projectedCost = projectedCost;
        this.actualCost = actualCost;
        this.difference = this.projectedCost - this.actualCost;
        
        if(category) this.category = category;
    }

    calcualteDifference(): void {
        this.difference = this.projectedCost - this.actualCost;
    }

    static createNewBudget(): Budget{
        return new Budget('', 0, 0);
    }
}