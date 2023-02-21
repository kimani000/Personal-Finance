import { IIncome } from "./interfaces/income.interface";

export class  Income implements IIncome {
    incomeId!: number;
    incomeName: string;
    incomeAmount: number;

    constructor(incomeName: string, incomeAmount: number) {
        this.incomeName = incomeName;
        this.incomeAmount = incomeAmount;
    }
}