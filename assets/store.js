var cartStorageKey = "aituMerchCart";
var maxQuantityPerItem = 10;

function loadCart() {
  var saved = localStorage.getItem(cartStorageKey);
  if (saved === null) {
    return [];
  }
  try {
    var parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function formatTenge(amount) {
  return amount.toLocaleString("en-US") + " ₸";
}

function countCartItems(cart) {
  var count = 0;
  for (var i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

function calculateCartTotal(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }
  return total;
}

function findCartIndex(cart, name) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return i;
    }
  }
  return -1;
}

function updateCartBadge() {
  var badge = document.getElementById("cart-count");
  if (badge === null) {
    return;
  }
  badge.textContent = countCartItems(loadCart());
}

function addToCart(name, price) {
  var cart = loadCart();
  var index = findCartIndex(cart, name);

  if (index === -1) {
    cart.push({ name: name, price: price, quantity: 1 });
    saveCart(cart);
    return true;
  }

  if (cart[index].quantity >= maxQuantityPerItem) {
    return false;
  }

  cart[index].quantity = cart[index].quantity + 1;
  saveCart(cart);
  return true;
}

function showCartStatus(box, message, type) {
  if (box === null) {
    return;
  }
  box.textContent = message;
  box.classList.remove("is-hidden");
  box.classList.remove("is-error");
  box.classList.remove("is-success");
  box.classList.add(type);
}

function setupAddToCartButtons() {
  var buttons = document.querySelectorAll(".add-to-cart");
  var statusBox = document.getElementById("cart-status");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      var name = event.currentTarget.getAttribute("data-name");
      var price = Number(event.currentTarget.getAttribute("data-price"));
      var added = addToCart(name, price);
      updateCartBadge();

      if (added === true) {
        showCartStatus(statusBox, name + " was added to your cart.", "is-success");
      } else {
        showCartStatus(statusBox, "You can add at most " + maxQuantityPerItem + " of " + name + ".", "is-error");
      }
    });
  }
}

function setupProductFilter() {
  var list = document.getElementById("product-list");
  var searchInput = document.getElementById("product-search");
  var sortSelect = document.getElementById("product-sort");
  var emptyMessage = document.getElementById("no-products");

  if (list === null || searchInput === null || sortSelect === null) {
    return;
  }

  var originalOrder = Array.prototype.slice.call(list.querySelectorAll("article"));

  function getCardName(card) {
    return card.querySelector(".card-title").textContent;
  }

  function getCardPrice(card) {
    return Number(card.querySelector(".add-to-cart").getAttribute("data-price"));
  }

  function applyFilters() {
    var term = searchInput.value.trim().toLowerCase();
    var sorted = originalOrder.slice();

    if (sortSelect.value === "price-low") {
      sorted.sort(function (a, b) {
        return getCardPrice(a) - getCardPrice(b);
      });
    }

    if (sortSelect.value === "price-high") {
      sorted.sort(function (a, b) {
        return getCardPrice(b) - getCardPrice(a);
      });
    }

    if (sortSelect.value === "name") {
      sorted.sort(function (a, b) {
        return getCardName(a).localeCompare(getCardName(b));
      });
    }

    var visibleCount = 0;

    for (var i = 0; i < sorted.length; i++) {
      list.appendChild(sorted[i]);
      var text = sorted[i].textContent.toLowerCase();

      if (text.indexOf(term) === -1) {
        sorted[i].classList.add("d-none");
      } else {
        sorted[i].classList.remove("d-none");
        visibleCount = visibleCount + 1;
      }
    }

    if (emptyMessage !== null) {
      if (visibleCount === 0) {
        emptyMessage.classList.remove("d-none");
      } else {
        emptyMessage.classList.add("d-none");
      }
    }
  }

  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);
}

function setupCartPage() {
  var tableBody = document.getElementById("cart-items");
  if (tableBody === null) {
    return;
  }

  var emptyBox = document.getElementById("cart-empty");
  var tableBox = document.getElementById("cart-table-box");
  var totalOutput = document.getElementById("cart-total");
  var clearButton = document.getElementById("cart-clear");

  function makeCell(text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }

  function makeButton(label, action, name, cssClass) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = cssClass;
    button.textContent = label;
    button.setAttribute("data-action", action);
    button.setAttribute("data-name", name);
    return button;
  }

  function renderCart() {
    var cart = loadCart();
    tableBody.textContent = "";

    if (cart.length === 0) {
      emptyBox.classList.remove("d-none");
      tableBox.classList.add("d-none");
      updateCartBadge();
      return;
    }

    emptyBox.classList.add("d-none");
    tableBox.classList.remove("d-none");

    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var row = document.createElement("tr");

      row.appendChild(makeCell(item.name));
      row.appendChild(makeCell(formatTenge(item.price)));

      var quantityCell = document.createElement("td");
      var quantityText = document.createElement("span");
      quantityText.className = "mx-2";
      quantityText.textContent = item.quantity;
      quantityCell.appendChild(makeButton("-", "decrease", item.name, "btn btn-outline-secondary btn-sm"));
      quantityCell.appendChild(quantityText);
      quantityCell.appendChild(makeButton("+", "increase", item.name, "btn btn-outline-secondary btn-sm"));
      row.appendChild(quantityCell);

      row.appendChild(makeCell(formatTenge(item.price * item.quantity)));

      var removeCell = document.createElement("td");
      removeCell.appendChild(makeButton("Remove", "remove", item.name, "btn btn-outline-danger btn-sm"));
      row.appendChild(removeCell);

      tableBody.appendChild(row);
    }

    totalOutput.textContent = formatTenge(calculateCartTotal(cart));
    updateCartBadge();
  }

  tableBody.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (button === null) {
      return;
    }

    var action = button.getAttribute("data-action");
    var name = button.getAttribute("data-name");
    var cart = loadCart();
    var index = findCartIndex(cart, name);

    if (index === -1) {
      return;
    }

    if (action === "increase") {
      if (cart[index].quantity < maxQuantityPerItem) {
        cart[index].quantity = cart[index].quantity + 1;
      }
    }

    if (action === "decrease") {
      cart[index].quantity = cart[index].quantity - 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
  });

  clearButton.addEventListener("click", function () {
    saveCart([]);
    renderCart();
  });

  renderCart();
}

updateCartBadge();
setupAddToCartButtons();
setupProductFilter();
setupCartPage();