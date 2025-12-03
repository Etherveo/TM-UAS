// === DATA KARAKTER ===
const charData = {
    gold: {
        theme: 'gold', color: '#D4AF37', bg: '#F9F3E0', img: '../pictures/emas.png',
        name: "SI EMAS", class: "The Visionary Planner",
        desc: "Perencana ulung yang melihat masa depan dalam selembar kertas kosong. Imajinasinya adalah cetak biru realitas.",
        stats: { lvl: 50, exp: 15000, hp: 4000, mp: 1200, acc: "98%", agi: 60, crit: "30%", ras: "Mummy", age: "3000+" },
        weapons: [
            { name: "Eternal Pencil", stat: "ATK +50", skill: "Reality Drawing: Apa yang digambar menjadi nyata selama 10 detik.", icon: '../pictures/pensil.png' },
            { name: "Blueprint Paper", stat: "DEF +30", skill: "Strategic Shield: Mengurangi damage sebesar 50% saat merencanakan serangan.", icon: '../pictures/kertas.png' }
        ],
        bio: "Si Emas lahir dari benang emas kerajaan kuno. Ia percaya bahwa takdir tidak ditulis oleh dewa, tapi digambar oleh diri sendiri."
    },
    white: {
        theme: 'white', color: '#333', bg: '#dde1e7', img: '../pictures/putih.png',
        name: "SI PUTIH", class: "Perfectionist Soul",
        desc: "Presisi adalah segalanya. Tidak ada jahitan yang meleset. Hidup adalah tentang kesempurnaan absolut.",
        stats: { lvl: 55, exp: 18000, hp: 3200, mp: 900, acc: "100%", agi: 85, crit: "70%", ras: "Mummy", age: "2800+" },
        weapons: [
            { name: "Silver Needle", stat: "Pierce +80", skill: "Thread of Fate: Menjahit bayangan musuh, menghentikan pergerakan mereka.", icon: '../pictures/jarum.png' },
            { name: "Razor Blade", stat: "Crit +40%", skill: "Clean Cut: Memotong pertahanan musuh, mengabaikan 100% armor.", icon: '../pictures/silet.png' }
        ],
        bio: "Si Putih dulunya adalah kepala penjahit istana yang diasingkan karena terlalu obsesif. Ia mencari kain legendaris yang konon bisa membungkus waktu."
    },
    red: {
        theme: 'red', color: '#C0392B', bg: '#EADBD9', img: '../pictures/merah.png',
        name: "SI MERAH", class: "Brave Heart",
        desc: "Keberanian membara dalam serat benang merah. Bertarung bukan untuk menang, tapi untuk melindungi ikatan.",
        stats: { lvl: 60, exp: 22000, hp: 5500, mp: 600, acc: "80%", agi: 90, crit: "50%", ras: "Mummy", age: "2500+" },
        weapons: [
            { name: "Blood Needle", stat: "Lifesteal +20%", skill: "Stitch Healing: Menjahit luka sendiri secara instan.", icon: '../pictures/magic_jarum.png' },
            { name: "Red Thread", stat: "Range +100", skill: "Puppet Master: Mengendalikan pergerakan lawan dengan benang merah.", icon: '../pictures/the_string.png' }
        ],
        bio: "Si Merah adalah prajurit garis depan. Benang merahnya konon berasal dari darah naga. Ia bertarung bukan untuk menang, tapi untuk melindungi ikatan persahabatan."
    }
};

let activeTheme = 'gold';
const body = document.body;
const desktopContainer = document.getElementById('desktopContainer');
const mobileContainer = document.getElementById('mobileContainer');

// Init
window.onload = () => { loadContent('gold'); };

// === CORE SWITCHING LOGIC ===
function switchTheme(newTheme) {
    if (activeTheme === newTheme) { toggleMobMenu(false); return; }

    // 1. Trigger EXIT Animation
    desktopContainer.classList.add('anim-exit');
    mobileContainer.classList.add('anim-exit');

    // 2. Wait for animation, then swap data & layout styles
    setTimeout(() => {
        // Change Theme Variables & Body Data
        body.setAttribute('data-theme', newTheme);
        document.documentElement.style.setProperty('--theme-primary', charData[newTheme].color);
        document.documentElement.style.setProperty('--theme-bg', charData[newTheme].bg);
        
        // Update Mobile Toggle Button Color
        document.getElementById('mobPaletteBtn').className = `current-palette p-${newTheme}`;
        toggleMobMenu(false); // Close menu if open

        // Handle Special Red Desktop layout visibility
        const redNameArea = document.getElementById('redNameArea');
        if(newTheme === 'red') {
            redNameArea.style.display = 'block';
        } else {
            redNameArea.style.display = 'none';
        }

        // Handle Special Red Mobile Layout visibility
        const mobFlipper = document.getElementById('mobileFlipperWrapper'); // Container Flipper Biasa
        const mobRedStats = document.getElementById('mobileRedStats');
        const mobRedImg = document.getElementById('mobileRedFixedImg');
        const standardMobContainer = document.querySelector('.flip-container'); // Container Standard

        if (newTheme === 'red') {
            // Mode Merah Mobile: Hide Flipper standard, Show Red Special
            standardMobContainer.style.display = 'none';
            mobRedStats.style.display = 'block';
            mobRedImg.style.display = 'block';
        } else {
            // Mode Normal: Show Flipper standard, Hide Red Special
            standardMobContainer.style.display = 'block';
            mobRedStats.style.display = 'none';
            mobRedImg.style.display = 'none';
        }

        // Load New Data into DOM
        loadContent(newTheme);

        // Reset Mobile Flipper State
        document.getElementById('mobFlipper').classList.remove('flipped');

        // 3. Trigger ENTER Animation (Remove exit class)
        setTimeout(() => {
            desktopContainer.classList.remove('anim-exit');
            mobileContainer.classList.remove('anim-exit');
        }, 100); 

        activeTheme = newTheme;
    }, 500); // Match CSS transition time
}

// === POPUP LOGIC (GLOBAL SCOPE - SEKARANG BISA DIPANGGIL) ===
function openBioPopup(event) {
    if(event) event.stopPropagation(); // KUNCI: Mencegah kartu mobile berputar

    const data = charData[activeTheme];
    const content = `
        <div style="text-align:center; margin-bottom:1rem;">
             <img src="${data.img}" style="width:100px; height:100px; object-fit:cover; border-radius:50%; border:3px solid ${data.color}">
        </div>
        <h2 style="color:${data.color}; margin-bottom:1rem; text-align:center;">${data.name}</h2>
        <div class="popup-bio-content">${data.bio}</div>
    `;
    showPopup(content);
}

function openWeaponPopup(index, event) {
    if(event) event.stopPropagation(); // KUNCI: Mencegah kartu mobile berputar

    const data = charData[activeTheme];
    const w = data.weapons[index];
    const content = `
        <h3 style="color:${data.color}; text-transform:uppercase; text-align:center;">${w.name}</h3>
        <div style="display:flex; justify-content:center; margin:1.5rem 0;">
            <img src="${w.icon}" style="width:120px; height:120px; object-fit:contain;">
        </div>
        <div style="background:#f4f4f4; padding:15px; border-radius:10px; margin-bottom:10px;">
            <p><strong>Stats:</strong> <span style="color:${data.color}; font-weight:bold;">${w.stat}</span></p>
        </div>
        <p style="margin-top:10px; line-height:1.6;"><strong>Unique Skill:</strong><br>${w.skill}</p>
    `;
    showPopup(content);
}

function showPopup(html) {
    const overlay = document.getElementById('popupOverlay');
    document.getElementById('popupContent').innerHTML = html;
    overlay.classList.add('active');
}

function closePopup(e) {
    if (e.target.id === 'popupOverlay') {
        document.getElementById('popupOverlay').classList.remove('active');
    }
}

function closePopupButton() {
    document.getElementById('popupOverlay').classList.remove('active');
}

// === CONTENT LOADING FUNCTION ===
function loadContent(theme) {
    const data = charData[theme];

    // A. Generate INFO PANEL HTML Structure
    const infoHtml = `
        <div class="char-header-text">
            <h1 class="char-name-text" style="color: ${data.color}">${data.name}</h1>
            <span class="char-class-text">${data.class}</span>
        </div>
        <div class="desc-box-text">${data.desc}</div>
        <div class="stats-grid">
            <div class="stat-row"><span class="stat-label">Level</span><span class="stat-val">${data.stats.lvl}</span></div>
            <div class="stat-row"><span class="stat-label">Exp</span><span class="stat-val">${data.stats.exp}</span></div>
            <div class="stat-row"><span class="stat-label">HP</span><span class="stat-val">${data.stats.hp}</span></div>
            <div class="stat-row"><span class="stat-label">MP</span><span class="stat-val">${data.stats.mp}</span></div>
            <div class="stat-row"><span class="stat-label">Acc</span><span class="stat-val">${data.stats.acc}</span></div>
            <div class="stat-row"><span class="stat-label">Agi</span><span class="stat-val">${data.stats.agi}</span></div>
            <div class="stat-row"><span class="stat-label">Crit</span><span class="stat-val">${data.stats.crit}</span></div>
            <div class="stat-row"><span class="stat-label">Ras</span><span class="stat-val">${data.stats.ras}</span></div>
            <div class="stat-row"><span class="stat-label">Umur</span><span class="stat-val">${data.stats.age}</span></div>
        </div>
    `;

    // B. Generate ELEMENTS HTML Structure (from Template)
    const tmpl = document.getElementById('tmpl-elements');
    const elementsFragment = tmpl.content.cloneNode(true);
    // Inject data into template clone
    elementsFragment.querySelector('.col-img-face').src = data.img;
    elementsFragment.querySelector('.icon-w1').src = data.weapons[0].icon;
    elementsFragment.querySelector('.icon-w2').src = data.weapons[1].icon;

    // C. INJECT TO DESKTOP
    document.getElementById('desktopInfoContent').innerHTML = infoHtml;
    document.getElementById('desktopCharImg').src = data.img;
    // Clear and append elements
    const deskElemContainer = document.getElementById('desktopElements');
    deskElemContainer.innerHTML = ''; 
    deskElemContainer.appendChild(elementsFragment.cloneNode(true));

    // D. INJECT TO MOBILE
    document.getElementById('mobInfoContent').innerHTML = infoHtml;
    document.getElementById('mobCharImg').src = data.img;
    
    // Clear and append elements
    const mobElemContainer = document.getElementById('mobElements');
    mobElemContainer.innerHTML = '';
    mobElemContainer.appendChild(elementsFragment.cloneNode(true));

    // E. INJECT TO MOBILE RED (SPECIAL LAYOUT)
    const redStatsContainer = document.getElementById('mobileRedStats');
    const redFixedImg = document.getElementById('mobileRedFixedImg');
    
    if (theme === 'red') {
        redStatsContainer.innerHTML = `<div style="background:rgba(255,255,255,0.9); padding:20px; border-radius:20px; border: 2px solid var(--theme-primary);">${infoHtml}</div>`;
        redFixedImg.src = data.img;
    }
}

// Mobile Menu Toggle
function toggleMobMenu(forceState) {
    const menu = document.getElementById('mobDropdown');
    if (typeof forceState !== 'undefined') {
        menu.classList.toggle('active', forceState);
    } else {
        menu.classList.toggle('active');
    }
}