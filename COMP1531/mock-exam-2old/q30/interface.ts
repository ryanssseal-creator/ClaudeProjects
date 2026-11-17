export interface Student {
  enrolled: boolean,
  specialConsideration: boolean,
}

export interface Assessment {
  rawMark: number,
  examMark: number,
  daysLate: number,
  hurdle: boolean,
  plagiarism: boolean,
}
