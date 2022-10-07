import React, { useEffect } from 'react'
import { selectChannelName } from '../../../features/channel/channelSlice'
import { retrieveMessageAction } from '../../../features/message/messageAction'
import { selectIsChannel, selectReceiverEmail, selectRetrievedMessage, selectSendStatus } from '../../../features/message/messageSlice'
import { fetchAllUser } from '../../../features/user/userActions'
import { useAppDispatch, useAppSelector } from '../../../store'
import { getAccount } from '../../../utils/localStorage'

export default function MessageDisplay() {
  const dispatch = useAppDispatch()
  const retrievedMessage = useAppSelector(selectRetrievedMessage)
  const sendStatus = useAppSelector(selectSendStatus)
  const receiverEmail = useAppSelector(selectReceiverEmail)
  const isChannel = useAppSelector(selectIsChannel)
  const channelName = useAppSelector(selectChannelName)

  return (
    <section className='message-display-wrapper'>
      <div className='receiver-email'>
        {
          !isChannel && receiverEmail.map((receiver) => (
            <span key={receiver}> { receiver } </span>
          ))
        }
        {
          isChannel && <p>{ channelName }</p>
        }
      </div>
      <div className='message-display'>
        {
          retrievedMessage.map((message: any) => (
            <p
              className={`retrieve-message ${
                message.sender?.id && message.sender?.id !== getAccount().id ? 'receiver' : 'sender'
              }`} 
              key={message.id}
            >
              { isChannel && `${message.sender?.uid}: `} { message.body }
            </p>
          ))
        }
      </div>
    </section>
  )
}
