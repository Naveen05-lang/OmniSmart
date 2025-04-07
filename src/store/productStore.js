import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

const useProductStore = create((set, get) => ({
  products: [],
  allProducts: [],
  loading: false,
  error: null,
  search: '',
  sort: 'default',
  category: 'all',
  page: 1,

  fetchProducts: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(BASE_URL);
      set({ allProducts: res.data, products: res.data.slice(0, 10), loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  setCategory: (category) => set({ category }),

  loadMore: () => {
    const { allProducts, page, products } = get();
    const nextPage = page + 1;
    const nextProducts = allProducts.slice(0, nextPage * 10);
    set({ products: nextProducts, page: nextPage });
  },

  getFilteredSortedSearchedProducts: () => {
    const { allProducts, search, sort, category } = get();

    let filtered = allProducts;

    if (category !== 'all') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  },
}));

export default useProductStore;
