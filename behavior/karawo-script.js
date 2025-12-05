document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.karawo-card');
    
    // Config
    const tiltStrength = 15; // Derajat kemiringan maksimal
    const fadeOutThreshold = 0.2; // 20% dari atas layar, mulai hilang

    function handleScroll() {
        const triggerBottom = window.innerHeight * 0.9; // Titik muncul (90% viewport)
        const triggerTop = window.innerHeight * fadeOutThreshold; // Titik hilang

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardCenter = cardTop + (card.offsetHeight / 2);
            const screenCenter = window.innerHeight / 2;

            // 1. ENTRY ANIMATION (Muncul dari bawah)
            if (cardTop < triggerBottom) {
                // Card masuk area pandang
                card.style.opacity = 1;
                
                // 2. TILT LOGIC (Desktop Only)
                if (window.innerWidth > 768) {
                    // Hitung jarak dari tengah layar
                    // Positif = di bawah tengah, Negatif = di atas tengah
                    const distFromCenter = cardCenter - screenCenter;
                    
                    // Normalisasi jarak (-1 sampai 1 relatif terhadap setengah tinggi layar)
                    // Kita bagi dengan (window.innerHeight) biar transisinya panjang (perlu discroll)
                    let normalizedDist = distFromCenter / (window.innerHeight * 0.6);
                    
                    // Clamp nilai biar ga lebay muternya
                    if (normalizedDist > 1) normalizedDist = 1;
                    if (normalizedDist < -1) normalizedDist = -1;

                    // Arah tilt tergantung alignment (kiri/kanan)
                    const isRight = card.dataset.tilt === 'right';
                    let rotateDeg = normalizedDist * tiltStrength;

                    // Kalau kartu kanan, rotasinya dibalik biar estetik
                    if (isRight) rotateDeg = -rotateDeg;

                    // Translasi Y halus (Parallax effect dikit)
                    // Kartu yang belum sampai tengah agak turun dikit
                    let translateY = Math.max(0, normalizedDist * 50);

                    // 3. EXIT ANIMATION (Hilang kalau ke atas)
                    if (cardTop < triggerTop) {
                        // Makin ke atas, makin hilang & geser ke atas
                        // Hitung seberapa jauh lewat triggerTop
                        const exitProgress = (triggerTop - cardTop) / 200; // 200px area fade out
                        card.style.opacity = Math.max(0, 1 - exitProgress);
                        translateY -= exitProgress * 50; // Geser ke atas pas hilang
                        
                        // Rotasi tetap lanjut biar kayak "terbuang"
                    }

                    // Apply Transform
                    card.style.transform = `translateY(${translateY}px) rotate(${rotateDeg}deg)`;
                } else {
                    // Mobile: Reset transform, cuma main opacity & translate entry biasa
                    if (cardTop < triggerTop) {
                         const exitProgress = (triggerTop - cardTop) / 200;
                         card.style.opacity = Math.max(0, 1 - exitProgress);
                         card.style.transform = `translateY(-${exitProgress * 30}px)`;
                    } else {
                        card.style.transform = 'translateY(0) rotate(0deg)';
                    }
                }

            } else {
                // Card di bawah viewport (belum muncul)
                card.style.opacity = 0;
                card.style.transform = `translateY(100px) rotate(${card.dataset.tilt === 'right' ? -10 : 10}deg)`;
            }
        });
    }

    // Jalankan saat scroll
    window.addEventListener('scroll', handleScroll);
    // Jalankan sekali saat load
    handleScroll();
});