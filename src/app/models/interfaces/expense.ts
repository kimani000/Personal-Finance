import { PaymentType } from "../enums/payment-type";
import { ExpenseCategory } from "../enums/expense-category";

export interface IExpense {
    id: number;
    location: string;
    amount: number;
    expenseCategory?: ExpenseCategory;
    paymentType?: PaymentType;
    date: Date
}
