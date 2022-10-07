import React from 'react'
import DirectMessage from './sub-components/DirectMessage'
import Channel from './sub-components/Channel'
import User from './sub-components/UserDisplay'

export default function Sidebar() {
  return (
    <section className='side-bar-wrapper'>
      <DirectMessage />
      <Channel />
      <User />
    </section>
  )
}
