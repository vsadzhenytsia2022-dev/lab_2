// 1. Зберігання та відображення даних
const browserData = {
    os: navigator.platform,
    browser: navigator.userAgent.substring(0, 50) + "...", // обрізаємо довгий рядок
    language: navigator.language
};

localStorage.setItem('userDeviceInfo', JSON.stringify(browserData));

const footer = document.querySelector('footer') || document.createElement('footer');
document.body.appendChild(footer);
// Виводимо гарний текст замість JSON
footer.innerHTML = `<hr><p><b>Ваша система:</b> ${browserData.os} | <b>Мова:</b> ${browserData.language}</p>`;

// 2. Коментарі з API
async function loadComments() {
    // Встановлюємо твій номер варіанту
    const variant = 21; 
    
    try {
        // Запит до сервера з використанням твого варіанту
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`);
        const comments = await response.json();

        const commentsContainer = document.createElement('div');
        commentsContainer.innerHTML = '<h2>Відгуки попередніх роботодавців (Варіант 21)</h2>';
        
        comments.forEach(comment => {
            const commentItem = document.createElement('p');
            // Виводимо ім'я коментатора та сам текст
            commentItem.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
            commentsContainer.appendChild(commentItem);
        });
        
        document.body.appendChild(commentsContainer);
    } catch (error) {
        console.error("Помилка завантаження коментарів:", error);
    }
}
loadComments();

// 3. Модальне вікно (таймер 1 хв)
setTimeout(() => {
    const modal = document.getElementById('modal');
    if(modal) modal.style.display = 'block';
}, 60000);

// 4. Тема
const themeBtn = document.createElement('button');
themeBtn.innerText = "Змінити тему";
themeBtn.style.margin = "10px 0";
document.body.prepend(themeBtn);

themeBtn.onclick = () => document.body.classList.toggle('dark-theme');

function autoTheme() {
    const hour = new Date().getHours();
    if (hour < 7 || hour >= 21) {
        document.body.classList.add('dark-theme');
    }
}
autoTheme();

