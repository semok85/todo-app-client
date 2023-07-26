import { RootState } from '@/redux/store'
import {
	EntityState,
	createEntityAdapter,
	createSelector,
} from '@reduxjs/toolkit'

type Todo = {
	id: string
	title: string
	status: 'Backlog' | 'In Progress' | 'Todo' | 'Canceled' | 'Done'
	label: string
	priority: 'Low' | 'Medium' | 'High'
}

import { apiSlice } from '../../service/api.slice'

const todosAdapter = createEntityAdapter<Todo>({
	selectId: (todo) => todo.id as string,
})

const initialState = todosAdapter.getInitialState()

export const todosApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<EntityState<Todo>, void>({
			query: () => ({
				url: '/todos',
				method: 'GET',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			transformResponse: (responseData: Todo[]) => {
				const loadedTodo = responseData.map((todo) => {
					return todo
				})
				return todosAdapter.setAll(initialState, loadedTodo)
			},
			providesTags: (result) => {
				if (result?.ids) {
					return [
						{ type: 'Todo', id: 'LIST' },
						...result.ids.map((id) => ({ type: 'Todo', id } as const)),
					]
				} else return [{ type: 'Todo', id: 'LIST' }]
			},
		}),
		getTodoById: builder.query<Todo, string>({
			query: (id) => ({
				url: `/todos/${id}`,
				method: 'GET',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			providesTags: (result, error, id) => [{ type: 'Todo', id }],
		}),
		addNewBook: builder.mutation<FormData, Partial<FormData>>({
			query: (formData) => ({
				url: '/todos',
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
		}),
		updateTodo: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/books/update/${id}`,
				method: 'PATCH',
				body: formData,
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
		}),
		deleteTodo: builder.mutation({
			query: (id) => ({
				url: `/todos/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
		}),
	}),
})

export const {
	useGetTodosQuery,
	useGetTodoByIdQuery,
	useAddNewBookMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = todosApiSlice

// returns the query result object
export const selectTodosResult = todosApiSlice.endpoints.getTodos.select()

// creates memoized selector
const selectTodosData = createSelector(
	selectTodosResult,
	(todoResult) => todoResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllBooks,
	selectById: selectBooksById,
	selectIds: selectBookIds,
	// Pass in a selector that returns the users slice of state
} = todosAdapter.getSelectors<RootState>(
	(state) => selectTodosData(state) ?? initialState
)
