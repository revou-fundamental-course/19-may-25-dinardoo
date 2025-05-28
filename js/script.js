document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input-suhu");
    const output = document.getElementById("hasil-suhu");
    const introText = document.getElementById("intro-text");
    const detail = document.getElementById("detail-suhu");
    const reverseBtn = document.getElementById("reverse-btn");
    const autoSwitch = document.getElementById("auto-switch");
    const convertBtn = document.querySelector(".bg-lightseagreen");
    const resetBtn = document.querySelector(".bg-lightcoral");

    let isReversed = false;
    
    function convertTemperature() {
        const value = parseFloat(input.value);
        if (isNaN(value)) {
            output.value = "";
            detail.value = "";
            return;
        }

        let result, explanation;
        if (!isReversed) {
            result = (value * 9 / 5) + 32;
            explanation = `${value}°C x 9/5 + 32 = ${result.toFixed(2)}°F`;
            output.value = result.toFixed(2);
        } else {
            result = (value - 32) * 5 / 9;
            explanation = `(${value}°F - 32) x 5/9 = ${result.toFixed(2)}°C`;
            output.value = result.toFixed(2);
        }

        detail.value = explanation;

    }

    convertBtn.addEventListener("click", convertTemperature);
    input.addEventListener("input", () => {
        if (autoSwitch.checked) {
            convertTemperature();
        }
    });

    resetBtn.addEventListener("click", () => {
        input.value = "";
        output.value = "";
        detail.value = "";
    });
    //fungsi untuk reverse button
    reverseBtn.addEventListener("click", () => {
        isReversed = !isReversed;

        const inputLabel = document.getElementById("input-label");
        const outputLabel = document.querySelector("label[for='hasil-suhu']");

        if (isReversed) {
            introText.textContent = "Masukkan suhu derajat Fahrenheit (°F) ke kotak dibawah...";
            inputLabel.textContent = "Fahrenheit (°F):";
            outputLabel.textContent = "Celcius (°C):";
        } else {
            introText.textContent = "Masukkan suhu derajat Celcius (°C) ke kotak dibawah...";
            inputLabel.textContent = "Celcius (°C):";
            outputLabel.textContent = "Fahrenheit (°F):";
        }

        // Tukar isi input dan output
        const tempInputValue = input.value;
        input.value = output.value;
        output.value = tempInputValue;

        convertTemperature(); // langsung konversi ulang setelah dibalik
    });
    
    //menghapus hasil klo dihapus
    input.addEventListener("input", () => {
    const value = input.value.trim();
        
        if (value === "") {
            output.value = "";
            detail.value = "";
            return; // Jangan lanjut konversi kalau kosong
        }
        
        if (output.value !== "") {
            convertTemperature();
        }

    });

});
