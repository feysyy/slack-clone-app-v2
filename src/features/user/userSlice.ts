import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getAccount, getListOfUser, setListOfUser } from '../../utils/localStorage'
import { fetchAllUser } from './userActions'

interface UserState {
  userStatus: 'idle' | 'loading' | 'success' | 'failed'
  userResponse: any
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userStatus: 'idle',
    userResponse: null,
  } as UserState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUser.pending, state => {
        state.userStatus = 'loading'
      })

      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.userStatus = 'success'
        state.userResponse = action.payload
      })

      .addCase(fetchAllUser.rejected, state => {
        state.userStatus = 'failed'
      })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer

export const selectAllUsers = (state: RootState) => state.user.userResponse
