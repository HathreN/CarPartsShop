export interface CategoryPart {
  _id: string,
  id: number,
  name: string,
  price: number,
  image: string,
  carBrand: string
}
export interface Categories {
  _id: string,
  id: number,
  name: string,
  category: string,
  href: string,
  imageSrc: string
}
export interface Bestsellers {
  _id: string,
  id: number,
  name: string,
  price: number,
  image: string
}

export interface Checkout {
  _id: string,
  id: number,
  name: string,
  price: number,
  image: string,
  link: string,
  carBrand: string,
  amount: number
}

export interface TempPart {
  _id: string,
  id: number,
  name: string,
  price: number,
  image: string,
  link: string,
  carBrand: string,
  amount: number
}
