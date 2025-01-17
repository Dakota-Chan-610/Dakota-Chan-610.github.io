document.querySelector('nav').addEventListener('click', function(e) {
    if(e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    }
});
