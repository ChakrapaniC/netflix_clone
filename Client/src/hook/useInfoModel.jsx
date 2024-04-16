import { create } from 'zustand'

const useInfoModel = create((set)=>({
    movieId: undefined,
    isOpen: false,
    openModel: (Id) => set({isOpen: true , movieId: Id}),
    closeModel: (Id) => set({isOpen: false, movieId: Id})

}))

export default useInfoModel