import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { removeReceiver, setAccount, setReceiver } from "../../utils/localStorage";
import { retrieveMessageAction, sendMessageAction } from "./messageAction";

interface MessageState {
  retrieveStatus: 'idle' | 'loading' | 'success' | 'failed'
  retrieveResponse: any
  sendMessageData: {
    receiver_id: number
    receiver_class: "User" | "Channel"
    body: string
  }
  sendStatus: MessageState['retrieveStatus']
  sendResponse: any
  receiverEmail: string[]
  isChannel: boolean
}

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    retrieveStatus: "idle",
    retrieveResponse: [],
    //send Message
    sendMessageData: {
      receiver_id: 0,
      receiver_class: "User",
      body: ""
    },
    sendStatus: "idle",
    sendResponse: {},
    receiverEmail: [],
    isChannel: false,
  } as MessageState, 
  reducers: {
    setSendMessageBody(state, action) {
      state.sendMessageData.body = action.payload
    },
    setReceiverEmail(state, action) {
      state.receiverEmail = [action.payload]
    },
    setIsChannel(state, action) {
      state.isChannel = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(retrieveMessageAction.pending, state => {
        removeReceiver()
        state.retrieveStatus = 'loading'
      })

      .addCase(retrieveMessageAction.fulfilled, (state, action )=> {
        setReceiver({
          type: action.payload?.receiver_class,
          id: action.payload?.receiver_id
        })
        state.retrieveStatus = 'success'
        state.retrieveResponse = action.payload?.data?.data
        state.sendMessageData.receiver_class = action.payload?.receiver_class
        state.sendMessageData.receiver_id = action.payload?.receiver_id
      })

      .addCase(retrieveMessageAction.rejected, state => {
        state.retrieveStatus = 'failed'
      })

      .addCase(sendMessageAction.pending, state => {
        state.sendStatus = "loading"
      })

      .addCase(sendMessageAction.fulfilled, (state, action) => {
        state.sendStatus = 'success'
        state.sendResponse = action.payload
        state.retrieveResponse.push(action.payload.data)
      })

      .addCase(sendMessageAction.rejected, state => {
        state.retrieveStatus = 'failed'
      })
  },
})


export const { setSendMessageBody, setReceiverEmail, setIsChannel } = messageSlice.actions
export default messageSlice.reducer

export const selectRetrievedMessage = (state: RootState) => state.message.retrieveResponse

//loader { sendStatus == 'loading' && <p>Loading ..... <p/> }
export const selectSendStatus = (state: RootState) => state.message.sendStatus
export const selectSendMessageData = (state: RootState) => state.message.sendMessageData
export const selectReceiverEmail = (state: RootState) => state.message.receiverEmail
export const selectIsChannel = (state: RootState) => state.message.isChannel



