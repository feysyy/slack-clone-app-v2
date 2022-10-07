import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getAccount, getHeaders, getListOfUser, removeAccount, removeHeaders, setAccount, setHeaders, setListOfUser} from '../../utils/localStorage'
import { signIn, signUp } from './authAction'

interface AuthState {
  signUpData: {
    email: string
    password: string
    password_confirmation: string
  }
  signUpStatus: 'idle' | 'loading' | 'success' | 'failed'
  signUpResponse: any
  signInData: {
    email: string
    password: string
  }
  signInStatus: AuthState['signUpStatus']
  signInResponse: any
  signInHeaders: {
    headers: {
      'access-token': string
      client: string
      expiry: string
      uid: string
    }
  } | null
  signInUserList: any[] | null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signUpData: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    signUpStatus: "idle",
    signUpResponse: {},
    //sign in Data
    signInData: {
      email: "",
      password: "",
    },
    signInStatus: 'idle',
    signInResponse: {} as any,
    signInHeaders: getHeaders(),
    signInUserList: [],
  } as AuthState,
  reducers: {
    setSignUpData(state, action) {
      state.signUpData = action.payload
    },

    setSignInData(state, action) {
      state.signInData = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.signUpStatus = 'loading'
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpStatus = 'success'
        state.signUpResponse = action.payload
      })

      .addCase(signUp.rejected, state => {
        state.signUpStatus = 'failed'
      })
      
      //sign in
      .addCase(signIn.pending, state => {
        removeHeaders()
        removeAccount()
        state.signInStatus = 'loading'
      })

      .addCase(signIn.fulfilled, (state, action) => {
        let headers = {
          headers: {
            'access-token': action.payload.headers['access-token'],
            client: action.payload.headers.client,
            expiry: action.payload.headers.expiry,
            uid: action.payload.headers.uid,
          }
        }
        
        setHeaders(headers)
        setAccount({
          email: state.signInData.email,
          id: action.payload.data.data.id,
        })
        state.signInUserList = getListOfUser(state.signInData.email)
        state.signInStatus = 'success'
        state.signInResponse = action.payload.data
        state.signInHeaders = headers

      })

      .addCase(signIn.rejected, state => {
        state.signInStatus = 'failed'
      })
  },
})

export const { setSignUpData, setSignInData } = authSlice.actions
export default authSlice.reducer

export const selectAuth = (state: RootState) => state.auth.signInHeaders
export const selectSignInUserList = (state: RootState) => state.auth.signInUserList
export const selectSignInEmail = (state: RootState) => state.auth.signInData.email