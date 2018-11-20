const assert = require('assert');
const atm = require('../app/atm-template');



describe('ATM', function() {
    describe('Auth', function() {
        it('Auth', function() {
            atm.ATM.auth('0000','000');
            assert.equal(atm.ATM.log.pop(), 'User #0000 login, type: admin.');
        });
    });
});