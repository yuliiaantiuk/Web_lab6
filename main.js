async function saveAccordion() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const newAccordion = { title, content };

    // Отримуємо вже існуючі дані з сервера
    let existingData = [];
    try {
        const response = await fetch("http://localhost:8000/accordion");
        if (response.ok) {
            existingData = await response.json();
        }
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
    }

    // Додаємо новий елемент до масиву
    existingData.push(newAccordion);

    // Надсилаємо POST-запит із оновленими даними
    try {
        const response = await fetch("http://localhost:8000/accordion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(existingData),
        });

        if (response.ok) {
            alert("Дані успішно збережено!");
            document.getElementById("addAccordionForm").reset();
        } else {
            alert("Не вдалося зберегти дані.");
        }
    } catch (error) {
        console.error("Помилка при збереженні даних:", error);
    }
}
