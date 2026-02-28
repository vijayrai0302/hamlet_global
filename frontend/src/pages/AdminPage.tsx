import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Plus, Pencil, Trash2, RotateCcw, X, Search, Package, Gem, Tag, Users } from 'lucide-react'
import { useProducts } from '../store/ProductsContext'
import type { Product, ProductCategory } from '../types'

const ADMIN_PASSWORD = 'hamlet2024'

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductForm = {
  name: string
  category: ProductCategory
  subcategory: string
  price: string
  images: string
  description: string
  certAuthority: string
  certNumber: string
  weight: string
  origin: string
  cut: string
  clarity: string
  color: string
  metal: string
  occasion: string
  isFeatured: boolean
  isNew: boolean
}

const emptyForm: ProductForm = {
  name: '', category: 'jewellery', subcategory: '', price: '',
  images: '', description: '', certAuthority: '', certNumber: '',
  weight: '', origin: '', cut: '', clarity: '', color: '',
  metal: '', occasion: '', isFeatured: false, isNew: false,
}

function formToProduct(form: ProductForm, id: string): Product {
  return {
    id,
    name: form.name,
    category: form.category,
    subcategory: form.subcategory,
    price: form.price === '' || form.price === 'POA' ? null : Number(form.price),
    currency: 'USD',
    images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
    description: form.description,
    certification: {
      authority: (form.certAuthority || null) as 'GIA' | 'IGI' | 'SGL' | null,
      number: form.certNumber || undefined,
    },
    details: {
      weight: form.weight || undefined,
      origin: form.origin || undefined,
      cut: form.cut || undefined,
      clarity: form.clarity || undefined,
      color: form.color || undefined,
      metal: form.metal || undefined,
      occasion: form.occasion || undefined,
    },
    isAvailable: true,
    isFeatured: form.isFeatured,
    isNew: form.isNew,
  }
}

function productToForm(p: Product): ProductForm {
  return {
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price === null ? '' : String(p.price),
    images: p.images.join('\n'),
    description: p.description,
    certAuthority: p.certification.authority ?? '',
    certNumber: p.certification.number ?? '',
    weight: p.details.weight ?? '',
    origin: p.details.origin ?? '',
    cut: p.details.cut ?? '',
    clarity: p.details.clarity ?? '',
    color: p.details.color ?? '',
    metal: p.details.metal ?? '',
    occasion: p.details.occasion ?? '',
    isFeatured: p.isFeatured,
    isNew: p.isNew,
  }
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`border p-6 ${accent ? 'border-gold/40 bg-gold/5' : 'border-white/8 bg-white/3'}`}>
      <Icon size={18} className={accent ? 'text-gold mb-3' : 'text-white/30 mb-3'} />
      <p className="font-serif text-3xl text-ivory mb-1">{value}</p>
      <p className="font-sans text-[10px] tracking-widest uppercase text-ivory/40">{label}</p>
    </div>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin() } else { setErr(true); setPw('') }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <p className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold mb-4">Hamlet Global</p>
      <h1 className="font-serif text-4xl text-ivory font-light mb-10">Admin Access</h1>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          placeholder="Password"
          autoFocus
          className="w-full bg-transparent border border-white/15 text-ivory font-sans text-sm px-4 py-3 placeholder-white/25 focus:outline-none focus:border-gold transition-colors"
        />
        {err && <p className="font-sans text-[11px] text-red-400 tracking-wider">Incorrect password</p>}
        <button
          type="submit"
          className="w-full bg-gold text-black font-sans text-[11px] tracking-[0.3em] uppercase py-3.5 hover:bg-gold/90 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  )
}

// ─── Product Form Modal ────────────────────────────────────────────────────────
function ProductModal({
  title, form, setForm, onSave, onClose,
}: {
  title: string
  form: ProductForm
  setForm: (f: ProductForm) => void
  onSave: () => void
  onClose: () => void
}) {
  const set = (k: keyof ProductForm, v: string | boolean) => setForm({ ...form, [k]: v })

  const inputCls = 'w-full bg-transparent border border-white/12 text-ivory font-sans text-[12px] px-3 py-2.5 placeholder-white/20 focus:outline-none focus:border-gold transition-colors'
  const labelCls = 'block font-sans text-[10px] tracking-widest uppercase text-ivory/40 mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 sticky top-0 bg-[#0d0d0d] z-10">
          <h2 className="font-serif text-xl text-ivory font-light">{title}</h2>
          <button onClick={onClose}><X size={18} className="text-ivory/40 hover:text-ivory" /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className={labelCls}>Product Name *</label>
            <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Burmese Ruby Ring" />
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <select className={inputCls + ' cursor-pointer'} value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="gemstone" className="bg-black">Gemstone</option>
                <option value="jewellery" className="bg-black">Jewellery</option>
                <option value="pre-owned" className="bg-black">Pre-Owned</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Subcategory *</label>
              <input className={inputCls} value={form.subcategory} onChange={e => set('subcategory', e.target.value)} placeholder="e.g. Rings, Emerald…" />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className={labelCls}>Price (USD) — leave blank for "Price on Request"</label>
            <input className={inputCls} value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 12500" />
          </div>

          {/* Images */}
          <div>
            <label className={labelCls}>Image URLs (one per line)</label>
            <textarea className={inputCls + ' h-24 resize-none'} value={form.images} onChange={e => set('images', e.target.value)} placeholder="https://... or /images/filename.jpg" />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description *</label>
            <textarea className={inputCls + ' h-24 resize-none'} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed product description…" />
          </div>

          {/* Certification */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Certification Authority</label>
              <select className={inputCls + ' cursor-pointer'} value={form.certAuthority} onChange={e => set('certAuthority', e.target.value)}>
                <option value="" className="bg-black">None</option>
                <option value="GIA" className="bg-black">GIA</option>
                <option value="IGI" className="bg-black">IGI</option>
                <option value="SGL" className="bg-black">SGL</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Certificate Number</label>
              <input className={inputCls} value={form.certNumber} onChange={e => set('certNumber', e.target.value)} placeholder="e.g. GIA-5234891" />
            </div>
          </div>

          {/* Stone Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Weight</label>
              <input className={inputCls} value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="e.g. 5.20 ct" />
            </div>
            <div>
              <label className={labelCls}>Origin</label>
              <input className={inputCls} value={form.origin} onChange={e => set('origin', e.target.value)} placeholder="e.g. Muzo Valley, Colombia" />
            </div>
            <div>
              <label className={labelCls}>Cut</label>
              <input className={inputCls} value={form.cut} onChange={e => set('cut', e.target.value)} placeholder="e.g. Oval, Cushion…" />
            </div>
            <div>
              <label className={labelCls}>Clarity</label>
              <input className={inputCls} value={form.clarity} onChange={e => set('clarity', e.target.value)} placeholder="e.g. Eye Clean, VVS…" />
            </div>
            <div>
              <label className={labelCls}>Color</label>
              <input className={inputCls} value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. Vivid Green" />
            </div>
            <div>
              <label className={labelCls}>Metal</label>
              <input className={inputCls} value={form.metal} onChange={e => set('metal', e.target.value)} placeholder="e.g. 18K White Gold" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Occasion</label>
            <input className={inputCls} value={form.occasion} onChange={e => set('occasion', e.target.value)} placeholder="e.g. Engagement / Special Occasions" />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-8">
            {(['isFeatured', 'isNew'] as const).map(key => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => set(key, !form[key])}
                  className={`w-9 h-5 rounded-full transition-colors relative ${form[key] ? 'bg-gold' : 'bg-white/15'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form[key] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="font-sans text-[11px] tracking-widest text-ivory/50 uppercase">{key === 'isFeatured' ? 'Featured' : 'New Arrival'}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 border border-white/15 text-ivory/50 font-sans text-[11px] tracking-widest uppercase py-3 hover:border-white/30 transition-colors">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!form.name || !form.subcategory || !form.description}
            className="flex-1 bg-gold text-black font-sans text-[11px] tracking-widest uppercase py-3 hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Product
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts()

  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<ProductCategory | 'all'>('all')

  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addForm, setAddForm] = useState<ProductForm>(emptyForm)
  const [editForm, setEditForm] = useState<ProductForm>(emptyForm)

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return products
      .filter(p => catFilter === 'all' || p.category === catFilter)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.subcategory.toLowerCase().includes(search.toLowerCase()))
  }, [products, catFilter, search])

  const stats = useMemo(() => ({
    total: products.length,
    gemstones: products.filter(p => p.category === 'gemstone').length,
    jewellery: products.filter(p => p.category === 'jewellery').length,
    preOwned: products.filter(p => p.category === 'pre-owned').length,
  }), [products])

  const handleAdd = () => {
    const id = `prod-${Date.now()}`
    addProduct(formToProduct(addForm, id))
    setAddForm(emptyForm)
    setShowAdd(false)
  }

  const handleEdit = () => {
    if (!editingId) return
    updateProduct(editingId, formToProduct(editForm, editingId))
    setEditingId(null)
  }

  const openEdit = (p: Product) => {
    setEditForm(productToForm(p))
    setEditingId(p.id)
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-black text-ivory">
      {/* Header */}
      <header className="border-b border-white/8 px-6 lg:px-12 py-5 flex items-center justify-between">
        <div>
          <p className="font-sans text-[9px] tracking-[0.55em] uppercase text-gold mb-1">Hamlet Global</p>
          <h1 className="font-serif text-2xl text-ivory font-light">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (confirm('Reset all products to defaults?')) resetToDefaults() }}
            className="flex items-center gap-2 border border-white/12 text-ivory/40 font-sans text-[10px] tracking-widest uppercase px-4 py-2.5 hover:border-white/25 hover:text-ivory/70 transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 border border-white/12 text-ivory/40 font-sans text-[10px] tracking-widest uppercase px-4 py-2.5 hover:border-red-500/40 hover:text-red-400 transition-colors"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard icon={Package} label="Total Products" value={stats.total} accent />
          <StatCard icon={Gem} label="Gemstones" value={stats.gemstones} />
          <StatCard icon={Tag} label="Jewellery" value={stats.jewellery} />
          <StatCard icon={Users} label="Pre-Owned" value={stats.preOwned} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent border border-white/12 text-ivory font-sans text-[12px] pl-9 pr-4 py-2.5 placeholder-white/25 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="flex gap-1">
            {(['all', 'gemstone', 'jewellery', 'pre-owned'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className={`font-sans text-[10px] tracking-widest uppercase px-3 py-2 border transition-colors ${catFilter === cat ? 'border-gold bg-gold text-black' : 'border-white/12 text-ivory/40 hover:border-white/25 hover:text-ivory/70'}`}
              >
                {cat === 'all' ? 'All' : cat === 'pre-owned' ? 'Pre-Owned' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setAddForm(emptyForm); setShowAdd(true) }}
            className="flex items-center gap-2 bg-gold text-black font-sans text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 hover:bg-gold/90 transition-colors"
          >
            <Plus size={13} /> Add Product
          </button>
        </div>

        {/* Product count */}
        <p className="font-sans text-[11px] text-ivory/30 tracking-widest mb-5">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Table */}
        <div className="border border-white/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  {['Image', 'Name', 'Category', 'Price', 'Cert', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="font-sans text-[9px] tracking-widest uppercase text-ivory/30 text-left px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 overflow-hidden border border-white/8">
                        {p.images[0] ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <Gem size={14} className="text-white/20" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-sans text-[12px] text-ivory">{p.name}</p>
                      <p className="font-sans text-[10px] text-ivory/35 mt-0.5">{p.subcategory}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-[9px] tracking-widest uppercase px-2 py-1 border ${
                        p.category === 'gemstone' ? 'border-emerald-500/30 text-emerald-400' :
                        p.category === 'jewellery' ? 'border-gold/30 text-gold' :
                        'border-purple-400/30 text-purple-400'
                      }`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-[12px] text-ivory/70 whitespace-nowrap">
                      {p.price === null ? <span className="text-ivory/30 italic text-[11px]">On Request</span> : `$${p.price.toLocaleString()}`}
                    </td>
                    <td className="px-4 py-3 font-sans text-[11px] text-ivory/50">
                      {p.certification.authority ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-[10px] ${p.isFeatured ? 'text-gold' : 'text-ivory/20'}`}>
                        {p.isFeatured ? '★' : '☆'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 border border-white/10 text-ivory/40 hover:border-gold/40 hover:text-gold transition-colors"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(p.id)}
                          className="p-1.5 border border-white/10 text-ivory/40 hover:border-red-500/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-sans text-[12px] text-ivory/25 tracking-widest">No products found</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showAdd && (
          <ProductModal
            title="Add New Product"
            form={addForm}
            setForm={setAddForm}
            onSave={handleAdd}
            onClose={() => setShowAdd(false)}
          />
        )}
        {editingId && (
          <ProductModal
            title="Edit Product"
            form={editForm}
            setForm={setEditForm}
            onSave={handleEdit}
            onClose={() => setEditingId(null)}
          />
        )}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0d0d0d] border border-white/10 p-8 max-w-sm w-full text-center"
            >
              <p className="font-serif text-2xl text-ivory font-light mb-3">Delete Product?</p>
              <p className="font-sans text-[12px] text-ivory/40 mb-8">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-white/15 text-ivory/50 font-sans text-[10px] tracking-widest uppercase py-3 hover:border-white/30 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => { deleteProduct(confirmDelete); setConfirmDelete(null) }}
                  className="flex-1 bg-red-500/80 text-white font-sans text-[10px] tracking-widest uppercase py-3 hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
