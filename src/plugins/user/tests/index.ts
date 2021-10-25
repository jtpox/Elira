import { expect } from 'chai';

import app from '../../../app';

describe('Running test for User Plugin.', () => {
    /*
     * Returns error 400 as there is no body in POST.
     */
    it('POST `/user` route.', () => {
        app.inject({
            method: 'POST',
            url: '/user',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(400);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });
});