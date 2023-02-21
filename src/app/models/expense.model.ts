import { PaymentType } from "../enums/payment-type";
import { ExpenseCategory } from "../enums/expense-category";
import { IExpense } from "./interfaces/expense.interface";

export class Expense implements IExpense {
    id!: number;
    location: string;
    amount: number;
    category?: ExpenseCategory;
    paymentType?: PaymentType;
    date: Date;

    constructor(location: string, amount: number, date: Date, category?:ExpenseCategory, paymentType?:PaymentType) {
        this.location = location;
        this.amount = amount;
        this.date = date;
    }
}
