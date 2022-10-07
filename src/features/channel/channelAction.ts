import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { stat } from "fs";
import { api } from "../../API";
import { RootState } from "../../store";

export const createChannel = createAsyncThunk(
  'channel/createChannel',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      if(state.auth.signInHeaders) {
        const response = await api.post('channels', state.channel.createChannelData, state.auth.signInHeaders)
        // console.log(response.data)
        return response.data
      }
    }catch (err) {
      throw err
    }
  }
)

export const getAllUserChannels = createAsyncThunk(
  'channel/getAllUserChannels',
  async(_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try{
      if(state.auth.signInHeaders){
        const response = await api.get('channels', state.auth.signInHeaders)
        // console.log(response.data.data)
        return response.data
      } 
    } catch (err) {
      throw err
    } 
  }
)

export const getOneChannel = createAsyncThunk<any, number>(
  'channel/getOneChannel',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    try {
      if(state.auth.signInHeaders) {
        const response = await api.get(`channels/${id}`, state.auth.signInHeaders)
        console.log(response.data)
        return response.data

      }
    } catch (err) {
      throw err
    }
  }
)

export const addMember = createAsyncThunk(
  'channel/addMember',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    try {
      if(state.auth.signInHeaders) {
        const response = await api.post('channel/add_member', state.channel.addMemberData, state.auth.signInHeaders)
        console.log(response.data)
        return response.data
      }
    } catch (err) {
      throw err
    }
  }
)