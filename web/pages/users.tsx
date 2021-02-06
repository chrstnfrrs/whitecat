import AContainer from "components/aspire/AContainer"

import {useUsersQuery} from '../graphql/generated'

const Users = () => {
  const {data} = useUsersQuery()

  if (!data) return <p>Loading...</p>

  if (data?.users) {
    return (
      <AContainer>
        <h1 className={'text-xl font-bold pb-4'}>Users</h1>
        <div>
          { data.users.map((user) =>
            <p key={user.uuid}>{user.email}</p>
          )}
        </div>
      </AContainer>
    )
  }

  return null
}

export default Users