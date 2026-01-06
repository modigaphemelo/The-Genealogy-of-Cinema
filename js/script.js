// ====== SIDEBAR TOGGLE ======
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Initializing sidebar...');
    
    // Get elements
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Create overlay if it doesn't exist
    let menuOverlay = document.getElementById('menuOverlay');
    if (!menuOverlay) {
        console.log('Creating menu overlay...');
        menuOverlay = document.createElement('div');
        menuOverlay.id = 'menuOverlay';
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // Check if we have all elements
    if (!menuToggle || !sidebar) {
        console.error('Missing required elements for sidebar!');
        console.log('menuToggle:', menuToggle);
        console.log('sidebar:', sidebar);
        return;
    }
    
    console.log('All sidebar elements found');
    
    // Toggle sidebar function
    function toggleSidebar() {
        console.log('Toggling sidebar...');
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Prevent scrolling when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close sidebar function
    function closeSidebar() {
        console.log('Closing sidebar...');
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add event listeners
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleSidebar();
    });
    
    menuOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking outside (for desktop)
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuToggle) {
            closeSidebar();
        }
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Close sidebar when clicking links (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // ====== ACTIVE LINK HIGHLIGHTING ======
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.sidebar a');
        
        links.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            // Simple matching logic
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            
            // Homepage special case
            if ((linkHref === 'index.html' || linkHref === './' || linkHref === '/') && 
                (currentPage === 'index.html' || currentPage === '')) {
                link.classList.add('active');
            }
            
            // Critics page
            if (linkHref === 'critics.html' && currentPage === 'critics.html') {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveLink();
    
    // ====== CURRENT YEAR IN FOOTER ======
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('Sidebar initialization complete');
});

// ====== WINDOW RESIZE HANDLER ======
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Auto-close sidebar when resizing to desktop
    if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});
