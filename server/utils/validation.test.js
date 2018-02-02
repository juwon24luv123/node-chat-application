const expect = require('expect');


const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string value', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('Should reject string with only space', () => {
        var res = isRealString('  ');
        expect(res).toBe(false);
    });
    
    it('Should allow string with non-space characters', () => {
        var res = isRealString('   Node  ');
        expect(res).toBe(true);
    });
});

