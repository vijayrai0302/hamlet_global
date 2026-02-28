import { createContext, useContext, useState, type ReactNode } from 'react'
import { allProducts } from '../constants/data'
import type { Product } from '../types'

const STORAGE_KEY = 'hamlet_products_v2'

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return allProducts
}

interface ProductsContextType {
  products: Product[]
  addProduct: (p: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  resetToDefaults: () => void
}

const ProductsContext = createContext<ProductsContextType>({
  products: allProducts,
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  resetToDefaults: () => {},
})

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(loadProducts)

  const save = (updated: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setProducts(updated)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct: (p) => save([...products, p]),
        updateProduct: (id, updates) =>
          save(products.map((p) => (p.id === id ? { ...p, ...updates } : p))),
        deleteProduct: (id) => save(products.filter((p) => p.id !== id)),
        resetToDefaults: () => {
          localStorage.removeItem(STORAGE_KEY)
          setProducts(allProducts)
        },
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}
