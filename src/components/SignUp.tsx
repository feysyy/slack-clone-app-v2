import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { signUp } from "../features/auth/authAction";
import { setSignUpData } from "../features/auth/authSlice";
import { useAppDispatch } from "../store";
import { setAccount } from "../utils/localStorage";

export default function SignUp() {
  const dispatch = useAppDispatch()

  function handleChange(e: any) {
    const data: any = {}

    for (const input of e.currentTarget.elements) {
      if(input.name !== null && input.name !== "") {
        data[input.name] = input.value
      }
    }
    dispatch(setSignUpData(data))
  }


  function handleSubmit(e: any) {
    e.preventDefault()
    dispatch(signUp())
    e.target.reset()
  }


  return (
    <section className="sign-up-section">
      <div className="sign-up-wrapper">
        <form 
          className="sign-up-form"
          onSubmit={(e) => handleSubmit(e)} 
          onChange={(e) => handleChange(e)}>
          <label>E-mail: </label>
          {/* <br/> */}
          <input
            className="input-field"
            type="email" 
            name='email'
            required
          />
          {/* <br/> */}

          <label>Password: </label>
          {/* <br></br> */}
          <input
            className="input-field"
            type="password"
            name="password"
            required
          />
          {/* <br/> */}

          <label>Confirm Password: </label>
          {/* <br/> */}
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            required 
          />
          {/* <br/> */}
          <button className="sing-up-btn" type="submit"> Sign-Up</button>
        </form>
        <div className="sign-in-portal">
        <p>Click here to <Link className="sign-in-link" to="/"> Sign-in</Link> </p>
        </div>
      </div>
    </section>
  )
}
