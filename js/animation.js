const typedTextElementH1 = document.querySelector('.typed-text h1');
const typedTextElementH4 = document.querySelector('.typed-text h4');
const textArray = ["ToDo приложение", "список задач на сегодня."];
const typingDelay = 60; // Задержка между символами
const newTextDelay = 150; // Задержка между текстами
let textIndex = 0;
let characterIndex = 0;

function type() {
    if (textIndex === 0) {
        // Для h1
        if (characterIndex < textArray[0].length) {
            typedTextElementH1.textContent += textArray[0].charAt(characterIndex);
            characterIndex++;
            setTimeout(type, typingDelay);
        } else {
            characterIndex = 0;
            textIndex++;
            setTimeout(() => {
                typedTextElementH4.textContent = ''; // Очистка h4 перед вводом нового текста
                setTimeout(type, newTextDelay);
            }, newTextDelay);
        }
    } else {
        // Для h4
        if (characterIndex < textArray[1].length) {
            typedTextElementH4.textContent += textArray[1].charAt(characterIndex);
            characterIndex++;
            setTimeout(type, typingDelay);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typedTextElementH1.textContent = ''; // Начальное состояние h1
    type(); // Запускаем ввод текста сразу при загрузке
});

// Остановка анимации после первого ввода
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы
});
