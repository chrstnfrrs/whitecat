import { useState } from "react";
import AContainer from "components/aspire/AContainer";

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const login = () => {
    console.log('logging in...', input)
  }

  return (
    <AContainer className={'max-w-2xl'}>
      <h1 className={'text-xl font-bold pb-4'}>Log In</h1>
      <form>
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
          onClick={login}
          className={'py-1 px-2 bg-green-700 text-white'}
        >
          Log In
        </button>
      </form>
    </AContainer>
  )
}

export default Login