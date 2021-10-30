import { expect } from 'chai';

import app from '../../../app';

describe('Running test for Post Plugin.', () => {
    /*
     * Returns error 400 as `id` param is not integer.
     */
    it('GET `/post/:id` route with `string`.', () => {
        app.inject({
            method: 'GET',
            url: '/post/impomu',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(400);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });

    /*
     * Returns error 404 as post does not exist.
     */
    it('GET `/post/:id` route with `int`.', () => {
        app.inject({
            method: 'GET',
            url: '/user/69420',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(404);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });

    /*
     * Returns error 400 as there is no body in POST.
     */
    it('POST `/post` route.', () => {
        app.inject({
            method: 'POST',
            url: '/post',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(400);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });
});