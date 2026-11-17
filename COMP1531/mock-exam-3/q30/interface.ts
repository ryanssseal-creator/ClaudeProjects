export interface User {
  zid: string,
  role: 'student' | 'staff' | 'security' | 'visitor',
  building: string,
  bookings: string[],
}

export interface Door {
  room: string,
  building: string,
  locked: boolean,
  owners: string[],
  afterHours: boolean,
}
