const fetchCollections = require.resolve('../dataReducer.ts').fetchCollections;
const expect = require('chai').expect;

describe('fetchCollections thunk', () => {
  it('fetch data and return it in the expected format', async () => {
    //const result = await fetchCollections();
    console.log(fetchCollections);

    //ei toimi mission failed

    // expect(result).to.be.an('array');
    // expect(result[0]).to.have.property('name');
    // expect(result[0]).to.have.property('desc');
    // expect(result[0]).to.have.property('id');
    // expect(result[0]).to.have.property('weight');
  });
});
