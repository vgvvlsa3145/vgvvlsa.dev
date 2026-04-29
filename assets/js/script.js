$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top')?.classList.add('active');
        } else {
            document.querySelector('#scroll-top')?.classList.remove('active');
        }

        // Scroll Progress Bar Logic
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("scroll-progress");
        if (progressBar) progressBar.style.width = scrolled + "%";

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Dark mode logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Gnanna Veera";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        scale: 1.05
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    scale: 1.05
});
// <!-- tilt js effect ends -->


// Preloader Matrix Animation
function initMatrixPreloader() {
    const canvas = document.getElementById('preloader-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    const interval = setInterval(draw, 33);
    
    // Fade out after 1.5s
    setTimeout(() => {
        clearInterval(interval);
        const loader = document.getElementById('matrix-preloader');
        if (loader) loader.classList.add('fade-out');
    }, 1500);
}

// Initialize preloader immediately
initMatrixPreloader();

// pre loader end

// disable developer mode and right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Prevent copying, cutting, and pasting
document.addEventListener('copy', function(e) { e.preventDefault(); });
document.addEventListener('cut', function(e) { e.preventDefault(); });
document.addEventListener('paste', function(e) { e.preventDefault(); });

// Prevent drag and drop
document.addEventListener('dragstart', function(e) { e.preventDefault(); });
document.addEventListener('drop', function(e) { e.preventDefault(); });

document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    // Prevent Save Page (Ctrl+S / Cmd+S)
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
        e.preventDefault();
        return false;
    }
    // Prevent Print (Ctrl+P / Cmd+P)
    if ((e.ctrlKey || e.metaKey) && e.keyCode == 80) {
        e.preventDefault();
        return false;
    }
}

/* ======================================================== */
/* TERMINAL MODE LOGIC */
/* ======================================================== */
const terminalToggle = document.getElementById('terminal-toggle');
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalClose = document.getElementById('terminal-close');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

if(terminalToggle && terminalOverlay) {
    terminalToggle.addEventListener('click', () => {
        terminalOverlay.style.display = 'flex';
        terminalInput.focus();
    });
    
    terminalClose.addEventListener('click', () => {
        terminalOverlay.style.display = 'none';
    });
    
    async function handleTerminalInput(e) {
        if(e.key === 'Enter') {
            const fullCommand = e.target.value.trim();
            const command = fullCommand.toLowerCase();
            e.target.value = '';
            
            // Print user command
            terminalBody.innerHTML += `<div class="terminal-input-line"><span class="terminal-prompt">guest@gnannaveera:~$</span><span>${fullCommand}</span></div>`;
            
            // Process command
            let output = '';
            
            if (command.startsWith('ask ')) {
                const question = fullCommand.substring(4);
                const thinkingId = "terminal-thinking-" + Date.now();
                terminalBody.innerHTML += `<p class="terminal-line text-info" id="${thinkingId}">[AI is thinking...]</p>`;
                terminalBody.scrollTop = terminalBody.scrollHeight;
                
                try {
                    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${GROQ_API_KEY}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: "llama-3.1-8b-instant",
                            messages: [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": question}],
                            temperature: 0.5,
                            max_tokens: 200
                        })
                    });
                    const data = await response.json();
                    document.getElementById(thinkingId).remove();
                    output = data.choices[0].message.content;
                } catch(error) {
                    document.getElementById(thinkingId).remove();
                    output = `Error connecting to AI: ${error.message}`;
                }
            } else {
                switch(command) {
                    case 'help':
                        output = `Available commands:<br>- ask [question]: Query the AI about Gnanna Veera<br>- whoami: About me<br>- ls projects: List projects<br>- cat skills.txt: List technical skills<br>- clear: Clear terminal<br>- exit: Close terminal`;
                        break;
                    case 'whoami':
                        output = `Gnanna Veera Sai Adithya.<br>CSE graduate specializing in AI & Machine Learning. Backend / Full Stack Developer.`;
                        break;
                    case 'ls projects':
                        output = `AI Video Summarizer<br>Medical Image Fusion<br>Produce Grading System<br>Low-Light Enhancement<br>Emotion Recognition<br>AI Chatbot System`;
                        break;
                    case 'cat skills.txt':
                        output = `[Python, Java, C++, JS, SQL, Django, FastAPI, Spring Boot, React, PostgreSQL, TensorFlow, Keras, CNN, NLP, Streamlit]`;
                        break;
                    case 'clear':
                        terminalBody.innerHTML = '';
                        break;
                    case 'exit':
                        terminalOverlay.style.display = 'none';
                        break;
                    case '':
                        break;
                    default:
                        output = `bash: ${command}: command not found`;
                }
            }
            
            if(output) {
                terminalBody.innerHTML += `<p class="terminal-line text-warning">${output}</p>`;
            }
            
            // Scroll to bottom and re-add input line
            terminalBody.innerHTML += `
            <div class="terminal-input-line">
                <span class="terminal-prompt">guest@gnannaveera:~$</span>
                <input type="text" id="terminal-input-temp" autocomplete="off" spellcheck="false" autofocus>
            </div>`;
            
            // Re-bind input
            const newInputs = terminalBody.querySelectorAll('input');
            const newInput = newInputs[newInputs.length - 1];
            newInput.addEventListener('keydown', handleTerminalInput);
            newInput.focus();
            
            // Remove old input
            e.target.remove();
        }
    }

    terminalInput.addEventListener('keydown', handleTerminalInput);
}


/* ======================================================== */
/* GROQ AI CHATBOT LOGIC */
/* ======================================================== */
const chatbotLauncher = document.getElementById('chatbot-launcher');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotBody = document.getElementById('chatbot-body');
const chatInputText = document.getElementById('chat-input-text');
const chatSendBtn = document.getElementById('chat-send-btn');

// GROQ API CONFIGURATION
const GROQ_API_KEY = "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";
const SYSTEM_PROMPT = `You are the personal AI assistant for Veligarapu Gnanna Veera Sai Adithya. 
He is a Backend / Full Stack Developer and AI/ML Enthusiast.
Skills: Python, Java, C++, JavaScript, SQL, Django, FastAPI, Spring Boot, React, TensorFlow, Keras, CNN, NLP.
Experience: Software Trainee at IMTDA Infotech Pvt. Ltd. (May 2025 - Present), Freelance Developer (2024 - Present).
Education: B.Tech CSE (AI & ML) 2021-2025, CGPA: 8.0.
Projects: AI Video Summarizer, Medical Image Fusion, Produce Grading System, Low-Light Enhancement, Emotion Recognition, AI Chatbot System.
Contact: +91 8919411448, vgvvlsa@gmail.com, LinkedIn: vgvvlsa2004, GitHub: vgvvlsa3145.
Always be polite, professional, and very concise. Keep answers under 3 sentences. Only answer questions related to Gnanna Veera's professional profile.`;

let chatHistory = [{"role": "system", "content": SYSTEM_PROMPT}];

if(chatbotLauncher) {
    chatbotLauncher.addEventListener('click', () => {
        chatbotWidget.style.display = 'flex';
        chatbotLauncher.style.display = 'none';
    });
    
    chatbotClose.addEventListener('click', () => {
        chatbotWidget.style.display = 'none';
        chatbotLauncher.style.display = 'flex';
    });
    
    const sendChatMessage = async () => {
        const text = chatInputText.value.trim();
        if(!text) return;
        
        // Add User message
        chatbotBody.innerHTML += `<div class="chat-msg user-msg">${text}</div>`;
        chatInputText.value = '';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        // Show typing indicator
        const typingId = "typing-" + Date.now();
        chatbotBody.innerHTML += `<div id="${typingId}" class="chat-msg bot-msg">Thinking...</div>`;
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        chatHistory.push({"role": "user", "content": text});
        
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: chatHistory,
                    temperature: 0.5,
                    max_tokens: 250
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const botReply = data.choices[0].message.content;
            
            document.getElementById(typingId).remove();
            chatbotBody.innerHTML += `<div class="chat-msg bot-msg">${botReply}</div>`;
            chatHistory.push({"role": "assistant", "content": botReply});
            
        } catch(error) {
            document.getElementById(typingId).remove();
            chatbotBody.innerHTML += `<div class="chat-msg bot-msg" style="color: #ff4d4d; border: 1px solid #ff4d4d;">
                <strong>Connection Error:</strong> ${error.message}<br>
                <small>Please check your internet or API key.</small>
            </div>`;
            console.error("Chatbot Error:", error);
        }
        
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    };
    
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInputText.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') sendChatMessage();
    });
}


/* ======================================================== */
/* KONAMI CODE MATRIX EASTER EGG */
/* ======================================================== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0;
            triggerMatrixEffect();
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    const interval = setInterval(draw, 33);
    
    // Stop after 7 seconds
    setTimeout(() => {
        clearInterval(interval);
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 1s ease';
        setTimeout(() => canvas.remove(), 1000);
    }, 7000);
}


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

