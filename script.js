const itemList = document.getElementById("itemList");

// Carregar itens do Local Storage ao iniciar
document.addEventListener("DOMContentLoaded", loadItems);

function loadItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.forEach(item => {
        addItemToDOM(item.name, item.quantity);
    });
}

function addItemToDOM(itemName, itemQuantity) {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-name", itemName);

    const itemQuantityInput = document.createElement("input");
    itemQuantityInput.type = "number";
    itemQuantityInput.className = "item-quantity";
    itemQuantityInput.value = itemQuantity;
    itemQuantityInput.min = 0; // Quantidade mínima de 0
    itemQuantityInput.onchange = function() {
        checkQuantity(itemQuantityInput);
        updateLocalStorage(); // Atualiza o Local Storage sempre que a quantidade mudar
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "edit-btn";
    editBtn.onclick = function() {
        const newQuantity = itemQuantityInput.value;
        if (newQuantity < 10) {
            alert(`A quantidade de ${itemName} está baixa! Apenas ${newQuantity} itens restantes.`);
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        itemList.removeChild(listItem);
        updateLocalStorage(); // Atualiza o Local Storage ao remover um item
    };

    listItem.appendChild(document.createTextNode(`${itemName} - `));
    listItem.appendChild(itemQuantityInput);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    itemList.appendChild(listItem);
}

function addItem() {
    const itemName = document.getElementById("itemName").value;
    const itemQuantity = document.getElementById("itemQuantity").value;

    if (itemName && itemQuantity) {
        addItemToDOM(itemName, itemQuantity);
        saveItemToLocalStorage(itemName, itemQuantity);

        // Limpar os campos de entrada
        document.getElementById("itemName").value = "";
        document.getElementById("itemQuantity").value = "";
    } else {
        alert("Por favor, preencha o nome e a quantidade do item.");
    }
}

function saveItemToLocalStorage(itemName, itemQuantity) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ name: itemName, quantity: itemQuantity });
    localStorage.setItem("items", JSON.stringify(items));
}

function updateLocalStorage() {
    const items = [];
    const listItems = itemList.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        const itemName = listItems[i].getAttribute("data-name");
        const itemQuantity = listItems[i].getElementsByClassName("item-quantity")[0].value;
        items.push({ name: itemName, quantity: itemQuantity });
    }
    localStorage.setItem("items", JSON.stringify(items));
}

function checkQuantity(input) {
    const quantity = input.value;
    const itemName = input.parentElement.getAttribute("data-name");

    if (quantity < 10) {
        alert(`A quantidade de ${itemName} está baixa! Apenas ${quantity} itens restantes.`);
    }
}

function searchItem() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const items = itemList.getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {
        const itemName = items[i].getAttribute("data-name").toLowerCase();
        if (itemName.includes(searchValue)) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}
