import { expect } from 'chai';

import app from '../../../app';

describe('Running test for Session Plugin.', () => {
    /*
     * Returns error 401 as user is not authenticated.
     */
    it('GET `/session` route.', () => {
        app.inject({
            method: 'GET',
            url: '/session',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(401);
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
            url: '/session',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(400);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });
});