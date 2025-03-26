
export type ItemStatus = 'pending' | 'scrap' | 'sell';

export interface ItemMeasurements {
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
}

export interface ItemDetails {
  make?: string;
  model?: string;
  year?: number;
  serialNumber?: string;
  condition?: string;
  specs?: Record<string, string>;
}

export interface Item {
  id: string;
  qrCode: string;
  timestamp: string;
  status: ItemStatus;
  name?: string;
  category?: string;
  measurements?: ItemMeasurements;
  details?: ItemDetails;
  description?: string;
  notes?: string;
  images?: string[];
}
