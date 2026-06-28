import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiX, FiChevronDown } from 'react-icons/fi';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'reviews' },
];

const MATERIALS = [...new Set(products.map(p => p.material))];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') || '');
  const [selectedCat, setSelectedCat] = useState(params.get('cat') || '');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedMats, setSelectedMats] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(params.get('q') || '');
    setSelectedCat(params.get('cat') || '');
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (selectedCat) list = list.filter(p => p.category === selectedCat);
    if (selectedMats.length) list = list.filter(p => selectedMats.includes(p.material));
    list = list.filter(p => p.price <= maxPrice && p.rating >= minRating);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [search, selectedCat, sort, maxPrice, selectedMats, minRating]);

  const toggleMat = mat => setSelectedMats(m => m.includes(mat) ? m.filter(x => x !== mat) : [...m, mat]);
  const clearFilters = () => { setSearch(''); setSelectedCat(''); setSort('featured'); setMaxPrice(100); setSelectedMats([]); setMinRating(0); setParams({}); };
  const activeFilters = [search, selectedCat, selectedMats.length, maxPrice < 100, minRating > 0].filter(Boolean).length;

  return (
    <div className="shop-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">All Products</h1>
          <p className="section-sub">Browse our full catalogue of {products.length}+ 3D printed creations</p>
          <div className="shop-toolbar">
            <div className="shop-search">
              <FiSearch />
              <input className="input" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button className="btn-ghost" onClick={() => setSearch('')}><FiX /></button>}
            </div>
            <button className="btn btn-outline filter-toggle" onClick={() => setFiltersOpen(o => !o)}>
              <FiSliders /> Filters {activeFilters > 0 && <span className="filter-count">{activeFilters}</span>}
            </button>
            <div className="sort-select">
              <FiChevronDown />
              <select value={sort} onChange={e => setSort(e.target.value)} className="input">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Sidebar */}
        <aside className={`shop-sidebar${filtersOpen ? ' open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            {activeFilters > 0 && <button className="btn btn-ghost" onClick={clearFilters}>Clear all</button>}
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <button className={`filter-chip${!selectedCat ? ' active' : ''}`} onClick={() => setSelectedCat('')}>All</button>
            {categories.map(c => (
              <button key={c} className={`filter-chip${selectedCat === c ? ' active' : ''}`} onClick={() => setSelectedCat(c === selectedCat ? '' : c)}>
                {c} <span>{products.filter(p => p.category === c).length}</span>
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h4>Max Price: ${maxPrice}</h4>
            <input type="range" min="5" max="100" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="range-input" />
            <div className="range-labels"><span>$5</span><span>$100</span></div>
          </div>

          <div className="filter-group">
            <h4>Min Rating</h4>
            <div className="rating-buttons">
              {[0, 4, 4.5, 4.7, 4.9].map(r => (
                <button key={r} className={`filter-chip${minRating === r ? ' active' : ''}`} onClick={() => setMinRating(r)}>
                  {r === 0 ? 'Any' : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Material</h4>
            {MATERIALS.map(m => (
              <label key={m} className="checkbox-label">
                <input type="checkbox" checked={selectedMats.includes(m)} onChange={() => toggleMat(m)} />
                {m}
              </label>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="shop-main">
          <p className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
