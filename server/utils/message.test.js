var expect = require('expect');
const toBeType = require('jest-tobetype');
expect.extend(toBeType);

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'banky';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeType('number');
        expect(message).toBeTruthy();
    });
});;

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'ayo';
        var latitude = 20;
        var longitude = 40;
        var url = 'https://www.google.com/maps?q=20,40';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeType('number');
        expect(message).toBeTruthy();
        
    });
});