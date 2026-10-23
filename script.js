function getOrderDetails() {
    let materialSelect = document.getElementById('material');
    let materialName = materialSelect.options[materialSelect.selectedIndex].text;
    let materialPrice = parseFloat(materialSelect.value);
    
    let quantity = parseFloat(document.getElementById('quantity').value);
    let shippingCost = parseFloat(document.getElementById('distance').value);

    if (isNaN(quantity) || quantity <= 0) {
        return null;
    }

    let totalMaterial = materialPrice * quantity;
    let finalTotal = totalMaterial + shippingCost;

    if (quantity >= 30) {
        let discount = finalTotal * 0.05;
        finalTotal = finalTotal - discount;
    }

    return {
        total: finalTotal,
        text: `طلب توريد شحنة من موقعك الإلكتروني:\n- الصنف: ${materialName}\n- الكمية المطلوبة: ${quantity} متر مكعب\n- إجمالي السعر (شامل النقل): ${finalTotal} جنيه مصري.`
    };
}

function calculateTotal() {
    let details = getOrderDetails();
    if (!details) {
        alert("الرجاء إدخال كمية صحيحة!");
        return;
    }
    document.getElementById('totalPrice').innerText = "الإجمالي: " + details.total + " جنيه مصري";
}

function sendToWhatsApp(event) {
    // 1. منع المتصفح تماماً من فتح أي صفحة بيضاء
    event.preventDefault(); 
    
    let details = getOrderDetails();
    if (!details) {
        alert("برجاء تحديد كمية التوريد المطلوبة أولاً!");
        return;
    }

    document.getElementById('totalPrice').innerText = "الإجمالي: " + details.total + " جنيه مصري";
    

    let myNumber = "201500319211"; 
    

    let url = "whatsapp://send?phone=" + myNumber + "&text=" + encodeURIComponent(details.text);
    
    
    window.location.href = url;
}
