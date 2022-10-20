import create from 'zustand'


const useHeaderVisiblityStore = create(set => ({
    hideUserOptions: true,

    setHideUserOptions: (hideUserOptions_) => set(state => ({ hideUserOptions: hideUserOptions_ })),
}))


export default useHeaderVisiblityStore;