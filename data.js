async function request(url, options) {
    const response = await fetch(url, options);

    if (response.ok == false) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message)
    };

    const data = await response.json();
    return data;
}

async function getAllOrders() {
    const orders = await request('https://api.backendless.com/0D748235-8C7D-5877-FF34-34453A578D00/6EF8C189-FD4C-4298-88F6-EECD34F090FC/data/orders');
    return orders;
}

async function createOrder(formData) {
    const orderNumber = formData.get('orderNumber');
    const orderDate = formData.get('orderDate');
    const issuingDate = formData.get('issuingDate');
    const office = formData.get('office');
    const issuer = formData.get('issuer');
    const order = { orderNumber, issuingDate, office, orderDate, issuer};

    if (orderNumber == '' || orderDate == '' || issuingDate == '' || office == '' || issuer == '') {
        alert('All fields are required!');
        throw new Error('All fields are required!')
    }

    await request('https://api.backendless.com/0D748235-8C7D-5877-FF34-34453A578D00/6EF8C189-FD4C-4298-88F6-EECD34F090FC/data/orders', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
}

async function login(formData) {
    const name = formData.get('name');
    const password = formData.get('password');
    const login = { name, password};

    if (name == '' || password == '') {
        alert('All fields are required!');
        throw new Error('All fields are required!')
    }

    await request('https://api.backendless.com/0D748235-8C7D-5877-FF34-34453A578D00/6EF8C189-FD4C-4298-88F6-EECD34F090FC/data/audit', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
    })
}

export {
    getAllOrders,
    createOrder,
    login
}