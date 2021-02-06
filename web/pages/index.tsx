import Link from 'next/link'
import AContainer from "components/aspire/AContainer"

const Home = () => {
  const pages = [
    {name: 'Users', link: 'users'}
  ]

  return (
    <AContainer>
      <h1 className={'text-xl font-bold pb-4'}>Home</h1>
      <h2>More Pages:</h2>
      <div className={'pl-4 pt-1'}>
        { pages.map((page, index: any) =>
          <Link key={index} href={`/${page.link}`}>{page.name}</Link>
        )}
      </div>
    </AContainer>
  )
}

export default Home