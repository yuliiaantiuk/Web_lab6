document.addEventListener("DOMContentLoaded", function () {

    // Отримати дані з сервера
    fetch("http://localhost:8000/accordion")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then(data => {
            // Знайти контейнер для додавання нових елементів
            const container = document.querySelector('.item3');

            // Відобразити кожен елемент
            data.forEach(item => {
                // Створюємо новий блок для кожного елемента
                const div = document.createElement("div");
                div.className = "accordion-item"; // Можна додати клас для стилізації
                div.textContent = `Title: ${item.title}, Content: ${item.content}`;

                // Додаємо створений блок у контейнер
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error fetching accordion data:", error);
        });
});
