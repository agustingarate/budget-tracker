interface IPlan {
  id?: string;
  totalRequired: number;
  percentage: number;
  category: string;
  deadline: Date;
  title: string;
}

export class Plan implements IPlan {
  constructor(
    public title: string,
    public totalRequired: number,
    public percentage: number,
    public category: string,
    public deadline: Date,
    public id?: string,
  ) {}
}
