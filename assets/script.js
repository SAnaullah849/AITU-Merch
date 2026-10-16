var productPrices = {
  "AITU Signature Hoodie": 24900,
  "Campus Essential Tee": 12900,
  "AITU Track Jacket": 29900,
  "Custom School Crewneck": 22900
};

function formatPrice(amount) {
  return amount.toLocaleString("en-US") + " ₸";
}

function showMessage(box, message, type) {
  box.textContent = message;
  box.classList.remove("is-hidden");
  box.classList.remove("is-error");
  box.classList.remove("is-success");
  box.classList.add(type);
}

function hideMessage(box) {
  box.textContent = "";
  box.classList.add("is-hidden");
  box.classList.remove("is-error");
  box.classList.remove("is-success");
}

function markField(field, isValid) {
  field.classList.remove("is-error");
  field.classList.remove("is-success");
  if (isValid === true) {
    field.classList.add("is-success");
  } else {
    field.classList.add("is-error");
  }
}

function clearField(field) {
  field.classList.remove("is-error");
  field.classList.remove("is-success");
}

function isWholeNumberInRange(value, minimum, maximum) {
  var number = Number(value);
  if (value === "") {
    return false;
  }
  if (Number.isInteger(number) === false) {
    return false;
  }
  if (number < minimum || number > maximum) {
    return false;
  }
  return true;
}

function setupShopPage() {
  var form = document.getElementById("order-form");
  if (form === null) {
    return;
  }

  var productSelect = document.getElementById("order-product");
  var sizeSelect = document.getElementById("order-size");
  var quantityInput = document.getElementById("order-quantity");
  var totalOutput = document.getElementById("order-total");
  var resultBox = document.getElementById("order-result");
  var productCards = document.querySelectorAll("#product-list article");
  var chooseLinks = document.querySelectorAll("#product-list .btn");
  var defaultTotalText = totalOutput.textContent;

  function highlightSelectedCard() {
    for (var i = 0; i < productCards.length; i++) {
      var title = productCards[i].querySelector(".card-title").textContent;
      if (title === productSelect.value) {
        productCards[i].classList.add("is-selected");
      } else {
        productCards[i].classList.remove("is-selected");
      }
    }
  }

  function updateTotal() {
    var price = productPrices[productSelect.value];
    var quantityIsValid = isWholeNumberInRange(quantityInput.value, 1, 10);

    if (price === undefined || quantityIsValid === false) {
      totalOutput.textContent = defaultTotalText;
      return;
    }

    var quantity = Number(quantityInput.value);
    var total = price * quantity;
    totalOutput.textContent = quantity + " x " + productSelect.value + " = " + formatPrice(total);
  }

  for (var i = 0; i < chooseLinks.length; i++) {
    chooseLinks[i].addEventListener("click", function (event) {
      var card = event.currentTarget.closest("article");
      var title = card.querySelector(".card-title").textContent;
      productSelect.value = title;
      clearField(productSelect);
      hideMessage(resultBox);
      highlightSelectedCard();
      updateTotal();
    });
  }

  productSelect.addEventListener("change", function () {
    clearField(productSelect);
    highlightSelectedCard();
    updateTotal();
  });

  sizeSelect.addEventListener("change", function () {
    clearField(sizeSelect);
  });

  quantityInput.addEventListener("input", function () {
    clearField(quantityInput);
    updateTotal();
  });

  form.addEventListener("submit", function (event) {
    var problems = [];

    if (productSelect.value === "") {
      problems.push("Choose a product.");
      markField(productSelect, false);
    } else {
      markField(productSelect, true);
    }

    if (sizeSelect.value === "") {
      problems.push("Choose a size.");
      markField(sizeSelect, false);
    } else {
      markField(sizeSelect, true);
    }

    if (isWholeNumberInRange(quantityInput.value, 1, 10) === false) {
      problems.push("Quantity must be a whole number from 1 to 10.");
      markField(quantityInput, false);
    } else {
      markField(quantityInput, true);
    }

    if (problems.length > 0) {
      event.preventDefault();
      showMessage(resultBox, problems.join(" "), "is-error");
      return;
    }

    showMessage(resultBox, "Opening the review page. No order is placed.", "is-success");
  });
}

function setupEventsPage() {
  var form = document.getElementById("event-interest-form");
  if (form === null) {
    return;
  }

  var activitySelect = document.getElementById("event-choice");
  var attendanceInput = document.getElementById("event-attendance");
  var resultBox = document.getElementById("event-form-result");

  activitySelect.addEventListener("change", function () {
    clearField(activitySelect);
    if (activitySelect.value === "") {
      hideMessage(resultBox);
    } else {
      showMessage(resultBox, "Selected: " + activitySelect.value + ". No date is confirmed yet.", "is-success");
    }
  });

  attendanceInput.addEventListener("input", function () {
    clearField(attendanceInput);
  });

  form.addEventListener("submit", function (event) {
    var problems = [];

    if (activitySelect.value === "") {
      problems.push("Choose an activity.");
      markField(activitySelect, false);
    } else {
      markField(activitySelect, true);
    }

    if (isWholeNumberInRange(attendanceInput.value, 1, 5) === false) {
      problems.push("Number of people must be a whole number from 1 to 5.");
      markField(attendanceInput, false);
    } else {
      markField(attendanceInput, true);
    }

    if (problems.length > 0) {
      event.preventDefault();
      showMessage(resultBox, problems.join(" "), "is-error");
      return;
    }

    showMessage(resultBox, "Opening the review page. No place is reserved.", "is-success");
  });
}

function setupReviewPage() {
  var notice = document.getElementById("request-not-submitted");
  if (notice === null) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var product = params.get("product");
  var size = params.get("size");
  var quantity = params.get("quantity");
  var activity = params.get("activity");
  var people = params.get("people");
  var summary = "";

  if (product !== null && productPrices[product] !== undefined && isWholeNumberInRange(quantity, 1, 10) === true) {
    var total = productPrices[product] * Number(quantity);
    summary = "You selected " + quantity + " x " + product + ", size " + size + ". Total: " + formatPrice(total) + ". No order has been placed.";
  }

  if (activity !== null && isWholeNumberInRange(people, 1, 5) === true) {
    summary = "You selected " + activity + " for " + people + " people. No place has been reserved.";
  }

  if (summary !== "") {
    notice.textContent = summary;
  }
}

setupShopPage();
setupEventsPage();
setupReviewPage();