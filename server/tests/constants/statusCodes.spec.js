import { httpStatus } from '../../src/constants/statusCodes';

describe('statusCodes', () => {
  describe('httpStatus', () => {
    test('should return correct status code and message for 404 error', () => {
      expect(httpStatus[404]).toStrictEqual('404 - Not Found');
    });
    test('should return correct status code and message for 406 error', () => {
      expect(httpStatus[406]).toStrictEqual('406 - Not Acceptable');
    });
  });
});
