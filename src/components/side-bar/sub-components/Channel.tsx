import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { selectAllChannels, setAddMemberId, setAddMemberChannelId, setCreateChannelName, setCreateChannelUsers} from '../../../features/channel/channelSlice'
import DMSearch from './DMSearch'
import { addMember, createChannel, getAllUserChannels, getOneChannel } from '../../../features/channel/channelAction'
import { retrieveMessageAction } from '../../../features/message/messageAction'
import AddMember from './AddMember'
import { setIsChannel } from '../../../features/message/messageSlice'
import { getAccount } from '../../../utils/localStorage'

export default function Channel() {
  const [ createChannelToggle, setCreateChannelToggle ] = useState<Boolean>(false)
  // const [ searchChannelToggle, setSearchChannelToggle ] = useState<Boolean>(false)
  const dispatch = useAppDispatch()
  const allChannels = useAppSelector(selectAllChannels)


  function addNewUser(id: number) {
    dispatch(setAddMemberId(id))
    dispatch(addMember())
  }
  
  function showChannel(id: number, type: string){
    dispatch(getOneChannel(id))
    dispatch(retrieveMessageAction({ id, type})) 
    dispatch(setIsChannel(true))
  }

  useEffect(() => {
    dispatch(getAllUserChannels())
  }, [dispatch])
  

  function handleChange(e: any) {
    dispatch(setCreateChannelName(e.target.value))
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch(createChannel())
    e.target.reset()
  }

  return (
    <section className='channel-wrapper'>
      <div className='channel-header'>
        <p className='channel-name'>Channel</p>
        <button 
          className='channel-btn'
          onClick={() => {
            setCreateChannelToggle(!createChannelToggle)
          }}
        >
          +
        </button> 
      </div>

      <div className='channel-form'>
        { createChannelToggle && (
          <>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input 
                className='channel-name-input'
                onChange={(e) => handleChange(e)}
                type="text" 
                placeholder='enter channel name'
              />
              <button
                className='create-channel-btn'
                type='submit' 
              >
                create
              </button>
            </form>

            <DMSearch
              handleClick={(user: any) => {
                dispatch(setCreateChannelUsers(user.id))
              }}
            />
          </>
        )}

        <div>
          {
            allChannels.map((channel: any) => (
              <div key={channel.id}>
                <span onClick={() => showChannel(channel.id, 'Channel') }>
                  { channel.name }
                </span>
                <AddMember handleAddMember={(user: any) => addNewUser(user.id)} id={channel.id} />
              </div>
            )) 
          }
        </div>
      </div>
    </section>
  )
}
