import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../API'
import { RootState } from '../../store'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      const response = await api.post('auth', state.auth.signUpData)
      return response.data
    } catch(err) {
      throw err
    }
  }
)

export const signIn = createAsyncThunk<any>(
  'auth/signIn',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      const response = await api.post('auth/sign_in', state.auth.signInData)
      // console.log(response)
      return {
        data: response.data,
        headers: response.headers
      }
    } catch(err) {
      throw err
    }
  }
)