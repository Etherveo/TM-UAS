// ==== KONFIGURASI PENTING ====
// GANTI DENGAN REPO DAN FOLDER TUJUAN ANDA
const GITHUB_USERNAME = "Etherveo"; 
const GITHUB_REPO = "magibase"; 
const GITHUB_BRANCH = "main";
const GITHUB_FOLDER = "TM-Chapter";
// ==============================
let allStories = [];
let currentChapterIndex = 0;

// Element HTML
const loadingIndicator = document.getElementById('loading-indicator');
const storyDisplay = document.getElementById('story-display');
const chapterTitleElement = document.getElementById('chapter-title');
const storyContentElement = document.getElementById('story-content');
const authorNameElement = document.getElementById('author-name');
const postDateElement = document.getElementById('post-date');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const chapterSelect = document.getElementById('chapter-select');
/**
 * Memuat semua file volume (Vol-0.json, Vol-1.json, dst.) dari raw GitHub.
 */
async function fetchAllStories() {
    loadingIndicator.style.display = 'block';
    allStories = [];
    let volume = 0;
    while (true) {
        const fileName = `Vol-${volume}.json`;
        const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${GITHUB_FOLDER}/${fileName}`;
        
        try {
            const response = await fetch(rawUrl);
            if (response.status === 404) {
                // File tidak ditemukan, menandakan sudah mencapai volume terakhir
                break;
            }
            if (!response.ok) {
                throw new Error(`Gagal memuat ${fileName}: ${response.statusText}`);
            }
            const newChapters = await response.json();
            
            // Tambahkan volume number ke setiap chapter untuk debugging
            const chaptersWithVolume = newChapters.map(chapter => ({
                ...chapter,
                volume: volume
            }));
            allStories.push(...chaptersWithVolume);
            volume++;
        } catch (error) {
            console.error(`Error fetching Vol-${volume}.json:`, error.message);
            // Jika ada error lain selain 404, hentikan loop
            break;
        }
    }
    loadingIndicator.style.display = 'none';
    if (allStories.length === 0) {
        storyDisplay.style.display = 'none';
        loadingIndicator.textContent = "❌ Belum ada cerita yang diposting. Coba posting dengan bot WA Anda.";
        return;
    }
    storyDisplay.style.display = 'block';
    populateChapterSelect();
    renderChapter(allStories.length - 1); // Tampilkan chapter terbaru (terakhir)
}
/**
 * Menampilkan konten chapter ke UI.
 * @param {number} index - Indeks chapter dalam array allStories.
 */
function renderChapter(index) {
    if (index < 0 || index >= allStories.length) return;
    currentChapterIndex = index;
    const chapter = allStories[currentChapterIndex];
    // Inject Konten
    chapterTitleElement.textContent = chapter.title;
    storyContentElement.innerHTML = chapter.content.replace(/\n/g, '<br>'); // Ganti newline jadi <br>
    authorNameElement.textContent = chapter.author || 'Anonim';
    postDateElement.textContent = new Date(chapter.date || Date.now()).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    // Update Status Tombol Navigasi
    prevBtn.disabled = currentChapterIndex === 0;
    nextBtn.disabled = currentChapterIndex === allStories.length - 1;
    // Update Dropdown
    chapterSelect.value = currentChapterIndex;
}
/**
 * Mengisi dropdown pilihan chapter.
 */
function populateChapterSelect() {
    chapterSelect.innerHTML = ''; // Bersihkan opsi lama
    allStories.forEach((chapter, index) => {
        const option = document.createElement('option');
        option.value = index;
        const volumeInfo = chapter.volume !== undefined ? ` (Vol-${chapter.volume})` : 'galat';
        option.textContent = `${chapter.title}${volumeInfo}`;
        chapterSelect.appendChild(option);
    });
    chapterSelect.disabled = false;
}
// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentChapterIndex > 0) renderChapter(currentChapterIndex - 1);
});
nextBtn.addEventListener('click', () => {
    if (currentChapterIndex < allStories.length - 1) renderChapter(currentChapterIndex + 1);
});
chapterSelect.addEventListener('change', (event) => {
    renderChapter(parseInt(event.target.value));
});
// Inisialisasi Aplikasi
window.onload = fetchAllStories;