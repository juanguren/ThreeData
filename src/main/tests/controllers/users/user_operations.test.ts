import {
  createNewUser,
  validateUserData,
  deleteUser,
  getUser,
} from '../../../controllers/users/user_operations';
import mocks from '../../mocks';
import UserService, { User } from '../../../model/schemas/Users/users.static';
import httpMock from 'node-mocks-http';
//import { User } from '../../../model/schemas/Users/users.static';

// This allows to spy on calls to the class constructor and all of its methods too!
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
    (UserService.getUser as jest.Mock).mockReturnValue(mocks.getUserResponse);
    await getUser(req, res);

    expect(UserService.getUser).toReturn();
    expect(res._getJSONData()).toMatchObject({
      _id: '610f185071b55b27b738fa1d',
    });
  });
});

describe('Tests Create New User', () => {
  let req: any, res: any;
  const mockUsername = 'juanguren';
  beforeAll(async () => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  });
  it('Should call the create user method inside the class', async () => {
    req.body = mocks.createUserBody;
    await createNewUser(req, res);

    expect(User).toHaveBeenCalledTimes(1);
  });
});
