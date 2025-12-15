let currentMode = 'fast';
let currentTheme = 'dark';
let lastAlertCount = 0;

function updateFps(value) {
    document.getElementById('fps-value').innerText = value;
    fetch('/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fps_limit: parseInt(value) }),
    });
}

function setMode(mode) {
    currentMode = mode;

    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    fetch('/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: mode }),
    });
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');

    if (currentTheme === 'dark') {
        currentTheme = 'light';
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        btn.innerText = '☀️';
    } else {
        currentTheme = 'dark';
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        btn.innerText = '🌙';
    }

    localStorage.setItem('theme', currentTheme);
}

function triggerAlertFlash() {
    const flash = document.getElementById('alert-flash');
    flash.classList.add('active');

    // Remove after 2 seconds
    setTimeout(() => {
        flash.classList.remove('active');
    }, 2000);
}

function openSettings() {
    document.getElementById('settings-modal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settings-modal').classList.remove('active');
}

function resetDatabase() {
    if (confirm('Are you sure you want to delete all data and captures? This action cannot be undone.')) {
        fetch('/api/reset_db', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Database and captures have been reset.');
                    location.reload();
                } else {
                    alert('Error resetting database: ' + data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function viewImage(filename, timestamp) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTimestamp = document.getElementById('modal-timestamp');

    modalImage.src = `/captures/${filename}`;
    modalTimestamp.innerText = `Captured at: ${timestamp}`;

    modal.classList.add('active');
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSettings();
        closeImageModal();
    }
});

function fetchStats() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('stat-fps').innerText = data.fps;
            document.getElementById('stat-sitting').innerText = data.sitting_count || 0;
            document.getElementById('stat-alerts').innerText = data.capture_count;

            // Trigger flash effect when new alert detected
            if (data.capture_count > lastAlertCount) {
                triggerAlertFlash();
                lastAlertCount = data.capture_count;
            }

            renderAlerts(data.captures);
        })
        .catch(error => console.error('Error:', error));
}

function renderAlerts(captures) {
    const container = document.getElementById('alerts-list');

    if (!captures || captures.length === 0) {
        container.innerHTML = '<div class="empty-msg">No alerts</div>';
        return;
    }

    const firstId = captures[0].filename;
    const currentFirstId = container.firstElementChild && container.firstElementChild.dataset
        ? container.firstElementChild.dataset.id : null;

    if (firstId === currentFirstId && captures.length === container.children.length) return;

    container.innerHTML = captures.map(capture => `
        <div class="alert-card" data-id="${capture.filename}" onclick="viewImage('${capture.filename}', '${capture.timestamp}')">
            <img src="/captures/${capture.filename}" class="alert-image" alt="Alert">
            <div class="alert-info">${capture.timestamp}</div>
        </div>
    `).join('');
}

// Load theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        const body = document.body;
        const btn = document.getElementById('theme-btn');

        if (currentTheme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            btn.innerText = '☀️';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            btn.innerText = '🌙';
        }
    }

    // Initialize last alert count
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            lastAlertCount = data.capture_count;
        });
});

setInterval(fetchStats, 1000);
fetchStats();
