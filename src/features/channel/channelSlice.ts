 import { createSlice, current } from "@reduxjs/toolkit";
import { RootState, store } from "../../store";
import { addMember, createChannel, getAllUserChannels, getOneChannel } from "./channelAction";

interface Channel {
  id: number
  name: string
}

interface ChannelState {
  createChannelData: {
    name: string
    user_ids: number[]
  }
  createChannelStatus: 'idle' | 'loading' | 'success' | 'failed'
  createChannelResponse: Channel

  allChannelStatus: ChannelState['createChannelStatus']
  allChannelResponse: Channel[]

  oneChannelStatus: ChannelState['createChannelStatus']
  oneChannelResponse: any 

  addMemberData: {
    id: number
    member_id: number
  }
  addMemberStatus: ChannelState['createChannelStatus']
  addMemberResponse: any
}


export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    // create channel
    createChannelData: {
      name: "",
      user_ids: [],
    },
    createChannelStatus: "idle",
    createChannelResponse: {
      id: 0,
      name: ""
    },

    // get all user channels
    allChannelStatus: "idle",
    allChannelResponse: [],

    // get/select one channel
    oneChannelStatus: "idle",
    oneChannelResponse: {},
    
    //add member
    addMemberData: {
      id: 0,
      member_id: 0
    },
    addMemberStatus: 'idle',
    addMemberResponse: {},
    membersEmail: []
  } as ChannelState,
  reducers: {
    setCreateChannelName(state, action) {
      state.createChannelData.name = action.payload
    },
    setCreateChannelUsers(state, action) {
      state.createChannelData.user_ids.push(action.payload)
      console.log(current(state.createChannelData))
    },
    setAddMemberId(state, action) {
      state.addMemberData.member_id = action.payload
      // console.log(current(state.addMemberData))
    },
    setAddMemberChannelId(state, action) {
      state.addMemberData.id = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createChannel.pending, state => {
        state.createChannelStatus = 'loading'
      })

      .addCase(createChannel.fulfilled, (state, action) => {
        state.createChannelStatus = 'success'
        state.createChannelResponse = { 
          id: action.payload?.data?.id,
          name: action.payload?.data?.name
        }
        state.allChannelResponse.push({ 
          id: action.payload?.data?.id,
          name: action.payload?.data?.name
        })
      })

      .addCase(createChannel.rejected, state => {
        state.createChannelStatus = "failed"
      })

      // all channel
      .addCase(getAllUserChannels.pending, state => {
        state.allChannelStatus = 'loading'
      })
      .addCase(getAllUserChannels.fulfilled, (state, action) => {
        state.allChannelStatus = 'success'
        action.payload?.data?.forEach((channel: any) => {
          state.allChannelResponse.push({
            id: channel?.id,
            name: channel?.name
          })
        })
      })
      .addCase(getAllUserChannels.rejected, state => {
        state.allChannelStatus = 'failed'
      })

      //get one channel
      .addCase(getOneChannel.pending, state => {
        state.oneChannelStatus = 'loading'
      })
      .addCase(getOneChannel.fulfilled, (state, action) => {
        state.oneChannelStatus = 'success'
        state.oneChannelResponse = action.payload
      })
      .addCase(getOneChannel.rejected, state => {
        state.oneChannelStatus = 'failed'
      })

      // add member
      .addCase(addMember.pending, state => {
        state.addMemberStatus = 'loading'
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.addMemberStatus = 'success'
        state.addMemberResponse = action.payload
      })
      .addCase(addMember.rejected, state => {
        state.addMemberStatus = 'failed'
      })
  }
})

export const { 
  setCreateChannelName, 
  setCreateChannelUsers, 
  setAddMemberId, 
  setAddMemberChannelId,
} = channelSlice.actions

export default channelSlice.reducer



export const selectAllChannels = (state: RootState) => state.channel.allChannelResponse
export const selectChannelName = (state: RootState) => state.channel.oneChannelResponse?.data?.name
