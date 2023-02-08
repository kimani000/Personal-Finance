export class  Income {
    incomeId!: number;
    incomeName: string;
    incomeAmount: number;

    constructor(incomeName: string, incomeAmount: number) {
        this.incomeName = incomeName;
        this.incomeAmount = incomeAmount;
    }
}