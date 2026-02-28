export type Currency = 'USD' | 'AED' | 'INR'

export type ProductCategory = 'gemstone' | 'jewellery' | 'pre-owned'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  subcategory: string
  price: number | null // null = "Request Price"
  currency: string
  images: string[]
  description: string
  certification: {
    authority: 'GIA' | 'IGI' | 'SGL' | null
    number?: string
  }
  details: {
    weight?: string
    origin?: string
    cut?: string
    clarity?: string
    color?: string
    metal?: string
    occasion?: string
  }
  isAvailable: boolean
  isFeatured: boolean
  isNew: boolean
}

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  link: string
  itemCount: number
}

export interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  purchasedItem: string
}

export interface InquiryForm {
  name: string
  email: string
  phone: string
  country: string
  budget: string
  message: string
  productId?: string
}
