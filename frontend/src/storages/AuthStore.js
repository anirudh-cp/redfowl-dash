import create from 'zustand'
import { persist } from 'zustand/middleware'


const useUserStore = create(
    persist(
        (set, get) => ({
            token: "",

            setToken: (token_) => set(state => ({ token: token_ })),

            UserDeleteEverything: () => set(state => ({ token:"" })),
        }),
        {
            name: 'user-storage',
            getStorage: () => sessionStorage,
        }
    )

);

export default useUserStore;