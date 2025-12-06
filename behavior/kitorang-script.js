const container = document.getElementById('scrollContainer');
const originalSet = document.getElementById('set-original');

let scrollSpeed = 1; // Kecepatan auto scroll
let isHovered = false;

// 1. Hitung lebar satu set kartu (Original)
// Kita pake offsetWidth biar dapet lebar + padding yang akurat
function getResetPoint() {
    return originalSet.offsetWidth; 
}

// 2. Auto Scroll Loop
function autoScrollLoop() {
    if (!isHovered) {
        container.scrollLeft += scrollSpeed;
        
        // LOGIKA RESET MULUS:
        // Jika posisi scroll sekarang >= lebar set original
        // Artinya user sekarang melihat set clone yang posisinya persis sama dengan set original di awal
        // Maka kita reset scroll ke 0.
        // Dikurang 1 atau 2 pixel kadang perlu buat kompensasi browser rounding, tapi biasanya >= cukup.
        
        const resetPoint = getResetPoint();
        
        if (container.scrollLeft >= resetPoint) {
            container.scrollLeft = 0;
            // Atau kalau mau lebih presisi jika scroll speed > 1:
            // container.scrollLeft = container.scrollLeft - resetPoint;
        }
    }
    
    requestAnimationFrame(autoScrollLoop);
}

// 3. User Interaction Listeners
container.addEventListener('mouseenter', () => { isHovered = true; });
container.addEventListener('mouseleave', () => { isHovered = false; });

container.addEventListener('touchstart', () => { isHovered = true; });
container.addEventListener('touchend', () => { 
    setTimeout(() => { isHovered = false; }, 1000); 
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

// Handling Window Resize (Update reset point kalo layar berubah)
// Walaupun getResetPoint() dipanggil tiap frame, ini buat memastikan layout flow bener
window.addEventListener('resize', () => {
    // Reset posisi sebentar biar ga nyangkut di tengah antah berantah
    // container.scrollLeft = 0; 
});

// Mulai
autoScrollLoop();