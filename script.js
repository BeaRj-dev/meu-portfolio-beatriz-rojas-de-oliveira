
document.addEventListener('DOMContentLoaded', () => {

    // --- Temas ---
    const btnTema = document.getElementById('theme-toggle');
    const corpo = document.body;

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            corpo.classList.toggle('tema-claro'); // Alterna a classe no body
            
            // Feedback visual do texto do botão
            if (corpo.classList.contains('tema-claro')) {
                btnTema.textContent = "Tema Escuro";
            } else {
                btnTema.textContent = "Tema Claro";
            }
        });
    }

    // Formulário de contato
    const form = document.getElementById('formContato');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio para validar

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Regex para validação de e-mail
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Verificação de campos vazios
            if (nome === "" || email === "" || mensagem === "") {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Verificação do formato do e-mail
            if (!regexEmail.test(email)) {
                alert("Por favor, insira um e-mail válido (usuario@dominio.com).");
                return;
            }

            // Simulação de envio com sucesso
            alert("Mensagem enviada com sucesso!");[cite, 1]
            form.reset(); // Limpa os campos após o envio
        });
    }

    // Animação
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo'); // Ativa animação CSS
            }
        });
    }, { threshold: 0.2 });

    // Aplica o efeito em todas as seções e containers
    document.querySelectorAll('section, .conteudo, .formacao').forEach(el => {
        el.classList.add('revelar');
        observer.observe(el);
    });
    document.addEventListener('DOMContentLoaded', () => {
  

    // Observador para animar os cards quando aparecerem no scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
            }
            else {
                entry.target.classList.remove('ativo');
            }
        });
    }, { threshold: 0.1 });

    // Seleciona as seções e também os cards individuais para animar
    document.querySelectorAll('section, h1, h2, h3, p, .card-info, .card-projeto, img, li, form').forEach(el => {
        el.classList.add('revelar');
        observer.observe(el);
    });
    
});
});