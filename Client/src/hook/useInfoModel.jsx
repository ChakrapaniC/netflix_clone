import { create } from 'zustand'

const useInfoModel = create((set)=>({
    movieId: undefined,
    isOpen: false,
    openModel: (movieId) => set({isOpen: true , movieId}),
    closeModel: (movieId) => set({isOpen: false, movieId})

}))

export default useInfoModel