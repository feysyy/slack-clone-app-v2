import React from 'react'
import Sidebar from '../components/side-bar/Sidebar'
import MessageScreen from '../components/messages/MessageBox'

export default function MainPage() {
  return (
    <section className='main-page-wrapper'>
      <div>
        <div><Sidebar /></div>
      </div>
        <div><MessageScreen /></div>
      <div>

      </div>
    </section>
  )
}
