import React, { useState, useEffect } from 'react'
import { selectAuth } from '../../../features/auth/authSlice'
import { selectAllUsers } from '../../../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../../store'
import { fetchAllUser } from '../../../features/user/userActions'
import { setListOfUser, getListOfUser, getAccount } from '../../../utils/localStorage' 
import DirectMessage from './DirectMessage'


export default function DMSearch({ handleClick }: any) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)
  const users = useAppSelector(selectAllUsers)
  const [ searchUser, setSearchUser ] = useState<string>("")
  const [ showSearch, setShowSearch ] = useState<Boolean>(false)

  useEffect(() => {
    if(auth) {
      dispatch(fetchAllUser())
    }
  }, [dispatch])

  return (
    <div className='search-bar-wrapper'>
      <input 
        className='search-input'
        type='text' 
        placeholder='Search user'
        onChange={(e) => {
          setSearchUser(e.target.value)

          if(e.target.value.length > 0) {
            setShowSearch(true)
          } else {
            setShowSearch(false)
          }
        }}
      />
      { showSearch && (
        <div className='search-toggle'>
          { users?.data?.filter((user: any) => {
            if(searchUser === '') {
              return user
            } else if (user.uid.toLowerCase().includes(searchUser.toLowerCase())) {
              return user
            }
          }).map((user: any) => (
            <p onClick={() => handleClick(user)} key={user.id}>
              {user.uid}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}