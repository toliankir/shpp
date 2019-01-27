const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

function Table(element) {
    this.rootElement = element;

    this.setGoods = function (goodsArray) {
        this.goods = goodsArray;
    };

    this.setHeader = function (headerArray) {
        this.header = headerArray;
    };

    this.drawHeader = function () {
        this.rootElement.innerHTML = '';
        const header = document.createElement('thead');
        const row = document.createElement('tr');
        this.header.forEach((el) => {
            const col = document.createElement('th');
            col.innerHTML = el;
            row.appendChild(col);
        });
        header.appendChild(row);
        this.rootElement.appendChild(header);
    };

    this.drawBody = function (items = this.goods) {
        const body = document.createElement('tbody');
        items.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = '<td>' + item.category + '</td>'
                + '<td>' + item.name + '</td>'
                + '<td>' + item.amount + '</td>'
                + '<td>' + item.price + '</td>';
            body.appendChild(row);
        });
        this.rootElement.appendChild(body);
    };
}

const table = new Table(document.getElementById('table'));
// const test = 'price';
// GOODS.sort(function(a,b) {
//     if (a[test] > b[test]) {
//         return 1;
//     }
//     if (a[test] < b[test]) {
//         return -1;
//     }
//     return 0;
// } );

const test = GOODS.filter((value) => {
    if (value.price >= 5) {
        return true;
    }

});
table.setGoods(test);
table.setHeader(['Category ▼', 'Name ▼', 'Amount', 'Price']);
table.drawHeader();
table.drawBody();

// console.log(GOODS);
// console.log(GOODS.sort(function(a,b) {
//     if (a.price > b.price) {
//         return 1;
//     }
//     if (a.price < b.price) {
//         return -1;
//     }
//     return 0;
// }));


