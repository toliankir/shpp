const ATM = {
    is_auth: false,
    current_user: false,
    current_type: false,

    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],
    log: [],
    msgOut: function (msg) {
        this.log.push(msg);
        console.log(msg);
    },
    // authorization
    auth: function (number, pin) {
        this.users.find((el) => {
            if (el.number === number && el.pin === pin) {
                this.is_auth = true;
                this.current_user = el.number;
                this.current_type = el.type;
                this.msgOut(`User #${el.number} login, type: ${el.type}.`);
                return true;
            }
        });
        if (!this.is_auth) {
            this.msgOut(`User with ${number} / ${pin} don't found`);
        }
    },
    // check current debet
    check: function () {
        if (this.is_auth) {
            this.users.find((el) => {
                if (this.current_user === el.number) {
                    this.msgOut(`Current debet of ${this.current_user} is - ${el.debet}`);
                    return true;
                }
            });
        }
    },
    // get cash - available for user only
    getCash: function (amount) {
        if (this.is_auth) {
            if (this.current_type !== "user") {
                console.log(`Sorry user only, your type is ${this.current_type}`);
                return;
            }
            this.users.find((el) => {
                if (this.current_user === el.number) {
                    const getAmount = parseInt(amount, 10);
                    if (getAmount > 0) {
                        if (el.debet < getAmount) {
                            this.msgOut(`Sorry ${this.current_user}, but your balance ${el.debet} is less then you want get ${amount}`);
                            return;
                        }

                        if (this.cash < getAmount) {
                            this.msgOut(`Sorry ${this.current_user}, you can get only ${this.cash}`);
                            return;
                        }

                        if (this.cash - getAmount > 0 && el.debet > getAmount) {
                            el.debet -= getAmount;
                            this.cash -= getAmount;
                            this.msgOut(`User ${this.current_user} gets ${amount}`);
                        }


                    } else {
                        this.msgOut(`User ${this.current_user} error, amount less then 0, ${amount}`);
                    }
                    return true;
                }
            });
        }
    },
    // load cash - available for user only
    loadCash: function (amount) {
        if (this.is_auth) {
            if (this.current_type !== "user") {
                console.log(`Sorry user only, your type is ${this.current_type}`);
                return;
            }
            this.users.find((el) => {
                if (this.current_user === el.number) {
                    const putAmount = parseInt(amount, 10);
                    if (putAmount > 0) {
                        el.debet += putAmount;
                        this.cash += putAmount;
                        this.msgOut(`User ${this.current_user} puts ${amount}`);
                    } else {
                        this.msgOut(`User ${this.current_user} error, amount less then 0, ${amount}`);
                    }
                    return true;
                }
            });
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function (addition) {
        if (this.is_auth) {
            if (this.current_type !== "admin") {
                console.log(`Sorry admin only, your type is ${this.current_type}`);
                return;
            }
            if (addition > 0) {
                this.cash += addition;
                this.msgOut(`User ${this.current_user} puts ${addition} in ATM`);
            } else {
                this.msgOut(`You can put less then 0`);
            }
        }
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function () {
        if (this.is_auth) {
            if (this.current_type !== "admin") {
                console.log(`Sorry admin only, your type is ${this.current_type}`);
                return;
            }
            console.log(`Current ATM balance ${this.cash}`);
            this.log.forEach((el) => {
                console.log(el);
            });
        }
    },
    // log out
    logout: function () {
        this.msgOut(`User ${this.current_user} logOut.`);
        this.is_auth = false;
    }
};

