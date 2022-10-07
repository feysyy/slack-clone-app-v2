import React, { useState, useEffect } from 'react'
import DMSearch from './DMSearch'
import {  setAddMemberChannelId } from '../../../features/channel/channelSlice'
import { useAppDispatch } from '../../../store'

export default function AddMember({ handleAddMember, id }: any) {
  const dispatch = useAppDispatch()
  const [ addMemberToggle, setAddMemberToggle ] = useState<boolean>(false)
  

  function setChannelId(id: number){
    dispatch(setAddMemberChannelId(id))
  }

  return (
    <span>
      <button onClick={() => {
        setAddMemberToggle(!addMemberToggle)
        setChannelId(id)
      }}>+</button>

      { addMemberToggle && (
        <DMSearch handleClick={(user: any) => handleAddMember(user) } />
      )}
    </span>
  )
}
