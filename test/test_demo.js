const request = require('supertest');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = require('chai').assert
const should = require('chai').should
const expect = require('chai').assert



describe('API Test for "reqres.in"', function() {
    const BASE_URL="https://reqres.in/api/users"

    it('test -GET users', async () => {
        const response =await request(BASE_URL).get("users")


        assert.equal(response.statusCode,200)
        assert.equal(response.body[0].name,'Michael lowson');

        expect(response.statusCode).to. equal(200)
    });

    it('test -POST create', async () => {
        const body = (
            { name: 'John Doe', job: 'Developer' }
        )
        const response = await request(BASE_URL)
        .post('/users') 
        .send(body);
        console.log (response.statusCode)
        console.log (response.body)

        should (response.statusCode ===201)
    });

    it('test -DELETE create', async () => {
        const body = (
            { name: 'John Doe', job: 'Developer' }
        )
        const response = await request(BASE_URL)
        .delete('/users') 
        .send(body);
        console.log (response.statusCode)
        console.log (response.body)
    });

    it('test -PUT create', async () => {
        const body = (
            { name: 'John Doe', job: 'Developer' }
        )
        const response = await request(BASE_URL)
        .put('users') 
        .send(body);
        console.log (response.statusCode)
        console.log (response.body)

        const schemaPath = "resource/jsonschema/post-user-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
});

