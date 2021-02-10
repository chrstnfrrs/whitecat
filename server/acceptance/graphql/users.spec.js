import { request, gql } from 'graphql-request'

describe('users', () => {
  describe('users query', () => {
    test('should return', async () => {
      const data = await request('http://localhost:4000/graphql', gql`
        query Users{
          users{
            uuid
            id
            email
          }
        }
      `)

      expect(data.users.length).toBeDefined()
    });
  });
});