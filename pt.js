let cart = [];

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    let totalCount = 0;
    let totalPrice = 0;
    
    cart.forEach(item => {
        totalCount += item.qty;
        totalPrice += (item.price * item.qty);
    });

    document.getElementById('badgeCount').innerText = totalCount;
    document.getElementById('totalItemsCount').innerText = totalCount;
    document.getElementById('totalCartPrice').innerText = "₹" + totalPrice;

    let floatingBar = document.getElementById('floatingCartBar');
    if (totalCount > 0) {
        floatingBar.style.display = "flex";
    } else {
        floatingBar.style.display = "none";
    }
}

function openCartModal() {
    let modal = document.getElementById('cartModal');
    let container = document.getElementById('cartItemsContainer');
    let footer = document.getElementById('modalFooter');
    
    modal.style.display = "flex";
    
    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#686b78; padding:20px;'>Your cart is empty. Add some delicious items!</p>";
        footer.style.display = "none";
        return;
    }

    let html = "";
    let grandTotal = 0;
    
    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        html += `
            <div class="cart-item-row">
                <span><b>${item.name}</b> (x${item.qty})</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });

    html += `<div style="text-align:right; font-weight:700; font-size:16px; margin-top:15px; border-top:1px solid #ddd; padding-top:10px;">Total: ₹${grandTotal}</div>`;
    
    container.innerHTML = html;
    footer.style.display = "block";
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = "none";
}

function placeFinalOrder() {
    let address = document.getElementById('userAddress').value.trim();
    let payment = document.getElementById('paymentType').value;

    if (!address) {
        alert("Please enter your delivery address or location!");
        return;
    }

    if (payment === "cod") {
        alert("🎉 Order Successfully Placed!\nThank you for ordering from Priyanka Bite & Bites Cafe.\nPayment Mode: Cash on Delivery.");
    } else {
        alert("📱 UPI / QR Code Generated Successfully!\nPlease complete your online payment to confirm the order at Priyanka Bite & Bites Cafe.");
    }

    cart = [];
    updateCartUI();
    closeCartModal();
}

function filterMenu(category) {
    let rows = document.querySelectorAll('.food-row');
    rows.forEach(row => {
        let cat = row.getAttribute('data-category');
        if (category === 'all' || cat === category) {
            row.style.display = "flex";
        } else {
            row.style.display = "none";
        }
    });
}

function filterType(type) {
    let rows = document.querySelectorAll('.food-row');
    rows.forEach(row => {
        let t = row.getAttribute('data-type');
        if (t === type) {
            row.style.display = "flex";
        } else {
            row.style.display = "none";
        }
    });
}

function searchCafeMenu() {
    let query = document.getElementById('mainSearchInput').value.toLowerCase().trim();
    let rows = document.querySelectorAll('.food-row');

    rows.forEach(row => {
        let name = row.getAttribute('data-name');
        if (name.includes(query) || query === "") {
            row.style.display = "flex";
        } else {
            row.style.display = "none";
        }
    });
}