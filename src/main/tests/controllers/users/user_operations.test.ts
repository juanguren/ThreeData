import {
  createNewUser,
  validateUserData,
  deleteUser,
  getUser,
} from '../../../controllers/users/user_operations';
import { getUserResponse } from '../../mocks';
import UserService from '../../../model/schemas/Users/users.static';
import httpMock from 'node-mocks-http';

jest.mock('../../../model/schemas/Users/users.static');

describe('Test GET service', () => {
  let req: any, res: any;
  const mockUsername = 'juanguren';
  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  });
  it('Should correctly call the GET schemas method', async () => {
    req.params.username = mockUsername;
    await getUser(req, res);

    expect(UserService.getUser).toBeCalled();
    expect(UserService.getUser).toBeCalledWith(mockUsername);
  });
  it('Should return the JSON user response', async () => {
    req.params.username = mockUsername;
    (UserService.getUser as jest.Mock).mockReturnValue(getUserResponse);
    await getUser(req, res);

    expect(UserService.getUser).toReturn();
    expect(res._getJSONData()).toMatchObject({
      _id: '610f185071b55b27b738fa1d',
    });
  });
});
