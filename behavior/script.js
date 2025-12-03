// <-- === JAVASCRIPT === -->
        // 1. Dropdown Logic
        function toggleDropdown() {
            const menu = document.getElementById('dropdown');
            menu.classList.toggle('active');
        }

        // Close dropdown when clicking outside
        window.addEventListener('click', function(e) {
            if (!document.querySelector('.nav-title-wrapper').contains(e.target)) {
                document.getElementById('dropdown').classList.remove('active');
            }
        });

        // 2. Scroll Animation (Reveal Effect)
        // Ini efek konten "naik" yang lo request.
        // Konsep: Saat elemen masuk viewport, kita hapus translasi Y-nya biar dia geser ke posisi asli.
        
        const observerOptions = {
            threshold: 0.15, // Mulai animasi saat 15% elemen terlihat
            rootMargin: "0px 0px -50px 0px" // Offset sedikit dari bawah
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Kita tidak unobserve biar kalau discroll ke atas terus ke bawah lagi, animasinya main lagi (opsional)
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Targetkan semua section
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // 3. Card Interaction Mockup
        function openDetail(charName) {
            // charName harus: 'gold', 'white', atau 'red' (sesuai key di charData nanti)
            // Kita pindah halaman sambil bawa parameter ?theme=...
            window.location.href = `./pages/karakter.html?theme=${charName}`;
        }