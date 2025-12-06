document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.karawo-card');
    
    // Config
    const tiltStrength = 15; // Derajat kemiringan maksimal
    const fadeOutThreshold = 0.05; // HANYA 5% dari atas layar baru mulai hilang (biar ga kecepetan)
    const exitDistance = 400; // Jarak piksel fade-out diperpanjang (biar halus)

    function handleScroll() {
        // Trigger muncul sedikit lebih longgar
        const triggerBottom = window.innerHeight * 0.95; 
        const triggerTop = window.innerHeight * fadeOutThreshold; 

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top;
            const cardCenter = cardTop + (rect.height / 2);
            const screenCenter = window.innerHeight / 2;

            // 1. ENTRY ANIMATION (Muncul dari bawah)
            if (cardTop < triggerBottom) {
                
                // --- TILT LOGIC (Mobile & Desktop) ---
                
                // Hitung jarak dari tengah layar
                const distFromCenter = cardCenter - screenCenter;
                
                // Normalisasi jarak (-1 sampai 1)
                // Diperluas rangenya biar rotasinya lebih santai
                let normalizedDist = distFromCenter / (window.innerHeight * 0.7);
                
                // Clamp nilai
                if (normalizedDist > 1) normalizedDist = 1;
                if (normalizedDist < -1) normalizedDist = -1;

                // Arah tilt
                const isRight = card.dataset.tilt === 'right';
                let rotateDeg = normalizedDist * tiltStrength;

                // Balik arah rotasi kalau kanan
                if (isRight) rotateDeg = -rotateDeg;

                // Translasi Y halus
                let translateY = Math.max(0, normalizedDist * 50);

                // --- EXIT ANIMATION (Hilang ke atas) ---
                if (cardTop < triggerTop) {
                    // Masuk zona fade out
                    const exitProgress = (triggerTop - cardTop) / exitDistance;
                    
                    // Opacity turun pelan-pelan
                    card.style.opacity = Math.max(0, 1 - exitProgress);
                    
                    // Geser ke atas pelan-pelan
                    translateY -= exitProgress * 80; 
                } else {
                    // ZONA AMAN: Paksa Opacity 1 (Fix masalah "mentok tapi transparan")
                    card.style.opacity = 1;
                }

                // Apply Transform
                card.style.transform = `translateY(${translateY}px) rotate(${rotateDeg}deg)`;

            } else {
                // Belum muncul (di bawah layar)
                card.style.opacity = 0;
                card.style.transform = `translateY(100px) rotate(${card.dataset.tilt === 'right' ? -10 : 10}deg)`;
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

const dropdownMenu = document.getElementById('dropdown-menu');
// Mengambil SEMUA link item menu untuk animasi
const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-link');
const toggleButton = document.getElementById('dropdown-toggle-btn');
const staggerDelay = 50; // Jeda (milidetik) antar item menu (0.05 detik)
/**
 * Fungsi untuk membuka/menutup dropdown menu dengan animasi staggered.
 */
function toggleDropdown() {
    const isActive = dropdownMenu.classList.toggle('active');
    toggleButton.setAttribute('aria-expanded', isActive);
    if (isActive) {
        // SAAT MEMBUKA: Terapkan delay berurutan (dari atas ke bawah)
        // Ini memastikan item muncul satu per satu
        dropdownItems.forEach((item, index) => {
            const delaySeconds = (index * staggerDelay) / 1000;
            // Mengatur properti CSS transition-delay secara langsung
            item.style.transitionDelay = `${delaySeconds}s`;
        });
    } else {
        // SAAT MENUTUP: Terapkan delay terbalik (dari bawah ke atas) 
        // Ini membuat efek menutup lebih rapi (yang terakhir muncul, duluan hilang)
        dropdownItems.forEach((item, index) => {
            const reverseIndex = dropdownItems.length - 1 - index;
            const delaySeconds = (reverseIndex * staggerDelay) / 1000;
            item.style.transitionDelay = `${delaySeconds}s`;
        });
    }
}
// Opsional: Tutup dropdown jika user klik di luar area menu atau tombol
document.addEventListener('click', (event) => {
    const isClickInsideDropdown = dropdownMenu.contains(event.target) || toggleButton.contains(event.target);
    if (!isClickInsideDropdown && dropdownMenu.classList.contains('active')) {
        toggleDropdown(); // Panggil fungsi untuk menutup
    }
});