"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_operations_1 = require("../../../controllers/users/user_operations");
const mocks_1 = __importDefault(require("../../mocks"));
const users_static_1 = __importStar(require("../../../model/schemas/Users/users.static"));
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
// This allows to spy on calls to the class constructor and all of its methods too!
jest.mock('../../../model/schemas/Users/users.static');
jest.mock('../../../model/schemas/Users/users.model');
describe('Test GET service', () => {
    let req, res;
    const mockUsername = 'juanguren';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        req = node_mocks_http_1.default.createRequest();
        res = node_mocks_http_1.default.createResponse();
    }));
    it('Should correctly call the GET schemas method', () => __awaiter(void 0, void 0, void 0, function* () {
        req.params.username = mockUsername;
        yield (0, user_operations_1.getUser)(req, res);
        expect(users_static_1.default.getUser).toBeCalled();
        expect(users_static_1.default.getUser).toBeCalledWith(mockUsername);
    }));
    it('Should return the JSON user response', () => __awaiter(void 0, void 0, void 0, function* () {
        req.params.username = mockUsername;
        users_static_1.default.getUser.mockReturnValue(mocks_1.default.getUserResponse);
        yield (0, user_operations_1.getUser)(req, res);
        expect(users_static_1.default.getUser).toReturn();
        expect(res._getJSONData()).toMatchObject({
            _id: '610f185071b55b27b738fa1d',
        });
    }));
});
describe('Tests Create New User', () => {
    let req, res;
    const mockUsername = 'juanguren';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        req = node_mocks_http_1.default.createRequest();
        res = node_mocks_http_1.default.createResponse();
    }));
    it('Should call the create user method inside the class', () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = mocks_1.default.createUserBody;
        yield (0, user_operations_1.createNewUser)(req, res);
        expect(users_static_1.User).toHaveBeenCalledTimes(1);
    }));
});
describe('Tests de Deletion of an existing User', () => {
    let req, res;
    const mockUsername = 'juanguren';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        req = node_mocks_http_1.default.createRequest();
        res = node_mocks_http_1.default.createResponse();
    }));
    it('Should call the user delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        req.params.username = mockUsername;
        yield (0, user_operations_1.deleteUser)(req, res);
        expect(users_static_1.default.deleteUser).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(204);
    }));
    it('Should fail the user delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        req.params.username = 'kksj';
        yield (0, user_operations_1.deleteUser)(req, res);
        expect(res.statusCode).toBe(400);
    }));
});
