export interface LocalStorageItem {
  id: number,
  amount: number
}

export interface LocalStorageCart {
  items: LocalStorageItem[];
}