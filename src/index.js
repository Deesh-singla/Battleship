import './style.css';
if (document.querySelector('button')) {
    const setItem = () => {
        let name = document.getElementById('name').value || 'Captain';
        localStorage.setItem('name', name);
        window.location.href = 'main.html';
    };
    document.querySelector('button').addEventListener('click', setItem);
}
