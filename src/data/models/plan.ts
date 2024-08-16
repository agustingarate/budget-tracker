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

  static fromObject(data: any, id: any) {
    return new Plan(
      data.title,
      data.totalRequired,
      data.savings,
      data.category,
      data.deadline,
      data.id ?? id,
    );
  }
}
