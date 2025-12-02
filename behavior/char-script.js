// === DATA SUMBER (Database Karakter) ===
const charData = {
    gold: {
        name: "SI EMAS",
        class: "Visionary Planner",
        desc: "Perencana ulung yang melihat masa depan dalam selembar kertas kosong. Senjatanya adalah imajinasi dan ketepatan sketsa.",
        color: "#D4AF37",
        bg: "#F9F3E0",
        img: "../pictures/emas.png",
        stats: { lvl: 50, exp: 15000, hp: 4000, mp: 1200, acc: "98%", agi: 60, crit: "30%", ras: "Mummy", age: "3000+" },
        weapons: [
            { name: "Eternal Pencil", stat: "ATK +50", skill: "Reality Drawing: Apa yang digambar menjadi nyata selama 10 detik.", icon: "fa-pencil-alt" },
            { name: "Blueprint Paper", stat: "DEF +30", skill: "Strategic Shield: Mengurangi damage sebesar 50% saat merencanakan serangan.", icon: "fa-scroll" }
        ],
        bio: "Si Emas lahir dari benang emas kerajaan kuno. Ia percaya bahwa takdir tidak ditulis oleh dewa, tapi digambar oleh diri sendiri. [Isi bio panjang 90% layar disini...]"
    },
    white: {
        name: "SI PUTIH",
        class: "Perfectionist Soul",
        desc: "Presisi adalah segalanya. Tidak ada jahitan yang meleset, tidak ada potongan yang miring. Hidup adalah tentang kesempurnaan.",
        color: "#A0A0A0", // Agak abu biar keliatan
        bg: "#dde1e7", // Putih keabuan
        img: "../pictures/putih.png",
        stats: { lvl: 55, exp: 18000, hp: 3200, mp: 900, acc: "100%", agi: 85, crit: "70%", ras: "Mummy", age: "2800+" },
        weapons: [
            { name: "Silver Needle", stat: "Pierce +80", skill: "Thread of Fate: Menjahit bayangan musuh, menghentikan pergerakan mereka.", icon: "fa-hashtag" }, // Ganti icon jarum
            { name: "Razor Blade", stat: "Crit +40%", skill: "Clean Cut: Memotong pertahanan musuh, mengabaikan 100% armor.", icon: "fa-slash" }
        ],
        bio: "Si Putih dulunya adalah kepala penjahit istana yang diasingkan karena terlalu obsesif. Ia mencari kain legendaris yang konon bisa membungkus waktu. [Isi bio panjang...]"
    },
    red: {
        name: "SI MERAH",
        class: "Brave Heart",
        desc: "Keberanian yang membara dalam setiap serat benang merah. Ia tidak takut putus, ia hanya takut tidak pernah mengikat apa pun.",
        color: "#C0392B",
        bg: "#EADBD9",
        img: "../pictures/merah.png",
        stats: { lvl: 60, exp: 22000, hp: 5500, mp: 600, acc: "80%", agi: 90, crit: "50%", ras: "Mummy", age: "2500+" },
        weapons: [
            { name: "Blood Needle", stat: "Lifesteal +20%", skill: "Stitch Healing: Menjahit luka sendiri secara instan.", icon: "fa-syringe" },
            { name: "Red Thread", stat: "Range +100", skill: "Puppet Master: Mengendalikan pergerakan lawan dengan benang merah.", icon: "fa-wave-square" }
        ],
        bio: "Si Merah adalah prajurit garis depan. Benang merahnya konon berasal dari darah naga. Ia bertarung bukan untuk menang, tapi untuk melindungi ikatan persahabatan. [Isi bio panjang...]"
    }
};

// === GLOBAL VARIABLES ===
let currentTheme = 'gold';
const body = document.body;
const main = document.querySelector('main');

// Elements to Animate
const animElements = document.querySelectorAll('.anim-element');

// === INITIALIZATION ===
window.onload = () => {
    updateContent('gold'); // Load initial data
    syncMobileContent();
};

// === THEME SWITCHING LOGIC ===
function switchTheme(newTheme) {
    if (currentTheme === newTheme) {
        // Kalo mobile, close dropdown aja
        document.getElementById('mobileDropdown').classList.remove('active');
        return;
    }

    // 1. Trigger Exit Animation (Floating Away)
    animElements.forEach(el => {
        // Randomize direction for "floating" effect
        const x = (Math.random() - 0.5) * 200; // -100 to 100px
        const y = (Math.random() - 0.5) * 200;
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.classList.add('exit-anim');
    });

    // 2. Wait, then Swap Data & Theme
    setTimeout(() => {
        // Update CSS Theme
        body.setAttribute('data-theme', newTheme);
        document.documentElement.style.setProperty('--theme-primary', charData[newTheme].color);
        document.documentElement.style.setProperty('--theme-bg', charData[newTheme].bg);

        // Update Mobile Toggle Color
        const mobToggle = document.getElementById('mobilePaletteToggle');
        mobToggle.className = `current-palette p-${newTheme}`;
        document.getElementById('mobileDropdown').classList.remove('active');

        // Update Text & Images
        updateContent(newTheme);

        // Reset Flipper State (Mobile)
        document.getElementById('mobileFlipper').classList.remove('is-flipped');

        // 3. Trigger Enter Animation (Reset position)
        setTimeout(() => {
            animElements.forEach(el => {
                el.style.transform = 'translate(0, 0)';
                el.classList.remove('exit-anim');
            });
        }, 100); // Small delay to ensure DOM applied

        currentTheme = newTheme;
    }, 600); // Match CSS transition duration
}

function updateContent(theme) {
    const data = charData[theme];
    
    // Text Info
    document.getElementById('charName').innerText = data.name;
    document.getElementById('charName').style.color = data.color;
    document.getElementById('charClass').innerText = data.class;
    document.getElementById('charDesc').innerText = data.desc;

    // Stats
    document.getElementById('s-lvl').innerText = data.stats.lvl;
    document.getElementById('s-exp').innerText = data.stats.exp;
    document.getElementById('s-hp').innerText = data.stats.hp;
    document.getElementById('s-mp').innerText = data.stats.mp;
    document.getElementById('s-acc').innerText = data.stats.acc;
    document.getElementById('s-agi').innerText = data.stats.agi;
    document.getElementById('s-crit').innerText = data.stats.crit;
    document.getElementById('s-ras').innerText = data.stats.ras;
    document.getElementById('s-age').innerText = data.stats.age;

    // Images
    document.getElementById('charImgDesktop').src = data.img;
    document.getElementById('charImgMobile').src = data.img;
    document.getElementById('mobileRedFixedImg').src = data.img;
    document.getElementById('colImgFace').src = data.img; // Update collection face

    // Icons/Weapons (Update icons based on data)
    // Note: Since I don't have images for weapons, I'm using icons logic
    const w1Icon = document.getElementById('iconW1');
    const w2Icon = document.getElementById('iconW2');
    w1Icon.className = `fas ${data.weapons[0].icon}`;
    w2Icon.className = `fas ${data.weapons[1].icon}`;
    // If you have real images: document.getElementById('colImgW1').src = "path/to/img.png";

    syncMobileContent();
}

// Copy desktop info to mobile containers
function syncMobileContent() {
    const infoContent = document.getElementById('infoPanel').innerHTML;
    document.getElementById('mobileInfoTarget').innerHTML = infoContent;
    document.getElementById('mobileRedStats').innerHTML = `<div style="background:rgba(255,255,255,0.9); padding:20px; border-radius:20px;">${infoContent}</div>`;
}


// === UI INTERACTION ===
function toggleMobileMenu() {
    document.getElementById('mobileDropdown').classList.toggle('active');
}

function flipCard() {
    // Only flip for Gold and White. Red has fixed layout.
    if (currentTheme !== 'red') {
        document.getElementById('mobileFlipper').classList.toggle('is-flipped');
    }
}

// === POPUP LOGIC ===
function openBioPopup() {
    const data = charData[currentTheme];
    const content = `
        <h2 style="color:${data.color}; margin-bottom:1rem;">Biography: ${data.name}</h2>
        <div class="popup-bio-content">${data.bio}</div>
    `;
    showPopup(content);
}

function openWeaponPopup(index) {
    const w = charData[currentTheme].weapons[index];
    const color = charData[currentTheme].color;
    const content = `
        <h3 style="color:${color}; text-transform:uppercase;">${w.name}</h3>
        <div style="font-size:3rem; color:#ccc; margin:1rem 0;"><i class="fas ${w.icon}" style="color:${color}"></i></div>
        <p><strong>Stats:</strong> ${w.stat}</p>
        <p style="margin-top:10px;"><strong>Unique Skill:</strong><br>${w.skill}</p>
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
        e.target.classList.remove('active');
    }
}