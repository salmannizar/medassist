// Enhanced MedAssist Application JavaScript with Comprehensive Tooltips and Mobile Optimization

// Application state and data management
const AppState = {
    currentModule: 'dashboard',
    theme: 'light',
    language: 'en',
    sidebarOpen: false,
    tasks: [
        { id: 1, title: 'Study Cardiology Basics', category: 'study', priority: 'high', status: 'todo' },
        { id: 2, title: 'Complete 20 MCQs', category: 'exam', priority: 'medium', status: 'progress' },
        { id: 3, title: 'Review SOAP Notes', category: 'study', priority: 'low', status: 'done' },
        { id: 4, title: 'Practice Clinical Cases', category: 'clinical', priority: 'high', status: 'todo' },
        { id: 5, title: 'Update Medical CV', category: 'personal', priority: 'medium', status: 'progress' }
    ],
    questions: [
        {
            id: 1,
            question: "A 45-year-old patient presents with chest pain. Which of the following is the most appropriate first-line investigation?",
            options: ["ECG", "Chest X-ray", "Echocardiogram", "Cardiac catheterization"],
            correct: 0,
            explanation: "ECG is the most appropriate first-line investigation for chest pain as it can quickly identify acute coronary syndromes and guide immediate management decisions.",
            subject: "Cardiology",
            difficulty: "Medium"
        },
        {
            id: 2,
            question: "Which medication is contraindicated in patients with asthma?",
            options: ["Salbutamol", "Propranolol", "Prednisolone", "Montelukast"],
            correct: 1,
            explanation: "Beta-blockers like propranolol can cause bronchospasm in asthmatic patients by blocking beta-2 receptors in the airways.",
            subject: "Pharmacology", 
            difficulty: "Easy"
        },
        {
            id: 3,
            question: "What is the normal range for adult resting heart rate?",
            options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
            correct: 1,
            explanation: "The normal resting heart rate for adults is 60-100 beats per minute. Athletes may have lower rates due to cardiovascular conditioning.",
            subject: "Physiology",
            difficulty: "Easy"
        }
    ],
    practiceSession: {
        active: false,
        questions: [],
        currentIndex: 0,
        answers: [],
        timer: null,
        timeLeft: 300
    }
};

// Enhanced sample data with more comprehensive information
const sampleData = {
    countries: [
        {
            "name": "United Kingdom", 
            "exam": "PLAB", 
            "steps": [
                "IELTS/OET Language Test (Minimum 7.0 overall)", 
                "PLAB 1 - Written MCQ Exam (180 questions)", 
                "PLAB 2 - Clinical Skills Assessment (OSCE)", 
                "GMC Registration & Foundation Training Application", 
                "Foundation Year 1 & 2 Training Programs"
            ],
            "timeline": "18-24 months",
            "description": "The PLAB pathway allows international medical graduates to practice medicine in the UK's National Health Service."
        },
        {
            "name": "Australia", 
            "exam": "AMC", 
            "steps": [
                "AMC CAT MCQ Exam (150 questions)", 
                "AMC Clinical Exam (16 stations)", 
                "Medical Registration with AHPRA", 
                "Workplace-Based Assessment Period", 
                "Specialist Training Pathway"
            ],
            "timeline": "12-18 months",
            "description": "The Australian Medical Council pathway provides recognition for international medical graduates."
        },
        {
            "name": "Canada", 
            "exam": "MCCEE", 
            "steps": [
                "MCCEE - Medical Council Exam (196 questions)", 
                "NAC-OSCE Clinical Skills Assessment", 
                "Residency Match Process (CaRMS)", 
                "Medical Licensing with Provincial College", 
                "Residency Training & Board Certification"
            ],
            "timeline": "24-36 months",
            "description": "The Medical Council of Canada pathway leads to medical practice across Canadian provinces."
        },
        {
            "name": "United States", 
            "exam": "USMLE", 
            "steps": [
                "USMLE Step 1 - Basic Science Knowledge", 
                "USMLE Step 2 CK - Clinical Knowledge", 
                "USMLE Step 2 CS - Clinical Skills", 
                "ECFMG Certification", 
                "Residency Match & Board Certification"
            ],
            "timeline": "36-48 months",
            "description": "The United States Medical Licensing Examination pathway for international medical graduates."
        }
    ],
    clinicalCases: [
        {
            id: "acute-mi",
            title: "Acute Myocardial Infarction Case Study",
            description: "A 55-year-old male presents to the emergency department with sudden onset of severe chest pain that started 2 hours ago. The pain is described as crushing, 8/10 intensity, and radiates to the left arm and jaw. Patient appears diaphoretic and anxious. Past medical history includes hypertension and diabetes. Vital signs: BP 160/90, HR 110, RR 22, O2 sat 96%. ECG shows ST elevation in leads II, III, and aVF.",
            difficulty: "Intermediate",
            specialty: "Cardiology",
            estimatedTime: "30-45 minutes"
        },
        {
            id: "diabetes",
            title: "New Onset Type 2 Diabetes Management", 
            description: "A 42-year-old female presents with polyuria, polydipsia, and unexplained weight loss over the past 3 months. She reports increased appetite but has lost 15 pounds. Recent laboratory results: fasting glucose 250 mg/dL, HbA1c 11.2%, BMI 32. No family history of diabetes. Patient requests comprehensive management plan and education.",
            difficulty: "Beginner",
            specialty: "Endocrinology",
            estimatedTime: "20-30 minutes"
        },
        {
            id: "pneumonia",
            title: "Community-Acquired Pneumonia Management",
            description: "A 65-year-old male with a history of COPD presents with a 4-day history of productive cough with yellow sputum, fever of 101.5Â°F, and progressively worsening dyspnea. Physical examination reveals decreased breath sounds and crackles in the right lower lobe. Chest X-ray shows right lower lobe consolidation. Patient lives alone and has limited social support.",
            difficulty: "Advanced",
            specialty: "Pulmonology",
            estimatedTime: "45-60 minutes"
        }
    ]
};

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    if (toast && toastMessage) {
        // Update icon based on type
        if (toastIcon) {
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };
            toastIcon.className = `toast-icon ${icons[type] || icons.success}`;
        }
        
        // Update toast styling based on type
        const colors = {
            success: 'linear-gradient(135deg, #059669, #0d9488)',
            error: 'linear-gradient(135deg, #dc2626, #ef4444)',
            warning: 'linear-gradient(135deg, #d97706, #f59e0b)',
            info: 'linear-gradient(135deg, #0369a1, #0284c7)'
        };
        
        toast.style.background = colors[type] || colors.success;
        toast.className = `toast show ${type}`;
        toastMessage.textContent = message;
        
        if (toast._timeout) clearTimeout(toast._timeout);
        
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function toggleModal(modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (show) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
}

function isMobile() {
    return window.innerWidth < 768;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

function updateLogoSize() {
    const logoSvg = document.querySelector('.logo-svg');
    if (logoSvg) {
        if (isMobile()) {
            logoSvg.style.width = '44px';
            logoSvg.style.height = '44px';
        } else if (isTablet()) {
            logoSvg.style.width = '48px';
            logoSvg.style.height = '48px';
        } else {
            logoSvg.style.width = '52px';
            logoSvg.style.height = '52px';
        }
    }
}

// Enhanced Mobile Sidebar Functions with Better UX
function toggleSidebar() {
    console.log('Toggle sidebar called');
    
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    
    if (!sidebar || !overlay) {
        console.error('Required sidebar elements not found');
        return;
    }
    
    AppState.sidebarOpen = !AppState.sidebarOpen;
    
    sidebar.classList.toggle('open', AppState.sidebarOpen);
    overlay.classList.toggle('active', AppState.sidebarOpen);
    
    if (AppState.sidebarOpen) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKey);
        // Add focus trap for accessibility
        sidebar.focus();
    } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = AppState.sidebarOpen ? 'fas fa-times' : 'fas fa-bars';
        }
        // Update tooltip
        menuToggle.setAttribute('data-tooltip', 
            AppState.sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'
        );
    }
    
    console.log('Sidebar toggled:', AppState.sidebarOpen);
}

function closeSidebar() {
    if (AppState.sidebarOpen) {
        toggleSidebar();
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeSidebar();
    }
}

// Enhanced Navigation System with Better Error Handling
function switchModule(moduleId) {
    console.log('ðŸ”„ SWITCHING TO MODULE:', moduleId);
    
    // Validate module exists
    const targetModule = document.getElementById(moduleId);
    if (!targetModule) {
        console.error('âŒ Module not found:', moduleId);
        showToast(`Module ${moduleId} not found`, 'error');
        return false;
    }

    // Update navigation active states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-module="${moduleId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
        console.log('âœ… Set active nav item for:', moduleId);
    }

    // Hide ALL modules first
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
        module.style.display = 'none';
    });
    
    // Show target module
    targetModule.classList.add('active');
    targetModule.style.display = 'block';

    // Update app state
    AppState.currentModule = moduleId;
    
    // Close mobile sidebar after navigation
    if (isMobile() && AppState.sidebarOpen) {
        setTimeout(() => closeSidebar(), 300);
    }
    
    // Scroll to top
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.scrollTop = 0;
    }
    
    // Update page title
    updatePageTitle(moduleId);
    
    console.log(`âœ… Successfully switched to ${moduleId}`);
    
    // Initialize module-specific functionality
    setTimeout(() => {
        initializeModule(moduleId);
    }, 100);
    
    return true;
}

function updatePageTitle(moduleId) {
    const moduleTitles = {
        'dashboard': 'Dashboard - MedAssist',
        'ai-tutor': 'AI Medical Tutor - MedAssist',
        'career-coach': 'Career Coach - MedAssist',
        'clinical-assistant': 'Clinical Assistant - MedAssist',
        'question-bank': 'Question Bank - MedAssist',
        'daily-planner': 'Daily Planner - MedAssist'
    };
    
    document.title = moduleTitles[moduleId] || 'MedAssist - Your Smart Medical Co-Pilot';
}

function initializeModule(moduleId) {
    console.log('ðŸ”§ Initializing module:', moduleId);
    
    try {
        switch(moduleId) {
            case 'dashboard':
                initDashboard();
                break;
            case 'ai-tutor':
                initAITutor();
                break;
            case 'career-coach':
                initCareerCoach();
                break;
            case 'clinical-assistant':
                initClinicalAssistant();
                break;
            case 'question-bank':
                initQuestionBank();
                break;
            case 'daily-planner':
                initDailyPlanner();
                break;
            default:
                console.warn('âš ï¸ Unknown module:', moduleId);
        }
    } catch (error) {
        console.error(`âŒ Error initializing ${moduleId}:`, error);
        showToast(`Error loading ${moduleId} module`, 'error');
    }
}

// Enhanced Navigation Setup with Better Event Handling
function initNavigation() {
    console.log('ðŸ”§ Setting up navigation system...');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
        console.log('âœ… Mobile menu toggle configured');
    }

    // Mobile overlay click closes sidebar
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Navigation items setup
    const navItems = document.querySelectorAll('.nav-item[data-module]');
    console.log('ðŸ“‹ Found navigation items:', navItems.length);
    
    navItems.forEach((navItem, index) => {
        const targetModule = navItem.getAttribute('data-module');
        console.log(`ðŸ”— Setting up nav item ${index + 1}: ${targetModule}`);
        
        // Remove any existing listeners by cloning
        const newNavItem = navItem.cloneNode(true);
        navItem.parentNode.replaceChild(newNavItem, navItem);
        
        // Add fresh event listener
        newNavItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`ðŸ–±ï¸ Navigation clicked: ${targetModule}`);
            
            const success = switchModule(targetModule);
            if (success) {
                const moduleName = targetModule.charAt(0).toUpperCase() + targetModule.slice(1).replace('-', ' ');
                showToast(`Switched to ${moduleName}`, 'success');
            }
        });
    });

    // Quick navigation buttons
    const quickNavBtns = document.querySelectorAll('[data-quick-nav]');
    quickNavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetModule = btn.getAttribute('data-quick-nav');
            if (targetModule) {
                const success = switchModule(targetModule);
                if (success) {
                    const moduleName = targetModule.replace('-', ' ');
                    showToast(`Quick navigation to ${moduleName}`, 'info');
                }
            }
        });
    });
    
    // App brand click returns to dashboard
    const appBrand = document.querySelector('.app-brand');
    if (appBrand) {
        appBrand.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-menu-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                switchModule('dashboard');
                showToast('Welcome back to Dashboard', 'info');
            }
        });
    }

    // Enhanced window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768 && AppState.sidebarOpen) {
                closeSidebar();
            }
            updateLogoSize();
        }, 150);
    });
    
    // Prevent sidebar close when clicking inside
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    console.log('âœ… Navigation system initialized');
}

// Module Implementations

function initDashboard() {
    console.log('ðŸ  Initializing Dashboard...');
    
    // Update progress statistics
    updateDashboardStats();
    
    // Initialize quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        if (!btn._initialized) {
            btn._initialized = true;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetModule = btn.getAttribute('data-quick-nav');
                if (targetModule) {
                    switchModule(targetModule);
                }
            });
        }
    });
    
    console.log('âœ… Dashboard initialized');
}

function updateDashboardStats() {
    // This would normally fetch real data from an API
    const stats = {
        dayStreak: 7,
        topicsCompleted: '24/50',
        questionsSolved: 456
    };
    
    // Update stat cards if they exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = stats.dayStreak;
        statNumbers[1].textContent = stats.topicsCompleted;
        statNumbers[2].textContent = stats.questionsSolved;
    }
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', AppState.theme);
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = AppState.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Update tooltip
        themeToggle.setAttribute('data-tooltip', 
            AppState.theme === 'light' 
                ? 'Switch to dark theme' 
                : 'Switch to light theme'
        );
        
        showToast(`Switched to ${AppState.theme} mode`, 'info');
    });
}

function initLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    if (!languageSelector) return;
    
    languageSelector.addEventListener('change', (e) => {
        AppState.language = e.target.value;
        const selectedOption = e.target.options[e.target.selectedIndex];
        const languageName = selectedOption.text.split(' ').slice(1).join(' ');
        showToast(`Language changed to ${languageName}`, 'info');
    });
}

// AI Tutor Module Implementation
function initAITutor() {
    console.log('ðŸ§  Initializing AI Tutor...');
    
    const generateBtn = document.getElementById('generate-study-material');
    if (generateBtn && !generateBtn._initialized) {
        generateBtn._initialized = true;
        generateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            generateStudyMaterial();
        });
    }
    
    // Chat functionality
    const sendChatBtn = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    
    if (sendChatBtn && !sendChatBtn._initialized) {
        sendChatBtn._initialized = true;
        sendChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sendChatMessage();
        });
    }
    
    if (chatInput && !chatInput._initialized) {
        chatInput._initialized = true;
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }

    // Tab functionality
    const tabBtns = document.querySelectorAll('.study-tabs .tab-btn');
    tabBtns.forEach(btn => {
        if (!btn._initialized) {
            btn._initialized = true;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = btn.getAttribute('data-tab');
                switchStudyTab(tabName);
                showToast(`Switched to ${tabName} view`, 'info');
            });
        }
    });
    
    console.log('âœ… AI Tutor initialized');
}

function generateStudyMaterial() {
    const topicInput = document.getElementById('topic-input');
    const studyOutput = document.getElementById('study-output');
    const chatInterface = document.getElementById('chat-interface');
    
    if (!topicInput) {
        showToast('Topic input not found', 'error');
        return;
    }
    
    const topic = topicInput.value.trim();
    
    if (!topic) {
        showToast('Please enter a study topic', 'warning');
        topicInput.focus();
        return;
    }

    console.log('ðŸ”„ Generating AI study material for:', topic);
    showToast('Generating AI-powered study material...', 'info');
    
    const generateBtn = document.getElementById('generate-study-material');
    if (generateBtn) {
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;
    }
    
    if (studyOutput) studyOutput.style.display = 'block';
    if (chatInterface) chatInterface.style.display = 'block';
    
    setTimeout(() => {
        generateSummary(topic);
        generateMindMap(topic);
        generateQuestions(topic);
        
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Study Material';
            generateBtn.disabled = false;
        }
        
        showToast('Study material generated by GPT-4! ðŸŽ‰', 'success');
    }, 2000);
}

function generateSummary(topic) {
    const summaryContent = document.getElementById('summary-content');
    if (!summaryContent) return;
    
    summaryContent.innerHTML = `
        <div class="ai-generated-content">
            <div class="content-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h4 style="color: var(--color-primary); margin: 0; font-size: var(--font-size-xl); font-weight: var(--font-weight-bold);">
                    <i class="fas fa-brain"></i> ${topic} - AI-Generated Summary
                </h4>
                <div class="ai-badge" style="background: linear-gradient(45deg, #1e40af, #0d9488); color: white; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: bold;">
                    Powered by GPT-4
                </div>
            </div>
            <div class="summary-sections">
                <div class="summary-section" style="margin-bottom: 24px; padding: 24px; background: var(--color-background); border-radius: 12px; border: 3px solid var(--color-border); box-shadow: var(--shadow-sm);">
                    <h5 style="color: var(--color-primary); margin-bottom: 20px; font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">
                        ðŸ§  Key Concepts & Mechanisms
                    </h5>
                    <ul style="color: var(--color-text); line-height: 1.8; padding-left: 24px; font-weight: var(--font-weight-medium);">
                        <li>Fundamental principles and underlying mechanisms related to ${topic}</li>
                        <li>Clinical applications and real-world medical relevance</li>
                        <li>Common pathophysiological processes and disease patterns</li>
                        <li>Diagnostic approaches, tools, and result interpretations</li>
                        <li>Evidence-based treatment protocols and management strategies</li>
                        <li>Important contraindications and potential complications</li>
                    </ul>
                </div>
                <div class="summary-section" style="margin-bottom: 24px; padding: 24px; background: var(--color-secondary); border-radius: 12px; border: 2px solid var(--color-border);">
                    <h5 style="color: var(--color-primary); margin-bottom: 20px; font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">
                        ðŸ’¡ Essential Study Points & Tips
                    </h5>
                    <div class="highlight-box" style="color: var(--color-text); line-height: 1.8; font-weight: var(--font-weight-medium);">
                        <p style="margin-bottom: 16px;"><strong style="color: var(--color-primary);">ðŸŽ¯ Focus Area:</strong> Understanding core mechanisms rather than memorizing isolated facts</p>
                        <p style="margin-bottom: 16px;"><strong style="color: var(--color-primary);">ðŸ“š Study Strategy:</strong> Review clinical correlations for better retention and application</p>
                        <p style="margin-bottom: 16px;"><strong style="color: var(--color-primary);">ðŸ”¬ Practice Method:</strong> Apply knowledge with real-world scenarios and case studies</p>
                        <p style="margin: 0;"><strong style="color: var(--color-primary);">ðŸ§‘â€âš•ï¸ Clinical Relevance:</strong> Connect theoretical knowledge to patient care and outcomes</p>
                    </div>
                </div>
                <div class="summary-section" style="padding: 24px; background: linear-gradient(135deg, rgba(var(--color-teal-500-rgb), 0.1), rgba(var(--color-teal-500-rgb), 0.05)); border-radius: 12px; border: 2px solid var(--color-primary);">
                    <h5 style="color: var(--color-primary); margin-bottom: 20px; font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);">
                        ðŸŽ“ Next Steps & Advanced Learning
                    </h5>
                    <div style="color: var(--color-text); line-height: 1.7; font-weight: var(--font-weight-medium);">
                        <p style="margin-bottom: 12px;">â€¢ Practice with related clinical cases and OSCE scenarios</p>
                        <p style="margin-bottom: 12px;">â€¢ Complete relevant MCQ questions to test understanding</p>
                        <p style="margin-bottom: 12px;">â€¢ Review recent medical literature and guidelines</p>
                        <p style="margin: 0;">â€¢ Discuss complex cases with peers or mentors</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMindMap(topic) {
    const mindmapContent = document.getElementById('mindmap-content');
    if (!mindmapContent) return;
    
    mindmapContent.innerHTML = `
        <div class="mindmap-container" style="display: flex; flex-direction: column; align-items: center; gap: 32px;">
            <div class="mindmap-center">
                <div class="central-topic" style="background: linear-gradient(45deg, #1e40af, #0d9488); color: white; padding: 24px 36px; border-radius: 20px; font-weight: bold; font-size: 24px; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.3); border: 3px solid rgba(255,255,255,0.3);">
                    ${topic}
                </div>
            </div>
            <div class="mindmap-branches" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; width: 100%;">
                <div class="branch-group" style="background: var(--color-background); padding: 24px; border-radius: 16px; border: 3px solid var(--color-border); box-shadow: var(--shadow-md); transition: all 0.3s ease;">
                    <div class="branch-header" style="font-weight: bold; color: var(--color-primary); margin-bottom: 20px; font-size: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-book"></i>
                        Basic Concepts
                    </div>
                    <div class="branch-items" style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ“š Definition & Terminology
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            âš™ï¸ Core Mechanisms
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ·ï¸ Classifications
                        </div>
                    </div>
                </div>
                <div class="branch-group" style="background: var(--color-background); padding: 24px; border-radius: 16px; border: 3px solid var(--color-border); box-shadow: var(--shadow-md); transition: all 0.3s ease;">
                    <div class="branch-header" style="font-weight: bold; color: var(--color-primary); margin-bottom: 20px; font-size: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-stethoscope"></i>
                        Clinical Application
                    </div>
                    <div class="branch-items" style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ” Diagnostic Methods
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ’Š Treatment Options
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ¥ Patient Management
                        </div>
                    </div>
                </div>
                <div class="branch-group" style="background: var(--color-background); padding: 24px; border-radius: 16px; border: 3px solid var(--color-border); box-shadow: var(--shadow-md); transition: all 0.3s ease;">
                    <div class="branch-header" style="font-weight: bold; color: var(--color-primary); margin-bottom: 20px; font-size: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-lightbulb"></i>
                        Key Learning Points
                    </div>
                    <div class="branch-items" style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            âš¡ Critical Facts
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            ðŸ§  Memory Techniques
                        </div>
                        <div class="branch-item" style="padding: 16px; background: var(--color-secondary); border-radius: 10px; font-size: 14px; font-weight: 600; border: 2px solid transparent; transition: all 0.3s ease; cursor: pointer;">
                            âš ï¸ Common Pitfalls
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add hover effects to branch items
    const branchItems = mindmapContent.querySelectorAll('.branch-item');
    branchItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = 'var(--color-primary)';
            item.style.transform = 'translateY(-2px)';
            item.style.boxShadow = 'var(--shadow-sm)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = 'transparent';
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}

function generateQuestions(topic) {
    const questionsContent = document.getElementById('questions-content');
    if (!questionsContent) return;
    
    questionsContent.innerHTML = `
        <div class="practice-questions">
            <div class="question-block" style="background: var(--color-background); padding: 32px; border-radius: 16px; border: 3px solid var(--color-border); margin-bottom: 24px; box-shadow: var(--shadow-md);">
                <h5 style="color: var(--color-primary); margin-bottom: 24px; font-size: 20px; font-weight: bold; display: flex; align-items: center; gap: 12px;">
                    <i class="fas fa-question-circle"></i>
                    Sample Question for ${topic}
                </h5>
                <p style="font-weight: 600; margin-bottom: 24px; font-size: 17px; line-height: 1.7; color: var(--color-text);">
                    Which of the following best describes the primary mechanism related to ${topic}?
                </p>
                <div class="question-options" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
                    <label class="option-label" style="display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--color-secondary); border-radius: 12px; cursor: pointer; transition: all 0.3s; border: 3px solid transparent; font-weight: 500;">
                        <input type="radio" name="q1" value="a" style="margin: 0; transform: scale(1.2);"> 
                        <span><strong>A.</strong> Primary pathophysiological mechanism involving cellular processes</span>
                    </label>
                    <label class="option-label" style="display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--color-secondary); border-radius: 12px; cursor: pointer; transition: all 0.3s; border: 3px solid transparent; font-weight: 500;">
                        <input type="radio" name="q1" value="b" style="margin: 0; transform: scale(1.2);"> 
                        <span><strong>B.</strong> Secondary compensatory mechanism and adaptive responses</span>
                    </label>
                    <label class="option-label" style="display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--color-secondary); border-radius: 12px; cursor: pointer; transition: all 0.3s; border: 3px solid transparent; font-weight: 500;">
                        <input type="radio" name="q1" value="c" style="margin: 0; transform: scale(1.2);"> 
                        <span><strong>C.</strong> Tertiary adaptive response with regulatory feedback</span>
                    </label>
                    <label class="option-label" style="display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--color-secondary); border-radius: 12px; cursor: pointer; transition: all 0.3s; border: 3px solid transparent; font-weight: 500;">
                        <input type="radio" name="q1" value="d" style="margin: 0; transform: scale(1.2);"> 
                        <span><strong>D.</strong> Alternative pathway activation and bypass mechanisms</span>
                    </label>
                </div>
                <button class="btn btn--primary btn--lg" onclick="checkPracticeAnswers()" 
                        style="padding: 16px 32px; font-weight: bold; font-size: 16px;">
                    <i class="fas fa-check-circle"></i>
                    Check Answer & View Explanation
                </button>
            </div>
            
            <div id="answer-explanation" style="display: none; background: linear-gradient(135deg, rgba(var(--color-success-rgb), 0.1), rgba(var(--color-success-rgb), 0.05)); border: 3px solid var(--color-success); border-radius: 16px; padding: 32px; margin-top: 24px;">
                <h6 style="color: var(--color-success); font-weight: bold; font-size: 18px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
                    <i class="fas fa-lightbulb"></i>
                    Correct Answer Explanation
                </h6>
                <p style="font-weight: 600; margin-bottom: 16px; color: var(--color-text); font-size: 16px;">
                    <strong>Correct Answer: A</strong> - Primary pathophysiological mechanism involving cellular processes
                </p>
                <p style="line-height: 1.7; color: var(--color-text); font-weight: 500; font-size: 15px;">
                    The primary mechanism related to ${topic} involves fundamental cellular and molecular processes that form the foundation of medical understanding in this area. This knowledge is essential for clinical decision-making and patient care.
                </p>
            </div>
        </div>
    `;
    
    // Add hover effects to option labels
    const optionLabels = questionsContent.querySelectorAll('.option-label');
    optionLabels.forEach(label => {
        label.addEventListener('mouseenter', () => {
            label.style.borderColor = 'var(--color-primary)';
            label.style.transform = 'translateX(8px)';
        });
        label.addEventListener('mouseleave', () => {
            label.style.borderColor = 'transparent';
            label.style.transform = 'translateX(0)';
        });
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.innerHTML = `
        <div style="margin: 20px 0; padding: 20px 24px; background: linear-gradient(135deg, #1e40af, #0d9488); color: white; border-radius: 16px; margin-left: 20%; box-shadow: 0 4px 12px rgba(30,64,175,0.3); max-width: 80%; font-weight: 500;">
            <strong style="font-size: 16px;">You:</strong> ${message}
        </div>
    `;
    chatMessages.appendChild(userMessage);
    
    chatInput.value = '';
    
    // Show typing indicator
    const typingMessage = document.createElement('div');
    typingMessage.innerHTML = `
        <div class="typing-indicator" style="margin: 20px 0; padding: 20px 24px; background: var(--color-secondary); border-radius: 16px; margin-right: 20%; font-style: italic; max-width: 80%; border: 2px solid var(--color-border);">
            <strong style="color: var(--color-primary); font-size: 16px;">GPT-4:</strong> 
            <span style="color: var(--color-primary);">
                <i class="fas fa-brain fa-spin"></i> Analyzing your question and generating response...
            </span>
        </div>
    `;
    chatMessages.appendChild(typingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
        chatMessages.removeChild(typingMessage);
        const aiMessage = document.createElement('div');
        aiMessage.innerHTML = `
            <div style="margin: 20px 0; padding: 20px 24px; background: var(--color-secondary); border-radius: 16px; margin-right: 20%; box-shadow: var(--shadow-sm); max-width: 80%; line-height: 1.7; border: 2px solid var(--color-border);">
                <strong style="color: var(--color-primary); font-size: 16px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-brain"></i>
                    GPT-4 Medical Tutor:
                </strong> 
                <p style="margin: 0; font-weight: 500; color: var(--color-text);">
                    Excellent question about "${message}"! Based on current medical literature and evidence-based practice, here's a comprehensive explanation addressing your query. This concept connects to several key medical principles including pathophysiology, clinical decision-making, and patient management strategies that are essential for your medical education journey.
                </p>
                <div style="margin-top: 16px; padding: 12px; background: rgba(var(--color-primary-rgb), 0.1); border-radius: 8px; border-left: 4px solid var(--color-primary);">
                    <small style="color: var(--color-text-secondary); font-weight: 600;">
                        ðŸ’¡ Tip: Consider reviewing related topics and practicing with clinical scenarios to reinforce this knowledge.
                    </small>
                </div>
            </div>
        `;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2200);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function switchStudyTab(tabName) {
    // Remove active from all tabs and content
    document.querySelectorAll('.study-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.study-output .tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active to selected tab and content
    const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const targetContent = document.getElementById(`${tabName}-tab`);
    
    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

// Career Coach Module Implementation
function initCareerCoach() {
    console.log('ðŸŒ Initializing Career Coach...');
    
    document.querySelectorAll('.country-card').forEach(card => {
        if (!card._initialized) {
            card._initialized = true;
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const country = card.getAttribute('data-country');
                selectCountry(country);
            });
        }
    });
    
    // Initialize CV builder buttons
    const cvButtons = document.querySelectorAll('.cv-actions .btn');
    cvButtons.forEach(btn => {
        if (!btn._initialized) {
            btn._initialized = true;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = btn.textContent.trim();
                showToast(`${buttonText} feature - Coming soon! ðŸš€`, 'info');
            });
        }
    });
    
    console.log('âœ… Career Coach initialized');
}

function selectCountry(countryCode) {
    console.log('ðŸ”„ Processing country selection:', countryCode);
    
    // Update selected state
    document.querySelectorAll('.country-card').forEach(card => card.classList.remove('selected'));
    const selectedCard = document.querySelector(`[data-country="${countryCode}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Map country codes to names
    const countryMap = {
        'uk': 'United Kingdom',
        'usa': 'United States', 
        'australia': 'Australia',
        'canada': 'Canada'
    };
    
    const countryName = countryMap[countryCode];
    const countryData = sampleData.countries.find(c => c.name === countryName);
    
    if (countryData) {
        displayPathwayDetails(countryData);
        showToast(`${countryData.exam} pathway loaded for ${countryData.name}! ðŸŽ¯`, 'success');
    }
}

function displayPathwayDetails(countryData) {
    const pathwayDetails = document.getElementById('pathway-details');
    const pathwayTitle = document.getElementById('pathway-title');
    const pathwaySteps = document.getElementById('pathway-steps');
    const timelineInfo = document.getElementById('timeline-info');
    
    if (pathwayTitle) {
        pathwayTitle.innerHTML = `
            <i class="fas fa-route"></i>
            ${countryData.name} - ${countryData.exam} Pathway
        `;
    }
    
    if (pathwaySteps) {
        const stepsHTML = countryData.steps.map((step, index) => `
            <div class="pathway-step" style="display: flex; align-items: flex-start; gap: 24px; padding: 24px; background: var(--color-background); border-radius: 16px; border: 3px solid var(--color-border); margin-bottom: 20px; box-shadow: var(--shadow-sm); transition: all 0.3s ease;">
                <div class="step-number" style="width: 48px; height: 48px; background: linear-gradient(45deg, #1e40af, #0d9488); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 18px; box-shadow: var(--shadow-md);">
                    ${index + 1}
                </div>
                <div class="step-content" style="flex: 1;">
                    <h5 style="color: var(--color-text); margin-bottom: 12px; font-weight: bold; font-size: 18px;">${step}</h5>
                    <p style="color: var(--color-text-secondary); margin: 0; font-size: 15px; line-height: 1.6; font-weight: 500;">
                        Complete this essential step to progress in your medical career journey to ${countryData.name}. 
                        Each step builds upon the previous requirements.
                    </p>
                </div>
            </div>
        `).join('');
        pathwaySteps.innerHTML = stepsHTML;
    }
    
    if (timelineInfo) {
        timelineInfo.innerHTML = `
            <div style="background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-primary-rgb), 0.05)); padding: 24px; border-radius: 12px; border: 2px solid var(--color-primary);">
                <strong style="color: var(--color-text); font-size: 16px;">
                    <i class="fas fa-clock"></i>
                    Estimated Timeline: ${countryData.timeline}
                </strong>
                <p style="margin: 12px 0 0 0; color: var(--color-text-secondary); font-weight: 500; line-height: 1.6;">
                    ${countryData.description} Timeline may vary based on individual preparation and exam scheduling.
                </p>
            </div>
        `;
    }
    
    if (pathwayDetails) {
        pathwayDetails.style.display = 'block';
    }
}

// Clinical Assistant Module Implementation
function initClinicalAssistant() {
    console.log('ðŸ©º Initializing Clinical Assistant...');
    
    document.querySelectorAll('.case-card').forEach(card => {
        if (!card._initialized) {
            card._initialized = true;
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const caseId = card.getAttribute('data-case');
                selectClinicalCase(caseId);
            });
        }
    });
    
    // Initialize SOAP note submission
    const soapSubmitBtn = document.querySelector('.soap-builder .btn--primary');
    if (soapSubmitBtn && !soapSubmitBtn._initialized) {
        soapSubmitBtn._initialized = true;
        soapSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            submitSOAPNote();
        });
    }
    
    console.log('âœ… Clinical Assistant initialized');
}

function selectClinicalCase(caseId) {
    const selectedCase = sampleData.clinicalCases.find(c => c.id === caseId);
    
    if (selectedCase) {
        // Update visual selection
        document.querySelectorAll('.case-card').forEach(card => card.classList.remove('selected'));
        const selectedCard = document.querySelector(`[data-case="${caseId}"]`);
        if (selectedCard) selectedCard.classList.add('selected');
        
        // Show case details
        const caseWorkspace = document.getElementById('case-workspace');
        const currentCaseTitle = document.getElementById('current-case-title');
        const caseDescription = document.getElementById('case-description');
        
        if (currentCaseTitle) {
            currentCaseTitle.innerHTML = `
                <i class="fas fa-clipboard-check"></i>
                ${selectedCase.title}
            `;
        }
        if (caseDescription) caseDescription.textContent = selectedCase.description;
        if (caseWorkspace) caseWorkspace.style.display = 'block';
        
        showToast(`Clinical case loaded: ${selectedCase.specialty} ðŸ¥`, 'success');
    }
}

function submitSOAPNote() {
    const soapSections = document.querySelectorAll('.soap-section textarea');
    let completedSections = 0;
    
    soapSections.forEach(textarea => {
        if (textarea.value.trim()) {
            completedSections++;
        }
    });
    
    if (completedSections === 0) {
        showToast('Please complete at least one SOAP section', 'warning');
        return;
    }
    
    if (completedSections < 4) {
        showToast(`SOAP note saved with ${completedSections}/4 sections completed`, 'info');
    } else {
        showToast('Complete SOAP note submitted for AI review! ðŸŽ‰', 'success');
    }
    
    // Simulate AI feedback after submission
    setTimeout(() => {
        showToast('AI feedback: Well-structured clinical reasoning demonstrated! ðŸ‘', 'success');
    }, 2000);
}

// Question Bank Module Implementation
function initQuestionBank() {
    console.log('â“ Initializing Question Bank...');
    
    const createBtn = document.getElementById('create-question');
    const startPracticeBtn = document.getElementById('start-practice');
    const saveQuestionBtn = document.getElementById('save-question');
    
    if (createBtn && !createBtn._initialized) {
        createBtn._initialized = true;
        createBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleQuestionCreator();
        });
    }
    
    if (startPracticeBtn && !startPracticeBtn._initialized) {
        startPracticeBtn._initialized = true;
        startPracticeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startPracticeSession();
        });
    }
    
    if (saveQuestionBtn && !saveQuestionBtn._initialized) {
        saveQuestionBtn._initialized = true;
        saveQuestionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveNewQuestion();
        });
    }
    
    // Initialize subject filter
    const subjectFilter = document.getElementById('subject-filter');
    if (subjectFilter && !subjectFilter._initialized) {
        subjectFilter._initialized = true;
        subjectFilter.addEventListener('change', (e) => {
            const selectedSubject = e.target.value;
            filterQuestions(selectedSubject);
        });
    }
    
    renderQuestionsList();
    console.log('âœ… Question Bank initialized');
}

function toggleQuestionCreator() {
    const creator = document.getElementById('question-creator');
    if (creator) {
        const isVisible = creator.style.display === 'block';
        creator.style.display = isVisible ? 'none' : 'block';
        const action = isVisible ? 'closed' : 'opened';
        showToast(`Question creator ${action}`, 'info');
    }
}

function saveNewQuestion() {
    const questionText = document.getElementById('new-question-text');
    const optionInputs = document.querySelectorAll('.option-input');
    const correctAnswer = document.getElementById('correct-answer');
    const explanation = document.getElementById('question-explanation');
    
    if (!questionText?.value?.trim()) {
        showToast('Please enter a question', 'warning');
        questionText?.focus();
        return;
    }
    
    const options = Array.from(optionInputs).map(input => input.value.trim()).filter(val => val);
    
    if (options.length < 2) {
        showToast('Please provide at least 2 options', 'warning');
        return;
    }
    
    const newQuestion = {
        id: Date.now(),
        question: questionText.value,
        options: options,
        correct: parseInt(correctAnswer?.value || 0),
        explanation: explanation?.value || 'Explanation not provided',
        subject: 'Custom',
        difficulty: 'Medium',
        created: new Date().toLocaleDateString()
    };
    
    AppState.questions.push(newQuestion);
    
    // Clear form
    if (questionText) questionText.value = '';
    optionInputs.forEach(input => input.value = '');
    if (explanation) explanation.value = '';
    
    renderQuestionsList();
    showToast('Question saved successfully! ðŸ“š', 'success');
    
    // Hide creator after saving
    toggleQuestionCreator();
}

function renderQuestionsList() {
    const questionsList = document.getElementById('questions-list');
    if (!questionsList) return;
    
    if (AppState.questions.length === 0) {
        questionsList.innerHTML = `
            <div class="empty-state" style="text-align: center; color: var(--color-text-secondary); padding: 60px 24px; background: var(--color-background); border-radius: 16px; border: 3px dashed var(--color-border);">
                <i class="fas fa-question-circle" style="font-size: 48px; color: var(--color-text-secondary); margin-bottom: 20px; opacity: 0.5;"></i>
                <h4 style="margin-bottom: 12px; color: var(--color-text);">No Questions Yet</h4>
                <p style="margin: 0; font-size: 16px; font-weight: 500;">
                    Click "Create New Question" to build your personalized question bank!
                </p>
            </div>
        `;
        return;
    }
    
    const questionsHTML = AppState.questions.map(question => `
        <div class="question-item" style="background: var(--color-background); padding: 24px; border-radius: 16px; border: 3px solid var(--color-border); margin-bottom: 20px; box-shadow: var(--shadow-sm); transition: all 0.3s ease;">
            <div class="question-preview">
                <div class="question-meta" style="display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
                    <span class="subject-badge" style="background: linear-gradient(45deg, #1e40af, #0d9488); color: white; padding: 6px 16px; border-radius: 8px; font-size: 12px; font-weight: bold;">
                        ${question.subject}
                    </span>
                    <span class="difficulty-badge" style="background: var(--color-secondary); color: var(--color-text); padding: 6px 16px; border-radius: 8px; font-size: 12px; font-weight: bold;">
                        ${question.difficulty}
                    </span>
                    <span class="date-badge" style="background: var(--color-background); color: var(--color-text-secondary); padding: 6px 16px; border-radius: 8px; font-size: 12px; font-weight: bold; border: 2px solid var(--color-border);">
                        Created: ${question.created}
                    </span>
                </div>
                <p class="question-text" style="color: var(--color-text); margin-bottom: 20px; font-weight: 600; line-height: 1.6; font-size: 16px;">
                    ${question.question.substring(0, 150)}${question.question.length > 150 ? '...' : ''}
                </p>
            </div>
            <div class="question-actions" style="display: flex; gap: 16px;">
                <button class="btn btn--sm btn--outline" onclick="editQuestion(${question.id})" style="padding: 10px 20px; font-weight: 600;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn--sm btn--secondary" onclick="deleteQuestion(${question.id})" style="padding: 10px 20px; font-weight: 600;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
    
    questionsList.innerHTML = questionsHTML;
}

function filterQuestions(subject) {
    showToast(`Filtering questions by: ${subject}`, 'info');
    // This would implement actual filtering logic
}

function startPracticeSession() {
    if (AppState.questions.length === 0) {
        showToast('No questions available. Create some questions first! ðŸ“', 'warning');
        return;
    }
    
    const practiceSession = document.getElementById('practice-session');
    if (practiceSession) {
        practiceSession.style.display = 'block';
        showToast('Practice session started! Good luck! ðŸŽ¯', 'success');
        
        // Initialize practice session
        AppState.practiceSession.questions = [...AppState.questions];
        AppState.practiceSession.currentIndex = 0;
        AppState.practiceSession.active = true;
        
        loadPracticeQuestion();
    }
}

function loadPracticeQuestion() {
    const currentQuestion = AppState.practiceSession.questions[AppState.practiceSession.currentIndex];
    const questionText = document.getElementById('practice-question-text');
    const optionsContainer = document.getElementById('practice-options');
    
    if (questionText && currentQuestion) {
        questionText.textContent = currentQuestion.question;
    }
    
    if (optionsContainer && currentQuestion) {
        const optionsHTML = currentQuestion.options.map((option, index) => `
            <label class="practice-option" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--color-secondary); border-radius: 10px; cursor: pointer; transition: all 0.3s; border: 2px solid transparent; margin-bottom: 12px;">
                <input type="radio" name="practice-answer" value="${index}" style="transform: scale(1.3);">
                <span style="font-weight: 500;">${String.fromCharCode(65 + index)}. ${option}</span>
            </label>
        `).join('');
        optionsContainer.innerHTML = optionsHTML;
    }
}

// Daily Planner Module Implementation
function initDailyPlanner() {
    console.log('ðŸ“… Initializing Daily Planner...');
    
    // Tab switching
    document.querySelectorAll('.planner-tabs .tab-btn').forEach(btn => {
        if (!btn._initialized) {
            btn._initialized = true;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = btn.getAttribute('data-tab');
                switchPlannerTab(tabName);
                showToast(`Switched to ${tabName} view`, 'info');
            });
        }
    });
    
    // Add task button
    const addTaskBtn = document.getElementById('add-task');
    if (addTaskBtn && !addTaskBtn._initialized) {
        addTaskBtn._initialized = true;
        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal('task-modal', true);
        });
    }
    
    // Task filter
    const taskFilter = document.getElementById('task-filter');
    if (taskFilter && !taskFilter._initialized) {
        taskFilter._initialized = true;
        taskFilter.addEventListener('change', (e) => {
            const filterType = e.target.value;
            filterTasks(filterType);
        });
    }
    
    // Notes functionality
    const saveNoteBtn = document.getElementById('save-note');
    const newNoteBtn = document.getElementById('new-note');
    
    if (saveNoteBtn && !saveNoteBtn._initialized) {
        saveNoteBtn._initialized = true;
        saveNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveNotes();
        });
    }
    
    if (newNoteBtn && !newNoteBtn._initialized) {
        newNoteBtn._initialized = true;
        newNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createNewNote();
        });
    }
    
    renderKanbanBoard();
    generateCalendarDays();
    console.log('âœ… Daily Planner initialized');
}

function switchPlannerTab(tabName) {
    // Remove active from all tabs and content
    document.querySelectorAll('.planner-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.planner-interface .tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active to selected tab and content
    const targetBtn = document.querySelector(`.planner-tabs [data-tab="${tabName}"]`);
    const targetContent = document.getElementById(`${tabName}-tab`);
    
    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

function renderKanbanBoard() {
    const todoTasks = document.getElementById('todo-tasks');
    const progressTasks = document.getElementById('progress-tasks');
    const doneTasks = document.getElementById('done-tasks');
    
    if (!todoTasks || !progressTasks || !doneTasks) return;
    
    const tasksByStatus = {
        todo: AppState.tasks.filter(task => task.status === 'todo'),
        progress: AppState.tasks.filter(task => task.status === 'progress'),
        done: AppState.tasks.filter(task => task.status === 'done')
    };
    
    function renderTaskList(tasks, container) {
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-column" style="text-align: center; color: var(--color-text-secondary); padding: 32px 16px; font-style: italic; border: 2px dashed var(--color-border); border-radius: 12px; background: var(--color-background);">
                    <i class="fas fa-tasks" style="font-size: 24px; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p style="margin: 0; font-weight: 500;">No tasks here yet</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = tasks.map(task => `
            <div class="task-item" data-task-id="${task.id}" 
                 style="background: var(--color-surface); padding: 20px; border-radius: 12px; border: 3px solid var(--color-border); margin-bottom: 16px; cursor: grab; transition: all 0.3s; box-shadow: var(--shadow-xs);"
                 onmouseenter="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-sm)'"
                 onmouseleave="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-xs)'">
                <div class="task-title" style="font-weight: bold; color: var(--color-text); margin-bottom: 12px; font-size: 15px;">${task.title}</div>
                <div class="task-meta" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
                    <span class="task-category" style="background: var(--color-secondary); padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: capitalize;">${task.category}</span>
                    <span class="task-priority ${task.priority}" style="font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; color: ${task.priority === 'high' ? 'var(--color-error)' : task.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-success)'}; background: ${task.priority === 'high' ? 'rgba(var(--color-error-rgb), 0.1)' : task.priority === 'medium' ? 'rgba(var(--color-warning-rgb), 0.1)' : 'rgba(var(--color-success-rgb), 0.1)'}">${task.priority} priority</span>
                </div>
            </div>
        `).join('');
    }
    
    renderTaskList(tasksByStatus.todo, todoTasks);
    renderTaskList(tasksByStatus.progress, progressTasks);
    renderTaskList(tasksByStatus.done, doneTasks);
}

function filterTasks(filterType) {
    showToast(`Filtering tasks by: ${filterType}`, 'info');
    // This would implement actual task filtering
}

function generateCalendarDays() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    // Add sample calendar days (would be generated dynamically in real app)
    const days = Array.from({length: 35}, (_, i) => {
        const dayNumber = i < 31 ? i + 1 : '';
        const isToday = i === 20; // Simulate today being the 21st
        
        return `
            <div class="calendar-day ${isToday ? 'today' : ''}" 
                 style="padding: 16px 8px; background: var(--color-surface); text-align: center; font-weight: 600; min-height: 80px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; position: relative; ${isToday ? 'background: var(--color-primary); color: white;' : ''}"
                 onmouseenter="if(!this.classList.contains('today')) { this.style.background='var(--color-secondary)'; }"
                 onmouseleave="if(!this.classList.contains('today')) { this.style.background='var(--color-surface)'; }">
                ${dayNumber}
                ${isToday ? '<div style="position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); font-size: 8px; font-weight: bold;">TODAY</div>' : ''}
            </div>
        `;
    }).join('');
    
    // Keep existing header days and add the generated days
    const headerDays = calendarGrid.querySelectorAll('.calendar-day.header');
    calendarGrid.innerHTML = '';
    headerDays.forEach(header => calendarGrid.appendChild(header));
    calendarGrid.innerHTML += days;
}

function saveNotes() {
    const notesEditor = document.getElementById('notes-editor');
    const noteCategory = document.getElementById('note-category');
    
    if (notesEditor && notesEditor.value.trim()) {
        const categoryText = noteCategory ? noteCategory.options[noteCategory.selectedIndex].text : 'General';
        showToast(`Notes saved to ${categoryText} category! ðŸ“`, 'success');
    } else {
        showToast('Please write some notes before saving', 'warning');
    }
}

function createNewNote() {
    const notesEditor = document.getElementById('notes-editor');
    if (notesEditor) {
        if (notesEditor.value.trim()) {
            if (confirm('Are you sure you want to create a new note? Unsaved changes will be lost.')) {
                notesEditor.value = '';
                showToast('New note created! Start writing... âœï¸', 'info');
            }
        } else {
            notesEditor.value = '';
            showToast('New note ready! Start writing... âœï¸', 'info');
        }
        notesEditor.focus();
    }
}

// Initialize Modal and Toast Functionality
function initModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                e.preventDefault();
                toggleModal(modal.id, false);
            }
        });
    });
    
    // Task modal specific handlers
    const saveTaskBtn = document.getElementById('save-task');
    const cancelTaskBtn = document.getElementById('cancel-task');
    
    if (saveTaskBtn) {
        saveTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveTask();
        });
    }
    
    if (cancelTaskBtn) {
        cancelTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal('task-modal', false);
        });
    }
}

function saveTask() {
    const taskTitle = document.getElementById('task-title');
    const taskCategory = document.getElementById('task-category');
    const taskPriority = document.getElementById('task-priority');
    
    if (!taskTitle || !taskTitle.value.trim()) {
        showToast('Please enter a task title', 'warning');
        taskTitle?.focus();
        return;
    }
    
    const newTask = {
        id: Date.now(),
        title: taskTitle.value.trim(),
        category: taskCategory?.value || 'study',
        priority: taskPriority?.value || 'medium',
        status: 'todo'
    };
    
    AppState.tasks.push(newTask);
    
    // Clear form
    if (taskTitle) taskTitle.value = '';
    if (taskCategory) taskCategory.selectedIndex = 0;
    if (taskPriority) taskPriority.selectedIndex = 1;
    
    // Close modal and refresh kanban board
    toggleModal('task-modal', false);
    renderKanbanBoard();
    
    showToast('Task added successfully! ðŸ“‹', 'success');
}

function initToast() {
    const toastClose = document.getElementById('toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            document.getElementById('toast').classList.remove('show');
        });
    }
}

// Global helper functions
window.checkPracticeAnswers = function() {
    const answerExplanation = document.getElementById('answer-explanation');
    if (answerExplanation) {
        answerExplanation.style.display = 'block';
        answerExplanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    showToast('Answers checked! Review the explanation below. ðŸ“–', 'success');
};

window.editQuestion = function(questionId) {
    showToast('Question editing feature - Coming soon! âœï¸', 'info');
};

window.deleteQuestion = function(questionId) {
    if (confirm('Are you sure you want to delete this question?')) {
        AppState.questions = AppState.questions.filter(q => q.id !== questionId);
        renderQuestionsList();
        showToast('Question deleted successfully ðŸ—‘ï¸', 'success');
    }
};

// Enhanced Responsive Handling
function handleResponsiveChanges() {
    updateLogoSize();
    
    // Close sidebar on desktop
    if (!isMobile() && AppState.sidebarOpen) {
        closeSidebar();
    }
}

// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('ðŸš€ MedAssist Enhanced Application Starting...');
    
    try {
        // Initialize core systems
        initNavigation();
        initThemeToggle();
        initLanguageSelector();
        initModals();
        initToast();
        
        // Set initial responsive settings
        updateLogoSize();
        
        // Start with dashboard
        switchModule('dashboard');
        
        console.log('âœ… MedAssist Application Loaded Successfully!');
        
        // Welcome message with delay for better UX
        setTimeout(() => {
            showToast('Welcome to MedAssist â€“ Your Smart Medical Co-Pilot! ðŸ©ºâœ¨', 'success');
        }, 1500);
        
        // Device detection logging
        if (isMobile()) {
            console.log('ðŸ“± Mobile device detected - Touch controls optimized');
        } else if (isTablet()) {
            console.log('ðŸ“± Tablet device detected - Hybrid controls optimized');
        } else {
            console.log('ðŸ–¥ï¸ Desktop device detected - Full features enabled');
        }
        
    } catch (error) {
        console.error('âŒ Error initializing MedAssist:', error);
        showToast('Application initialization error. Please refresh the page.', 'error');
    }
});

// Enhanced Page Visibility Handling
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('ðŸ‘ï¸ Page became visible');
        if (AppState.sidebarOpen && !isMobile()) {
            closeSidebar();
        }
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('âš¡ Page fully loaded');
    setTimeout(() => {
        const loadTime = performance.now();
        console.log(`ðŸ“Š Application load time: ${Math.round(loadTime)}ms`);
    }, 100);
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('ðŸš¨ Global error caught:', e.error);
    showToast('An error occurred. Please try refreshing the page.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('ðŸš¨ Unhandled promise rejection:', e.reason);
    showToast('A system error occurred. Please try again.', 'error');
    e.preventDefault();
});

console.log('ðŸ“‹ MedAssist Enhanced Application Script Loaded');