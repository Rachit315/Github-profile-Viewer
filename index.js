function fetchprofile() {
 const username = document.getElementById("username").value
 if (!username) {
    alert("Username Not Found")
    return;
 }   
 fetch(`https://api.github.com/users/${username}`)
.then((response) => {
    if (!response.ok) {
         throw new Error('network response is not Ok')        
    }
    return response.json()
 }).then(data => {
    displayProfile(data)
 })
 .catch(err => {
    console.error("There was a problem with fetch operation:",err);
    
 })
}
function displayProfile(profiledata) {
    const profileElement = document.getElementById('profile')
    profileElement.innerHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <img src="${profiledata.avatar_url}" alt="Profile Avatar" class="avatar">
                <h2 class="username">${profiledata.login}</h2>
                ${profiledata.name ? `<p class="full-name">${profiledata.name}</p>` : ''}
            </div>
            
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-count">${profiledata.followers}</span>
                    <span class="stat-label">Followers</span>
                </div>
                <div class="stat">
                    <span class="stat-count">${profiledata.following}</span>
                    <span class="stat-label">Following</span>
                </div>
                <div class="stat">
                    <span class="stat-count">${profiledata.public_repos}</span>
                    <span class="stat-label">Repositories</span>
                </div>
            </div>

            <div class="profile-details">
                <table class="info-table">
                    <tr>
                        <td class="info-label">Bio</td>
                        <td class="info-value">${profiledata.bio || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Location</td>
                        <td class="info-value">${profiledata.location || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Joined</td>
                        <td class="info-value">${new Date(profiledata.created_at).toLocaleDateString()}</td>
                    </tr>
                    ${profiledata.company ? `
                    <tr>
                        <td class="info-label">Company</td>
                        <td class="info-value">${profiledata.company}</td>
                    </tr>` : ''}
                    ${profiledata.email ? `
                    <tr>
                        <td class="info-label">Email</td>
                        <td class="info-value">${profiledata.email}</td>
                    </tr>` : ''}
                    ${profiledata.twitter_username ? `
                    <tr>
                        <td class="info-label">Twitter</td>
                        <td class="info-value">@${profiledata.twitter_username}</td>
                    </tr>` : ''}
                </table>
            </div>

            <div class="profile-links">
                <a href="${profiledata.html_url}" target="_blank" class="github-link">View GitHub Profile</a>
                ${profiledata.blog ? `<a href="${profiledata.blog}" target="_blank" class="blog-link">Visit Website</a>` : ''}
            </div>
        </div>
    `

    // Add the additional styles
    const styleElement = document.createElement('style')
    styleElement.textContent = `
        .profile-card {
            text-align: center;
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }

        .profile-header {
            margin-bottom: 2rem;
        }

        .avatar {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 6px solid var(--github-border);
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
        }

        .avatar:hover {
            transform: scale(1.05);
        }

        .username {
            font-size: 2.5rem;
            color: #58a6ff;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
        }

        .full-name {
            color: #8b949e;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .profile-stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin: 2rem 0;
            padding: 1.5rem;
            background: rgba(255,255,255,0.03);
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .stat {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .stat-count {
            font-size: 2rem;
            font-weight: bold;
            color: #58a6ff;
        }

        .stat-label {
            color: #8b949e;
            font-size: 1.1rem;
            margin-top: 0.5rem;
        }

        .profile-details {
            margin: 2rem auto;
            max-width: 800px;
        }

        .info-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 1rem;
        }

        .info-label {
            text-align: right;
            padding-right: 2rem;
            font-weight: bold;
            color: #58a6ff;
            width: 30%;
            font-size: 1.2rem;
            vertical-align: top;
        }

        .info-value {
            text-align: left;
            color: var(--github-text);
            background: rgba(255,255,255,0.03);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-size: 1.1rem;
            line-height: 1.6;
        }

        .profile-links {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 2.5rem;
        }

        .profile-links a {
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s;
            font-size: 1.1rem;
            font-weight: bold;
        }

        .github-link {
            background: #238636;
            color: white;
        }

        .github-link:hover {
            background: #2ea043;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(35, 134, 54, 0.4);
        }

        .blog-link {
            background: #1f6feb;
            color: white;
        }

        .blog-link:hover {
            background: #388bfd;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(31, 111, 235, 0.4);
        }
    `
    document.head.appendChild(styleElement)
}