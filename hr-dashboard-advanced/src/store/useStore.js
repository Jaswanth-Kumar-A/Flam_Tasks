import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // State
      employees: [],
      bookmarks: [],
      darkMode: false,
      loading: false,
      error: null,

      // Actions
      setEmployees: (employees) => set({ employees }),
      addBookmark: (employee) => set((state) => ({
        bookmarks: [...state.bookmarks, employee]
      })),
      removeBookmark: (employeeId) => set((state) => ({
        bookmarks: state.bookmarks.filter(emp => emp.id !== employeeId)
      })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'hr-dashboard-storage',
    }
  )
);

export default useStore; 