import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Ecommerce test', () => {
    describe('products test', () => {
        it('should return a list of products', async () => {
            const res = await request.get('/api/products');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
          });
    })
    
    describe('cart test', () => {
        it('should create a cart', async () => {
            const res = await request.post('/api/carts');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
          });
    })

    describe('session test', () => {
        it('should return a list of products', async () => {
            const res = await request.get('/api/sessions/current');
            expect(res.status).to.equal(401);
            expect(res.body).to.be.an('object');
          });
    })
})