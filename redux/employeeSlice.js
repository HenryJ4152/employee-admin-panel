import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    formOpen: false,
    deletePending: null,
    editing: null,
    searchData: null
  },
  reducers: {
    toggleDelete: (state, action) => {
      if (state.deletePending) {
        state.deletePending = null
      } else {
        state.deletePending = action.payload
      }
      state.editing = false
      state.formOpen = false
    },
    toggleForm: state => {
      state.formOpen = !state.formOpen
    },
    setEditing: (state, action) => {
      console.log("setEditing called")
      if (state.formOpen && state.editing) {
        state.formOpen = false
        state.editing = null
      }
      else if (action.payload) {
        state.formOpen = true
        state.editing = action.payload
      } else {
        state.editing = action.payload
        state.formOpen = !state.formOpen
      }
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { toggleForm, setEditing, toggleDelete, setSearchData } = employeeSlice.actions

export default employeeSlice.reducer
