import { helloResolver } from "../../src/resolvers/hello";

describe('hello resolver', () => {
  test('should return hello world', () => {
    expect(helloResolver()).toStrictEqual('Hello World!')
  });
});