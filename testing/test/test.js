const assert = require('assert');
const atm = require('../app/atm-template');


describe('ATM', function () {
    describe('Authorization', function () {
        it('Authorization on start', function () {
            assert.ok(!atm.ATM.is_auth);
        });

        it('Incorrect pin login', function () {
            atm.ATM.auth('0000', '001');
            assert.ok(!atm.ATM.is_auth);
        });

        it('Correct admin user is login', function () {
            atm.ATM.auth('0000', '000');
            assert.ok(atm.ATM.is_auth);
        });

        it('User is login, login is 0000', function () {
            assert.equal(atm.ATM.current_user, '0000');
        });

        it('User is login, user type is admin', function () {
            assert.equal(atm.ATM.current_type, 'admin');
        });

        atm.ATM.logout();
        it('Correct simple user is login', function () {
            atm.ATM.auth('0025', '123');
            assert.ok(atm.ATM.is_auth);
        });

        it('User is login, login is 0025', function () {
            assert.equal(atm.ATM.current_user, '0025');
        });

        it('User is login, user type is user', function () {
            assert.equal(atm.ATM.current_type, 'user');
        });
    });

    describe('Logout', function () {
        it('User logout', function () {
            atm.ATM.logout();
            assert.ok(!atm.ATM.is_auth);
        });
    });

    describe('Check user balance', function () {
        it('Not authorized try check cash', function () {
            atm.ATM.check();
            assert.equal(atm.ATM.log.pop().indexOf('Current debet of'), -1);
        });

        it('Authorized simple user try check cash', function () {
            atm.ATM.auth('0025', '123');
            atm.ATM.check();
            assert.equal(atm.ATM.log.pop().indexOf('Current debet of'), 0);
        });

        it('Authorized simple user balance is 675', function () {
            atm.ATM.check();
            assert.equal(atm.ATM.log.pop(), 'Current debet of 0025 is - 675');
        });

        it('Authorized admin user try check cash', function () {
            atm.ATM.auth('0000', '000');
            atm.ATM.check();
            assert.equal(atm.ATM.log.pop().indexOf('Current debet of'), 0);
        });

        it('Authorized admin user balance is 0', function () {
            atm.ATM.check();
            assert.equal(atm.ATM.log.pop(), 'Current debet of 0000 is - 0');
        });
    });
});