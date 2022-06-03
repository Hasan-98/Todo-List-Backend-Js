// import connectDB from '../backend/config/db';
// import request from 'supertest';
// import app from '../backend/app'
// import userModel from '../backend/models/userModel'

const connectDB = require('../backend/config/db')
const request = require('supertest')
const userModel = require('../backend/models/userModel')
const TestsHelpers = require('./testHelper')
describe('login', () => {

    let APP;
    beforeAll(async() => {
        await connectDB()
        APP = TestsHelpers.getApp();
    });
    beforeEach(async() => {
        //    await TestsHelpers.syncDb();
        newUserResponse = await TestsHelpers.registerNewUser({ name: 'hasan', email: 'test@example.com', password: 'Test123#' });
    });


    it('should successfully login a user and store the refresh token in the database', async() => {
        const response = await request(APP)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'Test123#',
            })
            .expect(200);
        const refreshToken = response.body.data.refreshToken;
        const { RefreshToken } = userModel;
        const savedRefreshToken = await RefreshToken.findOne({
            where: {
                token: refreshToken,
            },
        });
        expect(savedRefreshToken).toBeDefined();
        expect(savedRefreshToken.token).toEqual(refreshToken);
    });

    it('should return 400 if the user is not found', async() => {
        const response = await request(APP)
            .post('/api/users/login')
            .send({
                email: 'invalid.user@example.com',
                password: 'Test123#',
            })
            .expect(400);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Invalid credentials');
    });

    it('should return 400 if the password is invalid', async() => {
        const response = await request(APP)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'Test123!',
            })
            .expect(400);
        expect(response.body.success).toEqual(false);
        expect(response.body.message).toEqual('Invalid credentials');
    });

    it('should return the same refresh token if the user is already logged in', async() => {
        const response = await request(APP)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'Test123#',
            })
            .expect(200);
        expect(response.body.data.refreshToken).toEqual(newUserResponse.body.data.refreshToken);
    });
});