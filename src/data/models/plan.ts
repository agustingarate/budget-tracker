interface IPlan {
  id?: string;
  totalRequired: number;
  savings: number;
  category: string;
  deadline: Date;
  title: string;
}

export class Plan implements IPlan {
  constructor(
    public title: string,
    public totalRequired: number,
    public savings: number,
    public category: string,
    public deadline: Date,
    public id?: string,
  ) {}
}
