import { useState } from "react";
import AContainer from "components/aspire/AContainer";

const Signup = () => {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const signUp = () => {
    console.log('signing up...', input)
  }

  return (
    <AContainer className={'max-w-2xl'}>
      <h1 className={'text-xl font-bold pb-4'}>Sign Up</h1>
      <form>
        <div className={'flex pb-2'}>
          <div>
            <label className={'text-sm'}>First Name</label>
            <input 
              type={'text'}
              placeholder={'Sam'}
              value={input.firstName}
              onChange={(e) => setInput({...input, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className={'text-sm'}>Last Name</label>
            <input 
              type={'text'}
              placeholder={'Gray'}
              value={input.lastName}
              onChange={(e) => setInput({...input, lastName: e.target.value})}
            />
          </div>
        </div>
        <div className={'flex flex-col pb-2'}>
          <label className={'text-sm'}>Email</label>
          <input 
            type={'email'}
            placeholder={'example@example.com'}
            value={input.email}
            onChange={(e) => setInput({...input, email: e.target.value})}
          />
        </div>
        <div className={'flex flex-col pb-3'}>
          <label className={'text-sm'}>Password</label>
          <input 
            type={'password'}
            placeholder={'Password123'}
            value={input.password}
            onChange={(e) => setInput({...input, password: e.target.value})}
          />
        </div>
        <button
          type={'button'}
          onClick={signUp}
          className={'py-1 px-2 bg-green-700 text-white'}
        >
          Sign Up
        </button>
      </form>
    </AContainer>
  )
}

export default Signup