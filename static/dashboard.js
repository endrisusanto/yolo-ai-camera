let currentTheme = 'dark';

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-btn');

    if (currentTheme === 'dark') {
        currentTheme = 'light';
        body.classList.add('light-theme');
        btn.innerText = '☀️';
    } else {
        currentTheme = 'dark';
        body.classList.remove('light-theme');
        btn.innerText = '🌙';
    }

    localStorage.setItem('dashboardTheme', currentTheme);
}

function refreshData() {
    fetchDashboardStats();
}

function exportExcel() {
    window.location.href = '/api/export/excel';
}

function fetchDashboardStats() {
    fetch('/api/dashboard/stats')
        .then(response => response.json())
        .then(data => {
            // Update statistics cards
            document.getElementById('total-alerts').innerText = data.total_alerts;
            document.getElementById('total-sitting').innerText = data.total_sitting_sessions;

            // Format average duration
            const avgMin = Math.floor(data.avg_sitting_duration / 60);
            const avgSec = data.avg_sitting_duration % 60;
            const avgText = avgMin > 0 ? `${avgMin}m ${avgSec}s` : `${avgSec}s`;
            document.getElementById('avg-duration').innerText = avgText;

            document.getElementById('today-alerts').innerText = data.today_alerts;

            // Update badges
            document.getElementById('alerts-count').innerText = data.captures.length;
            document.getElementById('sitting-count').innerText = data.sitting_history.length;

            // Render tables
            renderAlertsTable(data.captures);
            renderSittingTable(data.sitting_history);
        })
        .catch(error => console.error('Error fetching dashboard stats:', error));
}

function renderAlertsTable(captures) {
    const tbody = document.getElementById('alerts-table');

    if (!captures || captures.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No alerts yet</td></tr>';
        return;
    }

    tbody.innerHTML = captures.map((capture) => `
        <tr>
            <td>${capture.id}</td>
            <td>${capture.date || 'N/A'}</td>
            <td>${capture.timestamp}</td>
            <td><span class="type-badge">${capture.type}</span></td>
            <td>${capture.description || 'Phone usage detected'}</td>
            <td>
                <button class="btn-view" onclick="viewImage('${capture.filename}', '${capture.timestamp}', '${capture.description || 'Phone usage detected'}')">
                    👁️ View
                </button>
            </td>
        </tr>
    `).join('');
}

function renderSittingTable(history) {
    const tbody = document.getElementById('sitting-table');

    if (!history || history.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No sitting history</td></tr>';
        return;
    }

    tbody.innerHTML = history.map(session => {
        const minutes = Math.floor(session.duration / 60);
        const seconds = session.duration % 60;
        const durationText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

        return `
            <tr>
                <td>Person #${session.person_id}</td>
                <td>${session.date || 'N/A'}</td>
                <td>${session.timestamp}</td>
                <td>${durationText}</td>
            </tr>
        `;
    }).join('');
}

function viewImage(filename, timestamp, description) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTimestamp = document.getElementById('modal-timestamp');
    const modalDescription = document.getElementById('modal-description');

    modalImage.src = `/captures/${filename}`;
    modalTimestamp.innerText = `Captured at: ${timestamp}`;
    modalDescription.innerText = description;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Load theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        const body = document.body;
        const btn = document.getElementById('theme-btn');

        if (currentTheme === 'light') {
            body.classList.add('light-theme');
            btn.innerText = '☀️';
        } else {
            btn.innerText = '🌙';
        }
    }
});

// Auto-refresh every 5 seconds
setInterval(fetchDashboardStats, 5000);

// Initial load
fetchDashboardStats();
