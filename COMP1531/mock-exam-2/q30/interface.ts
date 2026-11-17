export interface Customer {
  tier: 'standard' | 'gold' | 'staff',
  flagged: string[],
  warranties: string[],
}

export interface Order {
  status: 'delivered' | 'cancelled',
  category: string,
  faulty: boolean,
  hasReceipt: boolean,
  daysSincePurchase: number,
}
