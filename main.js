document.addEventListener('DOMContentLoaded', function() {
    const activeUserJSON = sessionStorage.getItem('eazeit_active_user');
    
    if (activeUserJSON) {
        const activeUser = JSON.parse(activeUserJSON);
        updateNavbarForLoggedInUser(activeUser);
    }
});

function updateNavbarForLoggedInUser(user) {
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    
    loginLinks.forEach(link => {
        if (link.classList.contains('btn') || link.textContent.includes('Login / Register')) {
            link.outerHTML = `
                <div class="d-flex align-items-center gap-3">
                    <a href="profile.html" class="text-teal-400 hover:text-teal-300 font-semibold text-sm transition-colors duration-200 text-decoration-none flex items-center gap-1.5">
                        Hello, ${user.firstName}
                    </a>
                    <button onclick="logoutUser()" class="bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-slate-900 border border-rose-500/40 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all duration-200 active:scale-95">
                        Logout
                    </button>
                </div>
            `;
        } 
        else if (link.textContent.trim() === 'Login') {
            link.outerHTML = `
                <a href="profile.html" class="text-slate-300 hover:text-teal-400 font-medium py-2 border-b border-slate-700 text-sm block transition-colors duration-200 text-decoration-none">
                    My Profile
                </a>
                <a href="#" onclick="event.preventDefault(); logoutUser();" class="text-rose-400 hover:text-rose-300 font-medium py-2 border-b border-slate-700 text-sm block transition-colors duration-200 text-decoration-none">
                    Logout
                </a>
            `;
        }
        else {
            link.outerHTML = `
                <a href="profile.html" class="hover:text-teal-400 transition-colors text-decoration-none text-slate-400">My Profile</a>
            `;
        }
    });

    const registerLinks = document.querySelectorAll('a[href="signup.html"]');
    registerLinks.forEach(link => {
        if (link.textContent.trim() === 'Register') {
            link.style.display = 'none';
        } else if (link.textContent.trim() === 'Register Account') {
            link.style.display = 'none';
        }
    });
}

function logoutUser() {
    sessionStorage.removeItem('eazeit_active_user');
    showToast('Logged out successfully. See you soon!', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1200);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-teal-400 text-slate-900' : 'bg-rose-500 text-white';
    
    toast.className = `fixed bottom-5 right-5 ${bgClass} font-bold px-6 py-4 rounded-lg shadow-2xl z-[9999] transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-2`;
    toast.style.animation = 'slideIn 0.3s ease-out forwards';
    
    if (!document.getElementById('toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.innerText = `
            @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
