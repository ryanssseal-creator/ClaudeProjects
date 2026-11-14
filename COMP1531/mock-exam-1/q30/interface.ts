export interface Customer {
  age: number,
  student: boolean,
  member: boolean,
}

export interface Session {
  basePrice: number,
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  format: '2d' | '3d',
  soldOut: boolean,
}
