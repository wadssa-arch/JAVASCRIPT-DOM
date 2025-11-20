document.addEventListener('DOMContentLoaded', () => {

    const toggleMenu = () => {
        const menu = document.getElementById('navMenu');
        if (menu) menu.classList.toggle('active');
    };
    window.toggleMenu = toggleMenu;

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const headerHeight = 70;
        const sectionPosition = section.offsetTop - headerHeight;

        window.scrollTo({ top: sectionPosition, behavior: 'smooth' });

        const menu = document.getElementById('navMenu');
        if (menu) menu.classList.remove('active');
    };
    window.scrollToSection = scrollToSection;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('registrationForm');
        if (!form) return;

        form.dataset.submitting = 'true';

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();

        if (!nome || !email) {
            alert('Por favor, preencha os campos obrigatórios!');
            form.dataset.submitting = 'false';
            return;
        }

        const formData = {
            nome,
            email,
            rua: form.rua.value.trim(),
            numero: form.numero.value.trim(),
            bairro: form.bairro.value.trim(),
            cidade: form.cidade.value.trim(),
            estado: form.estado.value.trim(),
            tiposervico: form.tiposervico.value,
            diadoservico: form.diadoservico.value
        };

        let cadastro = JSON.parse(localStorage.getItem('cadastro') || '[]');
        cadastro.push(formData);
        localStorage.setItem('cadastro', JSON.stringify(cadastro));

        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: "smooth", block: 'center' });
        }

        setTimeout(() => {
            if (successMessage) successMessage.style.display = 'none';
        }, 5000);

        setTimeout(() => {
            form.reset();
            form.dataset.submitting = 'false';
        }, 1500);

        if (typeof exibirCadastro === "function") {
            exibirCadastro();
        }
    };

    window.handleSubmit = handleSubmit;

    window.limparTabela = () => {
        localStorage.removeItem('cadastro');
        if (typeof exibirCadastro === "function") {
            exibirCadastro();
        }
    };

});
