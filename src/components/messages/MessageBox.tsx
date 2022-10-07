import React from 'react'
import MessageDisplay from './sub-components/MessageDisplay'
import MessageForm from './sub-components/MessageForm'


export default function MessageScreen() {
  return (
    <section className='message-box-wrapper'>
      <MessageDisplay />
      <MessageForm />
    </section>
  )
}
