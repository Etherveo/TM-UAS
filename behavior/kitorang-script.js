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

// Handling Window Resize (Update reset point kalo layar berubah)
// Walaupun getResetPoint() dipanggil tiap frame, ini buat memastikan layout flow bener
window.addEventListener('resize', () => {
    // Reset posisi sebentar biar ga nyangkut di tengah antah berantah
    // container.scrollLeft = 0; 
});

// Mulai
autoScrollLoop();