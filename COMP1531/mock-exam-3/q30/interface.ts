export interface Loan {
  title: string,
  overdue: boolean,
}

export interface Member {
  type: 'student' | 'staff',
  suspended: boolean,
  loans: Loan[],
}

export interface Item {
  reference: boolean,
  copiesAvailable: number,
  highDemand: boolean,
}

export interface Decision {
  approved: boolean,
  reason?: string,
  days?: number,
}
