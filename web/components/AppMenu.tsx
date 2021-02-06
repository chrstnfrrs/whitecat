import Link from 'next/link'

const AppMenu = () => {
  return (
    <nav className={'h-16 flex justify-between items-center bg-gray-900 text-white'}>
      <ul className={'flex p-6'}>
        <li className={'p-4'}><Link href="/">White Cat</Link></li>
      </ul>
      <ul className={'flex p-6'}>
        <li className={'p-4'}><Link href="/login">Login</Link></li>
        <li className={'p-4'}><Link href="/signup">Signup</Link></li>
      </ul>
    </nav>
  )
}

export default AppMenu