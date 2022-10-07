import React, { useState, useEffect } from 'react'
import { getAccount, removeAccount } from '../../../utils/localStorage'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectSignInEmail } from '../../../features/auth/authSlice';

export default function User() {
  const navigate = useNavigate()

  return (
    <div className='user-display-wrapper'>
  
      <div className='user-display'>User: { getAccount()?.email } </div>

      <button className='log-out-btn' onClick={() => {
        removeAccount()
        navigate('/')
      }}>Log out</button>
    </div>
  )
}
