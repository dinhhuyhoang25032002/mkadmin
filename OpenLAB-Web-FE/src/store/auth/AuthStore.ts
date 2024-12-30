
import { create, StateCreator } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
export type nodeIdProps = {
    _id: string,
    humidy: string,
    light: string,
    temperature: string,
}
export type UserProps = {
    fullname: string;
    role: string;
    accessToken?: string;
    _id: string;
    email: string;
    address?: string;
    image?: string
    dateOfBirth?: string;
    nodeId?: Array<nodeIdProps>;
    courses?: Array<string>;
};

type AuthStoreSliceProps = {
    isAuth: boolean;
    user: UserProps;
    isLoading: boolean;
    setIsAuth: (isAuth: boolean) => void;
    setUser: (user: UserProps) => void;
    setNode: (node: nodeIdProps) => void;
    setLoading: (isLoading: boolean) => void;
};

const createAuthSlice: StateCreator<AuthStoreSliceProps> = (set) => ({
    isAuth: false,
    isLoading: true,
    user: {
        _id: "",
        fullname: "",
        email: "",
        role: "",
        address: "",
        dateOfBirth: "",
        accessToken: "",
        nodeId: [],
        courses: [],
    },
    setIsAuth: (isAuth: boolean) => set(() => ({ isAuth })),
    setUser: (user: UserProps) => set(() => ({ user })),
    setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
    setNode: (node: nodeIdProps) => set((state) => ({
        user: {
            ...state.user,
            nodeId: state.user.nodeId?.map((n) =>
                n._id === node._id ? node : n
            ),
        },
    })),
});

export const useAuthStore = create(
    devtools(
        persist<AuthStoreSliceProps>(
            (...a) => ({
                ...createAuthSlice(...a),
            }),
            {
                name: "auth",
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        state.setLoading(false);
                    }
                },
            }
        )
    )
);
