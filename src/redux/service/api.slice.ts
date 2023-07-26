import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react/'

import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
	//baseUrl: "https://api.anakpembaca.com/api/v1",
	baseUrl: 'http://localhost:8000/api/v1',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken
		if (token) {
			headers.set('authorization', `Bearer ${token}`)
		}
		return headers
	},
})

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['User', 'Todo'],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	endpoints: (builder) => ({}),
})
