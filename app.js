import { html, render } from './node_modules/lit-html/lit-html.js';
import * as api from './data.js'

const body = document.querySelector('body');

const loginFormTemplate = () => html`
<form @submit=${onLogin} id="login-form">
    <h3>Login</h3>
    <label>Name</label>
    <input type="text" name="name" placeholder="Name...">
    <label>Password</label>
    <input type="text" name="password" placeholder="Password...">
    <input type="submit" value="Login">
</form>`;

const addFormTemplate = () => html`
<form @submit=${onAdd} id="add-form">
    <h3>Add new Order</h3>
    <label>Order number</label>
    <input type="text" name="orderNumber" placeholder="Order number...">
    <label>Order date</label>
    <input type="text" name="orderDate" placeholder="Order date...">
    <label>Issuing date</label>
    <input type="text" name="issuingDate" placeholder="Issuing date...">
    <label>Office</label>
    <input type="text" name="office" placeholder="Office...">
    <label>Issuer</label>
    <input type="text" name="issuer" placeholder="Issuer...">
    <input type="submit" value="Add">
    <h3 id='success'>Order successfully added!</h3>
</form>`;

const rowTemplate = (order) => html`
<tr>
    <td>${order.orderNumber}</td>
    <td>${order.orderDate}</td>
    <td>${order.issuingDate}</td>
    <td>${order.office}</td>
    <td>${order.issuer}</td>
</tr>`;

const tableTemplate = (orders) => html`
<table>
    <thead>
        <tr>
            <th>Number</th>
            <th>Order date</th>
            <th>Issuing date</th>
            <th>Office</th>
            <th>Issuer</th>
        </tr>
    </thead>
    <tbody>
        ${orders.map(order => rowTemplate(order))}
    </tbody>
</table>`;

const userBodyTemplate = (orders, showTable) => html`
${addFormTemplate()}
<button @click=${onLoadOrders} id="loadOrders">LOAD ALL ORDERS</button>
${showTable == true ? tableTemplate(orders) : ''}`;

function start() {
    render(loginFormTemplate(), body);
}

start();

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    await api.login(formData);
    render(userBodyTemplate(null, false), body);
}

async function onAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    await api.createOrder(formData);
    event.target.reset();
    const parentElement = event.target.parentNode;
    document.querySelector('#success').style.display = 'block';
}

async function onLoadOrders(event) {
    const orders = await api.getAllOrders();
    render(userBodyTemplate(orders, true), body);
    document.querySelector('#success').style.display = 'none';
}