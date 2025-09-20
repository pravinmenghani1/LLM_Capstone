// Interactive Debug System with Text Highlighting

// Add CSS for highlighting (add to <style> section)
const highlightCSS = `
.highlight {
    background-color: #fff3cd;
    padding: 2px 4px;
    border-radius: 3px;
    transition: all 0.3s ease;
    cursor: pointer;
}
.highlight.active {
    background-color: #ffc107;
    box-shadow: 0 0 8px rgba(255, 193, 7, 0.6);
    transform: scale(1.05);
}
.debug-line {
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    transition: background 0.2s;
}
.debug-line:hover {
    background-color: rgba(52, 152, 219, 0.1);
}
.highlight-container {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    background: white;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
}
`;

// Inject CSS
if (!document.getElementById('highlight-styles')) {
    const style = document.createElement('style');
    style.id = 'highlight-styles';
    style.textContent = highlightCSS;
    document.head.appendChild(style);
}

// Enhanced scoring functions with keyword tracking
function scoreContentQuality(translations, linkedin) {
    let score = 0;
    let debug = [];
    let matchedKeywords = [];

    // Language detection with keyword tracking
    const languageNames = ['English', 'Spanish', 'Japanese', 'German', 'Hindi'];
    const languageIndicators = [
        ['english', 'aquapure solar', 'revolutionary', 'water'],
        ['spanish', 'dispositivo', 'purificación', 'agua', 'solar'],
        ['japanese', '革新的', '水質浄化', 'ソーラー', '装置'],
        ['german', 'wasserreinigung', 'revolutionär', 'solar'],
        ['hindi', 'उपकरण', 'पानी', 'सोलर', 'शुद्धीकरण', 'क्रांतिकारी']
    ];

    languageIndicators.forEach((indicators, index) => {
        const foundWords = indicators.filter(ind => translations.toLowerCase().includes(ind.toLowerCase()));
        if (foundWords.length > 0) {
            const points = 3.0;
            score += points;
            const debugId = `content-lang-${index}`;
            debug.push(`${languageNames[index]} detected (${foundWords.join(', ')}) → +${points} pts`);
            matchedKeywords.push({
                words: foundWords,
                category: 'translations',
                id: debugId,
                type: 'language'
            });
        }
    });

    // Technical specifications
    const techSpecs = [
        { term: '99.9', points: 2, name: 'Purification rate' },
        { term: '2.5', points: 2, name: 'Weight' },
        { term: '10l', points: 1.5, name: 'Capacity' },
        { term: 'solar', points: 1.5, name: 'Power source' },
        { term: 'iot', points: 1, name: 'IoT features' },
        { term: 'portable', points: 1, name: 'Portability' }
    ];

    techSpecs.forEach((spec, index) => {
        if (translations.toLowerCase().includes(spec.term.toLowerCase())) {
            score += spec.points;
            const debugId = `content-tech-${index}`;
            debug.push(`${spec.name} "${spec.term}" found → +${spec.points} pts`);
            matchedKeywords.push({
                words: [spec.term],
                category: 'translations',
                id: debugId,
                type: 'technical'
            });
        }
    });

    // Content length bonus
    if (translations.length > 500) {
        const points = 3;
        score += points;
        debug.push(`Content length >500 chars (${translations.length}) → +${points} pts`);
    }

    // LinkedIn profiles
    const profiles = [
        { names: ['maria', 'santos'], person: 'Maria Santos', points: 1.5 },
        { names: ['hiroshi', 'tanaka'], person: 'Hiroshi Tanaka', points: 1.5 },
        { names: ['priya', 'sharma'], person: 'Priya Sharma', points: 1.5 }
    ];

    profiles.forEach((profile, index) => {
        const foundNames = profile.names.filter(name => linkedin.toLowerCase().includes(name.toLowerCase()));
        if (foundNames.length > 0) {
            score += profile.points;
            const debugId = `content-profile-${index}`;
            debug.push(`${profile.person} profile detected → +${profile.points} pts`);
            matchedKeywords.push({
                words: foundNames,
                category: 'linkedin',
                id: debugId,
                type: 'profile'
            });
        }
    });

    return { 
        score: parseFloat(Math.min(30, score).toFixed(1)), 
        debug, 
        matchedKeywords 
    };
}

function scoreCustomerIntelligence(sentiment) {
    let score = 0;
    let debug = [];
    let matchedKeywords = [];

    // Core sentiment words
    const coreWords = [
        { word: 'score', points: 2, category: 'Scoring' },
        { word: 'sentiment', points: 2, category: 'Analysis' },
        { word: 'emotion', points: 1.5, category: 'Emotion Detection' }
    ];

    coreWords.forEach((item, index) => {
        if (sentiment.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            const debugId = `intelligence-core-${index}`;
            debug.push(`${item.category} "${item.word}" found → +${item.points} pts`);
            matchedKeywords.push({
                words: [item.word],
                category: 'sentiment',
                id: debugId,
                type: 'core'
            });
        }
    });

    // Action words
    const actionWords = [
        { word: 'action', points: 2, type: 'Action Planning' },
        { word: 'recommend', points: 1.5, type: 'Recommendations' },
        { word: 'priority', points: 1.5, type: 'Prioritization' },
        { word: 'urgent', points: 2, type: 'Urgency Assessment' },
        { word: 'escalate', points: 2, type: 'Escalation' }
    ];

    actionWords.forEach((item, index) => {
        if (sentiment.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            const debugId = `intelligence-action-${index}`;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
            matchedKeywords.push({
                words: [item.word],
                category: 'sentiment',
                id: debugId,
                type: 'action'
            });
        }
    });

    return { 
        score: parseFloat(Math.min(25, score).toFixed(1)), 
        debug, 
        matchedKeywords 
    };
}

function scoreAutomationSetup(workflows) {
    let score = 0;
    let debug = [];
    let matchedKeywords = [];

    // Workflow types
    const workflowTypes = [
        { word: 'customer', points: 2.5, type: 'Customer Support' },
        { word: 'support', points: 2, type: 'Support System' },
        { word: 'social', points: 2.5, type: 'Social Media' },
        { word: 'media', points: 1.5, type: 'Media Monitoring' }
    ];

    workflowTypes.forEach((item, index) => {
        if (workflows.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            const debugId = `automation-type-${index}`;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
            matchedKeywords.push({
                words: [item.word],
                category: 'workflows',
                id: debugId,
                type: 'workflow'
            });
        }
    });

    // Structure elements
    const structureWords = [
        { word: 'trigger', points: 2, type: 'Trigger Definition' },
        { word: 'step', points: 1.5, type: 'Process Steps' },
        { word: 'escalation', points: 2.5, type: 'Escalation Rules' }
    ];

    structureWords.forEach((item, index) => {
        if (workflows.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            const debugId = `automation-structure-${index}`;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
            matchedKeywords.push({
                words: [item.word],
                category: 'workflows',
                id: debugId,
                type: 'structure'
            });
        }
    });

    return { 
        score: parseFloat(Math.min(25, score).toFixed(1)), 
        debug, 
        matchedKeywords 
    };
}

function scoreDataQuality(validation) {
    let score = 0;
    let debug = [];
    let matchedKeywords = [];

    // Quality indicators
    const qualityWords = [
        { word: 'consistent', points: 2, type: 'Consistency Check' },
        { word: '/10', points: 2.5, type: 'Numerical Scoring' },
        { word: 'average', points: 2, type: 'Average Calculation' },
        { word: 'critical', points: 2, type: 'Critical Issues' }
    ];

    qualityWords.forEach((item, index) => {
        if (validation.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            const debugId = `quality-${index}`;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
            matchedKeywords.push({
                words: [item.word],
                category: 'validation',
                id: debugId,
                type: 'quality'
            });
        }
    });

    return { 
        score: parseFloat(Math.min(20, score).toFixed(1)), 
        debug, 
        matchedKeywords 
    };
}

// Text highlighting function
function highlightMatches(text, keywords, categoryPrefix) {
    let highlighted = text;
    keywords.forEach((keywordObj) => {
        keywordObj.words.forEach((word) => {
            const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlighted = highlighted.replace(regex, `<span id="${keywordObj.id}" class="highlight" data-category="${categoryPrefix}">$1</span>`);
        });
    });
    return highlighted;
}

// Enhanced startAutoScoring with highlighting
function startAutoScoring() {
    const translations = document.getElementById('translations').value;
    const linkedin = document.getElementById('linkedin').value;
    const sentiment = document.getElementById('sentiment').value;
    const workflows = document.getElementById('workflows').value;
    const validation = document.getElementById('validation').value;

    // Score with keyword tracking
    const contentResult = scoreContentQuality(translations, linkedin);
    const intelligenceResult = scoreCustomerIntelligence(sentiment);
    const automationResult = scoreAutomationSetup(workflows);
    const qualityResult = scoreDataQuality(validation);

    const totalScore = Math.round(
        contentResult.score + intelligenceResult.score + automationResult.score + qualityResult.score
    );

    // Store results with keywords
    scoringResults = {
        content: Math.round(contentResult.score),
        intelligence: Math.round(intelligenceResult.score),
        automation: Math.round(automationResult.score),
        quality: Math.round(qualityResult.score),
        total: totalScore,
        allKeywords: [
            ...contentResult.matchedKeywords,
            ...intelligenceResult.matchedKeywords,
            ...automationResult.matchedKeywords,
            ...qualityResult.matchedKeywords
        ]
    };

    debugInfo = {
        content: contentResult.debug,
        intelligence: intelligenceResult.debug,
        automation: automationResult.debug,
        quality: qualityResult.debug
    };

    // Render highlighted text
    renderHighlights();
    displayResults();
    document.getElementById('scoring-results').style.display = 'block';
}

// Render highlighted text in containers
function renderHighlights() {
    const containers = ['translations', 'linkedin', 'sentiment', 'workflows', 'validation'];
    
    containers.forEach(containerId => {
        const element = document.getElementById(containerId);
        const originalText = element.value;
        
        // Filter keywords for this category
        const categoryKeywords = scoringResults.allKeywords.filter(k => k.category === containerId);
        
        if (categoryKeywords.length > 0) {
            const highlighted = highlightMatches(originalText, categoryKeywords, containerId);
            
            // Create highlighted version
            const highlightContainer = document.createElement('div');
            highlightContainer.className = 'highlight-container';
            highlightContainer.innerHTML = highlighted;
            
            // Replace textarea with highlighted version
            element.style.display = 'none';
            element.parentNode.insertBefore(highlightContainer, element.nextSibling);
        }
    });
}

// Interactive debug panel
function toggleDebug() {
    const debugDiv = document.getElementById('debug-info');
    const debugContent = document.getElementById('debug-content');
    const button = event.target;

    if (debugDiv.style.display === 'none') {
        let debugText = '<h3 style="color: #2c3e50; margin-bottom: 20px;">🔍 Interactive Scoring Breakdown</h3>';
        debugText += '<p style="color: #7f8c8d; font-style: italic; margin-bottom: 20px;">Click any line below to highlight the matching text in your submission!</p>';

        function formatInteractiveDebug(categoryName, debugArr, categoryKeywords) {
            let text = `
                <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db;">
                    <h4 style="color: #2c3e50; margin: 0 0 15px 0;">📊 ${categoryName}</h4>
            `;
            
            debugArr.forEach((item, index) => {
                const keyword = categoryKeywords[index];
                const dataId = keyword ? keyword.id : '';
                text += `
                    <div class="debug-line" data-id="${dataId}" style="margin: 5px 0; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #27ae60;">
                        ${item}
                    </div>
                `;
            });
            
            text += '</div>';
            return text;
        }

        // Get keywords by category
        const contentKeywords = scoringResults.allKeywords.filter(k => k.category === 'translations' || k.category === 'linkedin');
        const intelligenceKeywords = scoringResults.allKeywords.filter(k => k.category === 'sentiment');
        const automationKeywords = scoringResults.allKeywords.filter(k => k.category === 'workflows');
        const qualityKeywords = scoringResults.allKeywords.filter(k => k.category === 'validation');

        debugText += formatInteractiveDebug('Content Quality', debugInfo.content, contentKeywords);
        debugText += formatInteractiveDebug('Customer Intelligence', debugInfo.intelligence, intelligenceKeywords);
        debugText += formatInteractiveDebug('Automation Setup', debugInfo.automation, automationKeywords);
        debugText += formatInteractiveDebug('Data Quality', debugInfo.quality, qualityKeywords);

        debugContent.innerHTML = debugText;

        // Add click events for highlighting
        document.querySelectorAll('.debug-line').forEach(line => {
            line.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                if (id) {
                    // Remove previous active highlights
                    document.querySelectorAll('.highlight.active').forEach(h => h.classList.remove('active'));
                    
                    // Highlight the clicked item
                    const span = document.getElementById(id);
                    if (span) {
                        span.classList.add('active');
                        span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Remove highlight after 2 seconds
                        setTimeout(() => span.classList.remove('active'), 2000);
                    }
                }
            });
        });

        debugDiv.style.display = 'block';
        button.textContent = '🔧 Hide Debug Info';
    } else {
        debugDiv.style.display = 'none';
        button.textContent = '🔧 Show Debug Info';
    }
}
