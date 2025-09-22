// Маска для ввода ИНН (только цифры, максимум 10)
document.addEventListener("DOMContentLoaded", () => {
  const innInput = document.getElementById("innInput");
  innInput.addEventListener("input", () => {
    innInput.value = innInput.value.replace(/\D/g, "").slice(0, 10);
  });
});

// Проверка ИНН юр. лица (10 цифр с контрольной суммой)
function isValidInnCompany(inn) {
  if (!/^\d{10}$/.test(inn)) return false;

  const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += coefficients[i] * parseInt(inn[i], 10);
  }

  const controlDigit = (sum % 11) % 10;
  return controlDigit === parseInt(inn[9], 10);
}

async function searchCompany() {
  const inn = document.getElementById("innInput").value.trim();
  const errorDiv = document.getElementById("error");
  const resultDiv = document.getElementById("result");
  errorDiv.textContent = "";
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";

  if (!isValidInnCompany(inn)) {
    errorDiv.textContent = "Введите корректный ИНН организации (10 цифр).";
    return;
  }

  try {
    const response = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token df3ed55903a1ba174f788eaa906d5e89a554ad40"
      },
      body: JSON.stringify({ query: inn })
    });

    if (!response.ok) {
      throw new Error("Ошибка запроса: " + response.status);
    }

    const data = await response.json();

    if (data.suggestions.length === 0) {
      errorDiv.textContent = "Компания с таким ИНН не найдена.";
      return;
    }

    const company = data.suggestions[0].data;

    resultDiv.innerHTML = `
      <h2>${company.name.full_with_opf || "Название не найдено"}</h2>
      <p><b>ИНН:</b> ${company.inn}</p>
      <p><b>ОГРН:</b> ${company.ogrn || "-"}</p>
      <p><b>Адрес:</b> ${company.address ? company.address.value : "-"}</p>
      <p><b>Руководитель:</b> ${company.management ? company.management.name + " (" + company.management.post + ")" : "-"}</p>
      <p><b>Статус:</b> ${company.state.status === "ACTIVE" ? "Действующая" : "Не действующая"}</p>
    `;
    resultDiv.style.display = "block";

  } catch (err) {
    errorDiv.textContent = "Ошибка: " + err.message;
  }
}
