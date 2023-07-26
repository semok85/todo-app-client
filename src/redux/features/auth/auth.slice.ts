import { createSlice } from '@reduxjs/toolkit'

type User = {
	id: string
	name: string
	email: string
}

interface State {
	auth: {
		accessToken: string | null
		user: User | null
	}
}

const authSlice = createSlice({
	name: 'auth',
	initialState: { accessToken: null, user: null },
	reducers: {
		setCurrentToken: (state, action) => {
			state.accessToken = action.payload
		},
		setCurrentUser: (state, action) => {
			state.user = action.payload
		},
		logOut: (state) => {
			state.accessToken = null
			state.user = null
			window.localStorage.clear()
		},
	},
})

export const { setCurrentToken, setCurrentUser, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: State) => state.auth.accessToken
export const selectUser = (state: State) => state.auth.user
