export interface Guest {
  name: string,
  status: 'regular' | 'member' | 'banned',
  ticket: 'general' | 'vip' | 'none',
}

export interface Venue {
  blocked: string[],
  hosts: string[],
  guestList: string[],
  membersNight: boolean,
}
