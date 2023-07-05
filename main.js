let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let addItem = document.getElementById('addItem');

let mood = 'create';
let temp;


// get total
function getTotal() {
    if (price.value != '') {
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
    }
}

// create product 
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

addItem.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '') {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[temp] = newPro;
            mood = 'create';

            count.style.display = "inline";
            category.style.width = "47.5%";
            addItem.innerHTML = "Add Item";
            addItem.style.backgroundColor = "#0d7dd9";
        }
    }


    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);

    clearData()
    showData()
}

// clear data
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td class="cust-td">${dataPro[i].price}</td>
            <td class="cust-td">${dataPro[i].taxes}</td>
            <td class="cust-td">${dataPro[i].ads}</td>
            <td class="cust-td">${dataPro[i].discount}</td>
            <td class="cust-td">${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button type="submit" onclick="updateData(${i})" id="updateItem" style="background: #468c21;">UPDATE</button></td>
            <td><button type="submit" onclick="deleteData(${i})" id="deleteItem" style="background: #D60D45;">DELETE</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    //delete all btn
    let deleteAllBtn = document.getElementById('deleteAll');
    if (dataPro.length > 1) {
        deleteAllBtn.innerHTML = `
        <button type="submit" onclick="deleteAllData()">Delete All Items (${dataPro.length})</button>
        `
    } else {
        deleteAllBtn.innerHTML = '';
    }
}

//delete item 
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

//delete all items
function deleteAllData() {
    localStorage.clear();
    dataPro.splice(0);
    showData()
}

//update item
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = "none";
    category.style.width = "100%";
    addItem.innerHTML = "Update Item";
    addItem.style.backgroundColor = "#468c21";
    mood = 'update';
    temp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

//search 
let searchMood = 'byTitle';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'byTitle';
        search.placeholder = 'Search By Title'
    } else {
        searchMood = 'byCategory';
        search.placeholder = 'Search By Category'
    }
    search.focus();
    search.value = '';
    showData()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'byTitle') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td class="cust-td">${dataPro[i].price}</td>
                        <td class="cust-td">${dataPro[i].taxes}</td>
                        <td class="cust-td">${dataPro[i].ads}</td>
                        <td class="cust-td">${dataPro[i].discount}</td>
                        <td class="cust-td">${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button type="submit" onclick="updateData(${i})" id="updateItem" style="background: #468c21;">UPDATE</button></td>
                        <td><button type="submit" onclick="deleteData(${i})" id="deleteItem" style="background: #D60D45;">DELETE</button></td>
                    </tr>
                    `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td class="cust-td">${dataPro[i].price}</td>
                        <td class="cust-td">${dataPro[i].taxes}</td>
                        <td class="cust-td">${dataPro[i].ads}</td>
                        <td class="cust-td">${dataPro[i].discount}</td>
                        <td class="cust-td">${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button type="submit" onclick="updateData(${i})" id="updateItem" style="background: #468c21;">UPDATE</button></td>
                        <td><button type="submit" onclick="deleteData(${i})" id="deleteItem" style="background: #D60D45;">DELETE</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

showData()