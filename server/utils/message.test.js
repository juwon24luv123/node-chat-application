var expect = require('expect');
const toBeType = require('jest-tobetype');
expect.extend(toBeType);

var {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'banky';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeType('number');
        expect(message).toBeTruthy();
    });
});;