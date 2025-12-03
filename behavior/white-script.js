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
// Wrapper utama animasi desktop
const desktopWrapper = document.getElementById('desktopWrapper');
const mobileContainer = document.getElementById('mobileContainer');

window.onload = () => { loadContent('gold'); };

function switchTheme(newTheme) {
    if (activeTheme === newTheme) { toggleMobMenu(false); return; }

    // 1. Exit Anim
    desktopWrapper.classList.add('anim-exit');
    mobileContainer.classList.add('anim-exit');

    // 2. Change Data & Layout Visibility
    setTimeout(() => {
        body.setAttribute('data-theme', newTheme);
        document.documentElement.style.setProperty('--theme-primary', charData[newTheme].color);
        document.documentElement.style.setProperty('--theme-bg', charData[newTheme].bg);
        
        document.getElementById('mobPaletteBtn').className = `current-palette p-${newTheme}`;
        toggleMobMenu(false);

        // TOGGLE DESKTOP LAYOUTS
        const stdLayout = document.getElementById('desktop-standard');
        const redLayout = document.getElementById('desktop-red');

        if (newTheme === 'red') {
            stdLayout.style.display = 'none';
            redLayout.style.display = 'flex';
        } else {
            redLayout.style.display = 'none';
            stdLayout.style.display = 'flex';
        }

        loadContent(newTheme);
        document.getElementById('mobFlipper').classList.remove('flipped');

        // 3. Enter Anim
        setTimeout(() => {
            desktopWrapper.classList.remove('anim-exit');
            mobileContainer.classList.remove('anim-exit');
        }, 100); 

        activeTheme = newTheme;
    }, 500); 
}

function loadContent(theme) {
    const data = charData[theme];

    // 1. STATS HTML GEN
    const statsHtml = `
        <div class="stat-row"><span class="stat-label">Level</span><span class="stat-val">${data.stats.lvl}</span></div>
        <div class="stat-row"><span class="stat-label">Exp</span><span class="stat-val">${data.stats.exp}</span></div>
        <div class="stat-row"><span class="stat-label">HP</span><span class="stat-val">${data.stats.hp}</span></div>
        <div class="stat-row"><span class="stat-label">MP</span><span class="stat-val">${data.stats.mp}</span></div>
        <div class="stat-row"><span class="stat-label">Acc</span><span class="stat-val">${data.stats.acc}</span></div>
        <div class="stat-row"><span class="stat-label">Agi</span><span class="stat-val">${data.stats.agi}</span></div>
        <div class="stat-row"><span class="stat-label">Crit</span><span class="stat-val">${data.stats.crit}</span></div>
        <div class="stat-row"><span class="stat-label">Ras</span><span class="stat-val">${data.stats.ras}</span></div>
        <div class="stat-row"><span class="stat-label">Umur</span><span class="stat-val">${data.stats.age}</span></div>
    `;

    // 2. ELEMENTS HTML GEN
    const tmpl = document.getElementById('tmpl-elements');
    const elFrag = tmpl.content.cloneNode(true);
    elFrag.querySelector('.col-img-face').src = data.img;
    elFrag.querySelector('.icon-w1').src = data.weapons[0].icon;
    elFrag.querySelector('.icon-w2').src = data.weapons[1].icon;

    // --- INJECT DATA TO ALL CONTAINERS ---
    // (Biar pas switch layout, isinya udah siap semua)
    
    // Inject ke class .desk-class, .desk-name, .desk-img, dll (Universal Selector)
    document.querySelectorAll('.desk-class').forEach(el => el.innerText = data.class);
    document.querySelectorAll('.desk-desc').forEach(el => el.innerText = data.desc);
    document.querySelectorAll('.desk-stats').forEach(el => el.innerHTML = statsHtml);
    document.querySelectorAll('.desk-name').forEach(el => el.innerText = data.name);
    document.querySelectorAll('.desk-img').forEach(el => el.src = data.img);

    // Inject Elements ke container equipment desktop
    document.querySelectorAll('.desk-equip-container').forEach(el => {
        el.innerHTML = '';
        el.appendChild(elFrag.cloneNode(true));
    });

    // --- MOBILE INJECTION ---
    document.getElementById('mobName').innerText = data.name;
    document.getElementById('mobClass').innerText = data.class;
    
    document.getElementById('mobImg').src = data.img;
    
    const mobEquip = document.getElementById('mobEquip');
    mobEquip.innerHTML = '';
    mobEquip.appendChild(elFrag.cloneNode(true));

    document.getElementById('mobDesc').innerText = data.desc;
    document.getElementById('mobStats').innerHTML = statsHtml;
}

// POPUP & UI FUNCTIONS
function toggleMobMenu(forceState) {
    const menu = document.getElementById('mobDropdown');
    menu.classList.toggle('active', forceState);
}

function openBioPopup(event) {
    if(event) event.stopPropagation();
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
    if(event) event.stopPropagation();
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
    document.getElementById('popupContent').innerHTML = html;
    document.getElementById('popupOverlay').classList.add('active');
}

function closePopup(e) {
    if (e.target.id === 'popupOverlay') document.getElementById('popupOverlay').classList.remove('active');
}
function closePopupButton() {
    document.getElementById('popupOverlay').classList.remove('active');
}