import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../API'
import { RootState } from '../../store'


export const fetchAllUser =  createAsyncThunk(
  'user/fetchAllUser', 
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      if(state.auth.signInHeaders) {
        const response = await api.get('users', state.auth.signInHeaders)
        // console.log(response.data)
        return response.data
      }
    } catch (err) {
      throw err
    }
  }
)