document.addEventListener('DOMContentLoaded', function () {
    const rainyCard = document.querySelector('.rainy');
    for (let i = 0; i < 50; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 200 + 'px';
        raindrop.style.animationDelay = Math.random() * -2 + 's';
        rainyCard.appendChild(raindrop);
    }

    const snowyCard = document.querySelector('.snowy');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 200 + 'px';
        snowflake.style.animationDelay = Math.random() * -10 + 's';
        snowyCard.appendChild(snowflake);
    }
});