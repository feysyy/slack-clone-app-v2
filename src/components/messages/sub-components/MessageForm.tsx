import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setSendMessageBody, selectSendMessageData  } from '../../../features/message/messageSlice'
import { sendMessageAction, retrieveMessageAction } from '../../../features/message/messageAction'
import { getReceiver } from '../../../utils/localStorage'

export default function MessageForm() {
  const dispatch = useAppDispatch()
  const [ chatArea, setChatArea ] = useState("")

  useEffect(() => {
    setInterval(() => {
      dispatch(retrieveMessageAction(getReceiver()))
    }, 1000)
  }, [dispatch])

  function handleChange(e: any) {
    dispatch(setSendMessageBody(e.target.value))
    setChatArea(e.target.value)
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch(sendMessageAction())
      .unwrap()
      .then(() => {
        dispatch(retrieveMessageAction(getReceiver()))
      })
    setChatArea("")
    e.target.reset()
  }

  return (
      <div className='message-form'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea 
            className='text-area'
            onChange={(e) => handleChange(e)}
            placeholder='enter a message here'
          />
          <button 
            className='send-message-btn'
            type='submit'
            disabled={!chatArea}
          >
            Send
          </button>
        </form>
      </div>
  )
}
