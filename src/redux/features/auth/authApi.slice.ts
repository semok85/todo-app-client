import { apiSlice } from '@/redux/service/api.slice'

// import { removeCurentUser } from "../user/user.slice"
import { logOut, setCurrentToken } from './auth.slice'

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/users/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/users/logout',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					//console.log(data);
					dispatch(logOut())
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState())
					}, 1000)
				} catch (error) {
					console.log(error)
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/auth/getrefreshtoken',
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const auth = await queryFulfilled
					console.log('AUTH :', auth)
					dispatch(setCurrentToken(auth.data))
				} catch (error) {
					console.log(error)
				}
			},
		}),
	}),
})

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
	authApiSlice
