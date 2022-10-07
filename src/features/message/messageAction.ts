import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../API";
import { RootState } from '../../store'


export const retrieveMessageAction = createAsyncThunk(
  'message/retrieveMessage',
  async ({ id, type }: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    
    try {
      if(state.auth.signInHeaders) {
        const response = await api.get(`messages?receiver_id=${id}&receiver_class=${type}`, state.auth.signInHeaders)
        // console.log({
        //   data: response.data,
        //   receiver_id: id,
        //   receiver_class: type,
        // })

        return {
          data: response.data,
          receiver_id: id,
          receiver_class: type,
        }
      }
    } catch (err) {
      throw err
    }
  }
)

export const sendMessageAction = createAsyncThunk(
  'message/sendMessage', 
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      if(state.auth.signInHeaders) {
        const response = await api.post('messages', state.message.sendMessageData, state.auth.signInHeaders)
        // console.log(response)
        
        return response.data
      }
    } catch (err) {
      throw err
    }
  }

)