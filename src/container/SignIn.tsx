import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signIn } from '../features/auth/authAction';
import { setSignInData } from '../features/auth/authSlice';
import { fetchAllUser } from '../features/user/userActions';
import { useAppDispatch, useAppSelector } from '../store';
import { setAccount } from '../utils/localStorage';

export default function SignIn() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate() 

  function handleChange(e: any) {
    const data: any = {}
    for(const input of e.currentTarget.elements) {
      if(input.name !== null && input.name !== "") {
        data[input.name] = input.value
      }
    }
    dispatch(setSignInData(data))
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch(signIn())
      .unwrap()
      .then(() => {
        dispatch(fetchAllUser())
        navigate('/main-page')
      })
    e.target.reset()
  }

  return (
    <section className='sign-in-section'>
      <div className='sign-in-wrapper'>
        <form 
          className='sign-in-form' 
          onSubmit={(e) => handleSubmit(e)} 
          onChange={(e) => handleChange(e)}>
          <label>E-mail: </label>
          {/* <br></br> */}
          <input
            className='input-field'
            type="email"
            name='email'
            required
          />
          {/* <br></br> */}

          <label>Password: </label>
          {/* <br></br> */}
          <input 
            className='input-field'
            type="password"
            name='password'
            required
          />
          {/* <br></br> */}

          <button className='sign-in-btn' type='submit'> Sign-In </button>
        </form>
      <div className='sign-up-portal'>
        <p>Don't have an account yet?</p>
        <p><Link className='sign-up-link' to="/sign-up-page">Sign-Up </Link>here</p>
      </div>
      </div>
    </section>
  )
}
