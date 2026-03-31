// Modal Logic
const modal = document.getElementById('partner-modal');
const openBtn = document.getElementById('open-partner-form');
const closeBtn = document.querySelector('.close-modal');

if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Form Submission (Real Integration via Formspree API)
const form = document.querySelector('.partner-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'TRANSMITTING...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const action = form.getAttribute('action');

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitBtn.textContent = 'INQUIRY SENT';
                submitBtn.style.background = 'var(--secondary-container)';
                submitBtn.style.color = 'var(--on-secondary-container)';

                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            } else {
                throw new Error('Transmission Failure');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            submitBtn.textContent = 'ERROR: TRY AGAIN';
            submitBtn.style.background = 'var(--error)';
            submitBtn.style.color = 'white';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        }
    });
}
