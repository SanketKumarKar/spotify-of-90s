// Retro 90s Spotify JavaScript - Totally Rad Interactive Features!

// Global variables
let isPlaying = false;
let currentTrack = 0;
let visitorCount = 1337;
let mixtapeTracks = [];
let vuMeterInterval;

// Sample album data - totally 90s!
const albums = [
    { title: "Nevermind", artist: "Nirvana", emoji: "🎸", year: "1991" },
    { title: "OK Computer", artist: "Radiohead", emoji: "🤖", year: "1997" },
    { title: "Alanis Morissette", artist: "Jagged Little Pill", emoji: "😤", year: "1995" },
    { title: "The Downward Spiral", artist: "Nine Inch Nails", emoji: "⚙️", year: "1994" },
    { title: "Automatic for the People", artist: "R.E.M.", emoji: "🌙", year: "1992" },
    { title: "Vs.", artist: "Pearl Jam", emoji: "🌊", year: "1993" },
    { title: "Siamese Dream", artist: "Smashing Pumpkins", emoji: "🎪", year: "1993" },
    { title: "Definitely Maybe", artist: "Oasis", emoji: "☀️", year: "1994" },
    { title: "The Bends", artist: "Radiohead", emoji: "🌀", year: "1995" },
    { title: "Mellon Collie", artist: "Smashing Pumpkins", emoji: "🌙", year: "1995" },
    { title: "Tragic Kingdom", artist: "No Doubt", emoji: "👑", year: "1995" },
    { title: "Dookie", artist: "Green Day", emoji: "💚", year: "1994" },
    { title: "Crooked Rain", artist: "Pavement", emoji: "🌧️", year: "1994" },
    { title: "Mellow Gold", artist: "Beck", emoji: "🏆", year: "1994" },
    { title: "Dummy", artist: "Portishead", emoji: "🎭", year: "1994" },
    { title: "Maxinquaye", artist: "Tricky", emoji: "🎪", year: "1995" }
];

// Sample tracks for player
const tracks = [
    "♪ Smells Like Teen Spirit - Nirvana ♪",
    "♪ Paranoid Android - Radiohead ♪", 
    "♪ You Oughta Know - Alanis Morissette ♪",
    "♪ Closer - Nine Inch Nails ♪",
    "♪ Everybody Hurts - R.E.M. ♪",
    "♪ Alive - Pearl Jam ♪",
    "♪ 1979 - Smashing Pumpkins ♪",
    "♪ Wonderwall - Oasis ♪"
];

// AI recommendations
const aiRecommendations = [
    "🎵 Based on your vibes, we recommend: 'Alternative Rock Madness' playlist!",
    "🤖 Our AI suggests: You'd love some Grunge classics mixed with Britpop!",
    "🎧 Calculation complete: 95% compatibility with 90s Underground Hip-Hop!",
    "💿 Analysis result: Your music DNA shows strong Shoegaze tendencies!",
    "🎼 AI prediction: You're ready for some Experimental Electronic beats!",
    "🎸 Neural network says: Time for some Post-Punk Revival sessions!",
    "🥁 Algorithm recommends: Industrial Rock with a dash of Trip-Hop!",
    "🎹 Artificial Intelligence verdict: You need more Acid Jazz in your life!"
];

// Random mixtape names
const mixtapeNames = [
    "Totally Radical Mix '97",
    "Cyber Grunge Madness",
    "Digital Underground Vibes",
    "Neon Dreams Compilation",
    "Y2K Countdown Beats",
    "Maximum Overdrive Mix",
    "Electric Boogaloo Vol. 2",
    "Retro Future Sounds",
    "Millennium Bug Beats",
    "Virtual Reality Grooves"
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    updateVisitorCounter();
    populateAlbums();
    startVUMeter();
    playSystemSound();
    initEnhancedAnimations(); // Add smooth animations
});

function initializePage() {
    console.log("🎵 Welcome to Spotify '97! Loading the freshest digital beats...");
    
    // Update track info
    document.getElementById('track-info').textContent = tracks[currentTrack];
    
    // Show library section by default
    showSection('library');
    
    // Add some dynamic effects
    setInterval(updateVUMeter, 200);
    setInterval(updateVisitorCounter, 30000); // Update every 30 seconds
}

function showSection(sectionName) {
    // Use smooth transitions for enhanced experience
    showSectionSmooth(sectionName);
}

function populateAlbums() {
    const albumGrid = document.getElementById('album-grid');
    
    albums.forEach((album, index) => {
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album';
        albumDiv.onclick = () => selectAlbum(album);
        
        albumDiv.innerHTML = `
            <div class="album-cover">${album.emoji}</div>
            <div class="album-title">${album.title}</div>
            <div class="album-artist">${album.artist} (${album.year})</div>
        `;
        
        albumGrid.appendChild(albumDiv);
    });
}

function selectAlbum(album) {
    playSystemSound();
    
    // Add to mixtape
    addToMixtape(album);
    
    // Update player
    document.getElementById('track-info').textContent = `♪ ${album.title} - ${album.artist} ♪`;
    
    // Show popup
    showModal(`🎵 Added "${album.title}" by ${album.artist} to your mixtape! 🎵`);
}

function addToMixtape(album) {
    mixtapeTracks.push(album);
    updateMixtapeDisplay();
    updateSidebarMixtape();
}

function updateMixtapeDisplay() {
    const mixtapeCollection = document.getElementById('mixtape-collection');
    
    if (mixtapeTracks.length === 0) {
        mixtapeCollection.innerHTML = '<div class="empty-mixtape">No tracks yet! Add some albums to get started!</div>';
        return;
    }
    
    mixtapeCollection.innerHTML = mixtapeTracks.map((track, index) => 
        `<div class="mixtape-track">
            ${index + 1}. ${track.title} - ${track.artist} ${track.emoji}
        </div>`
    ).join('');
}

function updateSidebarMixtape() {
    const sidebarMixtape = document.getElementById('mixtape-tracks');
    
    if (mixtapeTracks.length === 0) {
        sidebarMixtape.innerHTML = '<div class="mixtape-empty">Drag albums here!</div>';
        return;
    }
    
    sidebarMixtape.innerHTML = mixtapeTracks.slice(-3).map((track, index) => 
        `<div style="color: #00ff00; font-size: 6px; margin-bottom: 3px;">
            ${track.emoji} ${track.title}
        </div>`
    ).join('');
}

// Player controls
function playPause() {
    const playBtn = document.getElementById('play-btn');
    
    if (isPlaying) {
        playBtn.textContent = '▶️';
        isPlaying = false;
        stopVUMeter();
        playSystemSound();
    } else {
        playBtn.textContent = '⏸️';
        isPlaying = true;
        startVUMeter();
        document.getElementById('track-info').textContent = tracks[currentTrack];
        playSystemSound();
    }
}

function stop() {
    const playBtn = document.getElementById('play-btn');
    playBtn.textContent = '▶️';
    isPlaying = false;
    stopVUMeter();
    document.getElementById('track-info').textContent = '♪ Stopped ♪';
    playSystemSound();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    document.getElementById('track-info').textContent = tracks[currentTrack];
    playSystemSound();
}

// VU Meter animation
function startVUMeter() {
    vuMeterInterval = setInterval(() => {
        if (isPlaying) {
            updateVUMeter();
        }
    }, 150);
}

function stopVUMeter() {
    clearInterval(vuMeterInterval);
    // Reset all bars
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`vu${i}`).classList.remove('active');
    }
}

function updateVUMeter() {
    if (!isPlaying) return;
    
    // Random VU meter animation
    for (let i = 1; i <= 5; i++) {
        const bar = document.getElementById(`vu${i}`);
        if (Math.random() > 0.5) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    }
}

// Visitor counter
function updateVisitorCounter() {
    visitorCount += Math.floor(Math.random() * 3) + 1;
    document.getElementById('visitor-count').textContent = visitorCount.toString().padStart(6, '0');
}

// Guestbook functionality
function addGuestbookEntry() {
    const name = document.getElementById('guest-name').value;
    const message = document.getElementById('guest-message').value;
    
    if (!name || !message) {
        showModal('⚠️ Please fill in both name and message fields! ⚠️');
        return;
    }
    
    const entriesContainer = document.getElementById('guestbook-entries');
    const newEntry = document.createElement('div');
    newEntry.className = `guest-entry ${Math.random() > 0.5 ? 'alt' : ''}`;
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    });
    
    newEntry.innerHTML = `
        <strong>${name}:</strong> ${message}
        <div class="entry-date">${currentDate}</div>
    `;
    
    // Add to top of guestbook
    entriesContainer.insertBefore(newEntry, entriesContainer.firstChild);
    
    // Clear form
    document.getElementById('guest-name').value = '';
    document.getElementById('guest-message').value = '';
    
    playSystemSound();
    showModal('🎉 Thanks for signing our guestbook! You rock! 🎉');
}

// AI Recommender
function getRecommendation() {
    const resultDiv = document.getElementById('ai-result');
    
    // Show loading animation
    resultDiv.innerHTML = '<div style="text-align: center;">🤖 PROCESSING... ANALYZING YOUR MUSICAL DNA... 🤖</div>';
    
    // Simulate AI thinking time
    setTimeout(() => {
        const randomRecommendation = aiRecommendations[Math.floor(Math.random() * aiRecommendations.length)];
        resultDiv.innerHTML = randomRecommendation;
        playSystemSound();
    }, 2000);
}

// Mixtape name generator
function generateMixtapeName() {
    const randomName = mixtapeNames[Math.floor(Math.random() * mixtapeNames.length)];
    document.getElementById('mixtape-name').value = randomName;
    playSystemSound();
}

// Modal functions
function showModal(message) {
    document.getElementById('modal-text').textContent = message;
    document.getElementById('modal').style.display = 'block';
    playSystemSound();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    playSystemSound();
}

// System sound simulation (visual feedback)
function playSystemSound() {
    // Create a brief visual flash effect
    document.body.style.filter = 'brightness(1.1)';
    setTimeout(() => {
        document.body.style.filter = 'brightness(1)';
    }, 100);
    
    console.log('🔊 *BEEP* System sound played!');
}

// Easter eggs and special effects
document.addEventListener('keydown', function(e) {
    // Konami code: ↑↑↓↓←→←→BA
    if (e.code === 'ArrowUp' && e.ctrlKey) {
        showModal('🎮 CHEAT CODE ACTIVATED! You found the secret 90s mode! 🎮');
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

// Randomly trigger "Did You Know?" popups
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        const facts = [
            "Did you know? The first MP3 was encoded in 1991!",
            "Fun fact: Napster launched in 1999 and changed music forever!",
            "Cool trivia: The term 'World Wide Web' was coined in 1989!",
            "Retro fact: Windows 95 came with Internet Explorer 1.0!",
            "90s wisdom: 'You've got mail!' was the sound of the future!"
        ];
        
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        // Only show if no modal is currently open
        if (document.getElementById('modal').style.display !== 'block') {
            setTimeout(() => showModal(`💡 ${randomFact} 💡`), 1000);
        }
    }
}, 45000); // Check every 45 seconds

// Add click sound to all buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        playSystemSound();
    }
});

// Simulate download attempts
function attemptDownload(filename) {
    const messages = [
        "💾 Sorry, your floppy disk is full! Please insert a new disk.",
        "🚫 Error: Not enough space on drive A:",
        "⏳ Download failed: Connection timeout (try again in 1997)",
        "🖥️ System error: Please restart Windows 95",
        "📞 Connection lost: Your mom picked up the phone!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showModal(randomMessage);
}

// Background color shifter for extra 90s effect
setInterval(() => {
    if (Math.random() < 0.05) { // 5% chance
        document.body.style.animationDuration = (Math.random() * 2 + 2) + 's';
    }
}, 10000);

// Console easter egg
console.log(`
🎵 SPOTIFY DIGITAL JUKEBOX '97 🎵
================================
Welcome to the most radical music experience on the World Wide Web!

Try these secret commands:
- Ctrl + ↑ : Activate 90s color mode
- Click around for system sounds
- Wait for random "Did You Know?" popups

Keep on rockin' in the digital world! 🤘
`);

// Smooth animation utilities for ultimate 90s experience
function smoothFadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

function smoothFadeOut(element, duration = 500) {
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
}

function bounceAnimation(element) {
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.15s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }, 75);
}

function glitchEffect(element, duration = 300) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let glitchInterval;
    
    glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        element.textContent = glitchedText;
    }, 50);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        element.textContent = originalText;
    }, duration);
}

// Enhanced section switching with smooth transitions
function showSectionSmooth(sectionName) {
    // Get all content sections
    const sections = ['library', 'mixtape', 'guestbook', 'recommender'];
    
    // Fade out current section
    sections.forEach(section => {
        const element = document.getElementById(section + '-section');
        if (element && element.style.display !== 'none') {
            smoothFadeOut(element, 300);
        }
    });
    
    // Fade in new section after delay
    setTimeout(() => {
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            smoothFadeIn(targetSection, 400);
        }
        
        // Add special effects for each section
        if (sectionName === 'library') {
            animateAlbumGrid();
        } else if (sectionName === 'recommender') {
            startAIAnimation();
        }
    }, 320);
    
    // Play retro sound effect
    playRetroSound();
}

// Animate album grid with staggered entrance
function animateAlbumGrid() {
    const albums = document.querySelectorAll('.album');
    albums.forEach((album, index) => {
        album.style.opacity = '0';
        album.style.transform = 'translateY(20px) scale(0.8)';
        album.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            album.style.opacity = '1';
            album.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Enhanced player animations
function enhancedTogglePlay() {
    const playBtn = document.getElementById('play-btn');
    const trackInfo = document.getElementById('track-info');
    
    // Bounce effect on button
    bounceAnimation(playBtn);
    
    if (!isPlaying) {
        isPlaying = true;
        playBtn.textContent = '⏸️';
        startVUMeter();
        
        // Smooth track change animation
        trackInfo.style.transform = 'translateX(-100%)';
        trackInfo.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            trackInfo.textContent = tracks[currentTrack];
            trackInfo.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                trackInfo.style.transform = 'translateX(0)';
            }, 50);
        }, 150);
        
        currentTrack = (currentTrack + 1) % tracks.length;
    } else {
        isPlaying = false;
        playBtn.textContent = '▶️';
        stopVUMeter();
        trackInfo.textContent = '♪ Paused ♪';
    }
    
    playRetroSound();
}

// Enhanced AI animation
function startAIAnimation() {
    const aiBtn = document.querySelector('.ai-btn');
    if (aiBtn) {
        // Add pulsing glow effect
        aiBtn.style.animation = 'aiGlow 0.5s ease infinite, pulse90s 1s ease infinite';
        
        setTimeout(() => {
            aiBtn.style.animation = 'aiGlow 2s ease infinite';
        }, 2000);
    }
}

// Play retro sound effects (visual feedback since we can't play actual sounds)
function playRetroSound() {
    // Create visual sound effect
    const soundEffect = document.createElement('div');
    soundEffect.textContent = '♪';
    soundEffect.style.position = 'fixed';
    soundEffect.style.top = '20px';
    soundEffect.style.right = '20px';
    soundEffect.style.fontSize = '24px';
    soundEffect.style.color = '#ffff00';
    soundEffect.style.zIndex = '9999';
    soundEffect.style.pointerEvents = 'none';
    soundEffect.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(soundEffect);
    
    setTimeout(() => {
        soundEffect.style.transform = 'translateY(-30px) scale(1.5)';
        soundEffect.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        document.body.removeChild(soundEffect);
    }, 600);
}

// Initialize enhanced animations on page load
function initEnhancedAnimations() {
    // Hide loading screen after animations complete
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }
    }, 3500);
    
    // Add smooth hover effects to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', () => {
            bounceAnimation(button);
        });
    });
    
    // Add floating animation to album covers
    const albumCovers = document.querySelectorAll('.album-cover');
    albumCovers.forEach((cover, index) => {
        cover.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize page with library section after loading
    setTimeout(() => {
        showSectionSmooth('library');
    }, 4000);
}

// Initialize everything when page loads
window.onload = function() {
    console.log("🎵 Spotify '97 fully loaded! Time to jam! 🎵");
    
    // Add some startup flair
    setTimeout(() => {
        if (Math.random() < 0.3) {
            showModal("🎉 Welcome to the future of music! Get ready to rock the digital revolution! 🎉");
        }
    }, 2000);
    
    initEnhancedAnimations();
};
