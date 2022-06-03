const connectDB = require('../backend/config/db')
const request = require('supertest')
let db;

class TestsHelpers {

    static async startDb() {
        db = await connectDB();
        return db;
    }

    static async stopDb() {
        await db.disconnect();
    }

    static async syncDb() {
        await db.sync();
    }


    static getApp() {
        const App = require('../backend/app');
        return new App().getApp();
    }

    static async registerNewUser(options = {}) {
        const { name = 'hasan', email = 'test@example.com', password = 'Test123#', endpoint = '/api/users/' } = options;
        return request(TestsHelpers.getApp()).post(endpoint).send({ name, email, password });
    }

}

module.exports = TestsHelpers;