import { expect } from 'chai';

import app from '../../../app';

describe('Running test for Elira Plugin.', () => {
    it('GET `/` route.', () => {
        app.inject({
            method: 'GET',
            url: '/',
        }, (err, response) => {
            expect(err).to.be.a('null');
            expect(response.statusCode).to.be.equal(200);
            expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8');
            expect(response.payload).to.be.a('string');
        });
    });
});