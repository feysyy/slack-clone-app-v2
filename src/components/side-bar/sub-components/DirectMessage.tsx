import React, { useCallback, useEffect, useState } from 'react'
import { selectAuth, selectSignInUserList } from '../../../features/auth/authSlice'
import { fetchAllUser } from '../../../features/user/userActions'
import { selectAllUsers } from '../../../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import DMSearch from './DMSearch'
import { getAccount, getListOfUser, setListOfUser } from '../../../utils/localStorage'
import { retrieveMessageAction } from '../../../features/message/messageAction'
import { selectReceiverEmail, setIsChannel, setReceiverEmail } from '../../../features/message/messageSlice'


export default function DirectMessage() {
  const dispatch = useAppDispatch()
  const signInUserList = useAppSelector(selectSignInUserList)
  const [ watcher, setWatcher] = useState<boolean>(true)
  const [ userList, setUserList ] = useState<any[] | null>(null)

  useEffect(() => {
    setUserList(getListOfUser(getAccount()?.email))
  }, [watcher])

  function showMessage(id: number, type: string, email: string) {
    dispatch(retrieveMessageAction({ id, type }))
    dispatch(setReceiverEmail(email))
    dispatch(setIsChannel(false))
  }
 


  return (
    <section className='direct-message-wrapper'>
      <p className='direct-message'>Direct Message</p>
      <div className='direct-message-list'>
        <DMSearch 
          handleClick={(user: any) => {
            setListOfUser(
              getAccount()?.email, 
              [...getListOfUser(getAccount()?.email), { email: user.uid, id: user.id }]
            )
            setWatcher(!watcher)
          }} />
        <div>
          {
            userList?.length !== 0 ? 
              userList?.map((user: any) => (
                <p 
                  onClick={() => {
                    showMessage(user.id, 'User', user.email)
                  }}
                  key={user.id}
                >
                  {user.email}
                </p>
              )) : 
              signInUserList?.map((user: any) => (
                <p onClick={() => showMessage(user.id, 'User', user.email)} key={user.id}>{user.email}</p>
              ))
          }
        </div>
      </div>

    </section>
  )
}


// useEffect(() => {
//   function checkUserData() {
//     const item = localStorage.getItem('userData')

//     if (item) {
//       setUserData(item)
//     }
//   }

//   window.addEventListener('storage', checkUserData)

//   return () => {
//     window.removeEventListener('storage', checkUserData)
//   }
// }, [])