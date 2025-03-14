// Modifikatsiyalar ma'lumotlari
const modifications = {
    'Cobalt': [
        { name: "GX-Stayle Plus", price: '147 916 000' },
        { name: "GX-Midnight AT", price: '155 231 000' }
    ],
    'Lacetti': [
        { name: "L-Style Plus", price: '169 118 000' },
        { name: "GN-Elegant AT", price: '168 342 000' }
    ],
    'Onix': [
        { name: "LS MT", price: '176 900 000' },
        { name: "1LT MT", price: '180 761 000' },
        { name: "3LT MT", price: '184 750 000' },
        { name: "LTZ TURBO AT", price: '199 899 840' },
        { name: "PREMIER 2 TURBO AT PLUS", price: '221 640 160' },
        { name: "TURBO AT PLUS REDLINE", price: '230 624 800' }
    ],
    'Malibu-2': [
        { name: "1LT", price: '375 000 640' },
        { name: "2LT", price: '390 000 800' },
        { name: "LTZ", price: '419 000 960' },
    ],
    'Damas': [
        { name: "D2 STYLE PLUS", price: '96 932 000' },
        { name: "D11 STYLE PLUS gruzavoy", price: '93 156 000' },
        { name: "D3 STYLE PLUS pol-gruzavoy", price: '96 449 000' }
    ],
    'Labo': [
        { name: "LB2 PLUS NEW", price: '96 370 000' },
    ],
    'Tracker': [
        { name: " TRK LS PLUS ", price: '220 951 000' },
        { name: " TRK LTZ PLUS", price: '244 108 480' },
        { name: " TRK PREMIER PLUS", price: '272 656 160' },
        { name: " TRK REDLINE", price: '282 474 080' }
    ],
    'Captiva 5': [
        { name: "1LT", price: '299 900 000' },
        { name: "2LT", price: '319 900 000' },
        { name: "PREMIER", price: '349 900 000' },
    ],
    'Equinox': [
        { name: "1LT AWD", price: '408 450 560' },
        { name: "2LT AWD", price: '441 000 000' },
        { name: "3LT AWD", price: '472 500 000' },
    ],
    'Traverse': [
        { name: "PREMIER AT", price: '737 730 560' }
    ],
    'Tahoe': [
        { name: "PREMIER AT", price: '1 109 274 880' }
    ]
};

// Telegram botga buyurtma ma'lumotlarini yuborish
const BOT_TOKEN = "8097350099:AAHF0Ajt7b4KGxyk2nK7Fb5CP0p8rp8P9Zs"; // O'z bot tokenizni qo'ying
const CHAT_ID = "724179446"; // O'z chat ID ingizni qo'ying

async function sendOrderToTelegram(userName, userPhone, carId, modification) {
    const message = `
        Yangi buyurtma!
        Ism: ${userName}
        Telefon: ${userPhone}
        Avtomobil: ${carId}
        Modifikatsiya: ${modification}
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        if (response.ok) {
            alert("Buyurtma muvaffaqiyatli yuborildi!");
        } else {
            alert("Xatolik yuz berdi. Iltimos, qayta urunib ko'ring.");
        }
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Xatolik yuz berdi. Iltimos, qayta urunib ko'ring.");
    }
}

// Modal oynani ochish
function showModifications(carId) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const modalTitle = document.getElementById("modal-title");
    const carIdInput = document.getElementById("car-id");

    // Modal sarlavhasini o'rnatish
    modalTitle.textContent = `Avtomobil ${carId} Modifikatsiyalari`;

    // Modifikatsiyalarni ko'rsatish
    modalBody.innerHTML = modifications[carId].map(mod => `
        <label>
            <input type="radio" name="modification" value="${mod.name}">
            ${mod.name} - ${mod.price}
        </label>
    `).join("");

    // Avtomobil ID sini o'rnatish
    carIdInput.value = carId;

    // Modalni ko'rsatish
    modal.style.display = "flex";
}

// Modal oynani yopish
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Buyurtma berish
function orderCar() {
    const selectedModification = document.querySelector('input[name="modification"]:checked');
    const userName = document.getElementById("user-name").value;
    const userPhone = document.getElementById("user-phone").value;
    const carId = document.getElementById("car-id").value;

    if (!selectedModification || !userName || !userPhone) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    const modification = selectedModification.value;

    // Telegram botga buyurtma ma'lumotlarini yuborish
    sendOrderToTelegram(userName, userPhone, carId, modification);

    // Modalni yopish
    closeModal();
}
