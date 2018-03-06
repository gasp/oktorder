import { expect } from 'chai';
import guid from 'src/common/guid';


describe('common/guid', () => {
  it('returns a string of 32 character', () => {
    const g = guid();
    expect(g).to.be.a('string').that.have.a.lengthOf(32);
  });
  it('returns a different string each time', () => {
    const a = guid();
    const b = guid();
    const c = guid();
    expect(a).not.to.equal(b);
    expect(a).not.to.equal(c);
    expect(b).not.to.equal(c);
  });
});
