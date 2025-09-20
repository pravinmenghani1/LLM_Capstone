// Enhanced scoring functions with transparent point tracking

function scoreContentQuality(translations, linkedin) {
    let score = 0;
    let debug = [];

    // Language detection with clear point attribution
    const languageNames = ['English', 'Spanish', 'Japanese', 'German', 'Hindi'];
    const languageIndicators = [
        ['english', 'aquapure solar', 'revolutionary', 'water'],
        ['spanish', 'dispositivo', 'purificación', 'agua', 'solar'],
        ['japanese', '革新的', '水質浄化', 'ソーラー', '装置'],
        ['german', 'wasserreinigung', 'revolutionär', 'solar'],
        ['hindi', 'उपकरण', 'पानी', 'सोलर', 'शुद्धीकरण', 'क्रांतिकारी']
    ];

    let languagesFound = 0;
    languageIndicators.forEach((indicators, index) => {
        const matchedWords = indicators.filter(ind => translations.toLowerCase().includes(ind.toLowerCase()));
        if (matchedWords.length > 0) {
            languagesFound++;
            const points = 3.0; // Increased for better distribution
            score += points;
            debug.push(`${languageNames[index]} detected (${matchedWords.join(', ')}) → +${points} pts`);
        }
    });

    // Technical specifications with specific point values
    const techSpecs = [
        { term: '99.9', points: 2, name: 'Purification rate' },
        { term: '2.5', points: 2, name: 'Weight' },
        { term: '10l', points: 1.5, name: 'Capacity' },
        { term: 'solar', points: 1.5, name: 'Power source' },
        { term: 'iot', points: 1, name: 'IoT features' },
        { term: 'portable', points: 1, name: 'Portability' }
    ];

    techSpecs.forEach(spec => {
        if (translations.toLowerCase().includes(spec.term.toLowerCase())) {
            score += spec.points;
            debug.push(`${spec.name} "${spec.term}" found → +${spec.points} pts`);
        }
    });

    // Content quality bonuses
    if (translations.length > 500) {
        const points = 3;
        score += points;
        debug.push(`Content length >500 chars (${translations.length}) → +${points} pts`);
    }
    if (translations.length > 1000) {
        const points = 2;
        score += points;
        debug.push(`Content length >1000 chars → +${points} pts bonus`);
    }

    // LinkedIn profiles with name-specific tracking
    const profiles = [
        { names: ['maria', 'santos'], person: 'Maria Santos', points: 1.5 },
        { names: ['hiroshi', 'tanaka'], person: 'Hiroshi Tanaka', points: 1.5 },
        { names: ['priya', 'sharma'], person: 'Priya Sharma', points: 1.5 }
    ];

    profiles.forEach(profile => {
        const found = profile.names.some(name => linkedin.toLowerCase().includes(name.toLowerCase()));
        if (found) {
            score += profile.points;
            debug.push(`${profile.person} profile detected → +${profile.points} pts`);
        }
    });

    // Professional keywords bonus
    const professionalWords = ['sales', 'manager', 'experience', 'years'];
    professionalWords.forEach(word => {
        if (linkedin.toLowerCase().includes(word.toLowerCase())) {
            const points = 0.5;
            score += points;
            debug.push(`Professional keyword "${word}" → +${points} pts`);
        }
    });

    return { score: parseFloat(Math.min(30, score).toFixed(1)), debug };
}

function scoreCustomerIntelligence(sentiment) {
    let score = 0;
    let debug = [];

    // Core sentiment analysis indicators (higher value)
    const coreWords = [
        { word: 'score', points: 2, category: 'Scoring' },
        { word: 'sentiment', points: 2, category: 'Analysis' },
        { word: 'emotion', points: 1.5, category: 'Emotion Detection' }
    ];

    coreWords.forEach(item => {
        if (sentiment.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.category} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Sentiment categories
    const sentimentTypes = ['positive', 'negative', 'neutral', 'mixed'];
    sentimentTypes.forEach(type => {
        if (sentiment.toLowerCase().includes(type.toLowerCase())) {
            const points = 1.5;
            score += points;
            debug.push(`Sentiment type "${type}" identified → +${points} pts`);
        }
    });

    // Action recommendations (high value for business impact)
    const actionWords = [
        { word: 'action', points: 2, type: 'Action Planning' },
        { word: 'recommend', points: 1.5, type: 'Recommendations' },
        { word: 'priority', points: 1.5, type: 'Prioritization' },
        { word: 'urgent', points: 2, type: 'Urgency Assessment' },
        { word: 'escalate', points: 2, type: 'Escalation' },
        { word: 'template', points: 1, type: 'Response Templates' }
    ];

    actionWords.forEach(item => {
        if (sentiment.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Summary and insights
    const summaryWords = [
        { word: 'overall', points: 2, type: 'Overall Analysis' },
        { word: 'average', points: 1.5, type: 'Statistical Summary' },
        { word: 'top', points: 1.5, type: 'Priority Issues' },
        { word: 'issues', points: 1, type: 'Issue Identification' }
    ];

    summaryWords.forEach(item => {
        if (sentiment.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    return { score: parseFloat(Math.min(25, score).toFixed(1)), debug };
}

function scoreAutomationSetup(workflows) {
    let score = 0;
    let debug = [];

    // Workflow types (essential components)
    const workflowTypes = [
        { word: 'customer', points: 2.5, type: 'Customer Support' },
        { word: 'support', points: 2, type: 'Support System' },
        { word: 'social', points: 2.5, type: 'Social Media' },
        { word: 'media', points: 1.5, type: 'Media Monitoring' },
        { word: 'workflow', points: 1.5, type: 'Workflow Design' }
    ];

    workflowTypes.forEach(item => {
        if (workflows.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Structure elements (workflow components)
    const structureWords = [
        { word: 'trigger', points: 2, type: 'Trigger Definition' },
        { word: 'step', points: 1.5, type: 'Process Steps' },
        { word: 'action', points: 1.5, type: 'Actions' },
        { word: 'route', points: 1.5, type: 'Routing Logic' },
        { word: 'response', points: 1, type: 'Response Handling' }
    ];

    structureWords.forEach(item => {
        if (workflows.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Business logic (advanced features)
    const logicWords = [
        { word: 'escalation', points: 2.5, type: 'Escalation Rules' },
        { word: 'rule', points: 2, type: 'Business Rules' },
        { word: 'priority', points: 1.5, type: 'Priority Logic' },
        { word: 'condition', points: 1.5, type: 'Conditional Logic' },
        { word: 'approval', points: 1, type: 'Approval Process' }
    ];

    logicWords.forEach(item => {
        if (workflows.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    return { score: parseFloat(Math.min(25, score).toFixed(1)), debug };
}

function scoreDataQuality(validation) {
    let score = 0;
    let debug = [];

    // Validation activities (core QA work)
    const validationWords = [
        { word: 'consistent', points: 2, type: 'Consistency Check' },
        { word: 'check', points: 1.5, type: 'Quality Check' },
        { word: 'validation', points: 2, type: 'Validation Process' },
        { word: 'accuracy', points: 1.5, type: 'Accuracy Assessment' },
        { word: 'review', points: 1, type: 'Review Process' }
    ];

    validationWords.forEach(item => {
        if (validation.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Quality scoring indicators
    const scoringWords = [
        { word: '/10', points: 2.5, type: 'Numerical Scoring' },
        { word: 'score', points: 1.5, type: 'Scoring System' },
        { word: 'rating', points: 1.5, type: 'Rating System' },
        { word: 'average', points: 2, type: 'Average Calculation' },
        { word: 'translation', points: 1, type: 'Translation Quality' }
    ];

    scoringWords.forEach(item => {
        if (validation.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    // Issue identification and resolution
    const issueWords = [
        { word: 'issue', points: 1.5, type: 'Issue Identification' },
        { word: 'problem', points: 1.5, type: 'Problem Detection' },
        { word: 'error', points: 1.5, type: 'Error Detection' },
        { word: 'critical', points: 2, type: 'Critical Issues' },
        { word: 'fix', points: 1, type: 'Fix Recommendations' },
        { word: 'improve', points: 1, type: 'Improvement Suggestions' }
    ];

    issueWords.forEach(item => {
        if (validation.toLowerCase().includes(item.word.toLowerCase())) {
            score += item.points;
            debug.push(`${item.type} "${item.word}" found → +${item.points} pts`);
        }
    });

    return { score: parseFloat(Math.min(20, score).toFixed(1)), debug };
}

// Enhanced debug panel with better formatting
function toggleDebug() {
    const debugDiv = document.getElementById('debug-info');
    const debugContent = document.getElementById('debug-content');
    const button = event.target;

    if (debugDiv.style.display === 'none') {
        let debugText = '<h3 style="color: #2c3e50; margin-bottom: 20px;">🔍 Transparent Scoring Breakdown</h3>';

        function formatDebug(categoryName, debugArr, maxPoints, actualScore) {
            const percentage = ((actualScore / maxPoints) * 100).toFixed(1);
            let text = `
                <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db;">
                    <h4 style="color: #2c3e50; margin: 0 0 15px 0;">
                        📊 ${categoryName} (${actualScore}/${maxPoints} points - ${percentage}%)
                    </h4>
                    <div style="font-family: monospace; font-size: 0.9em;">
            `;
            
            let totalPointsShown = 0;
            debugArr.forEach(item => {
                // Extract points from debug message
                const pointsMatch = item.match(/\+(\d+\.?\d*) pts/);
                if (pointsMatch) {
                    totalPointsShown += parseFloat(pointsMatch[1]);
                }
                
                text += `<div style="margin: 5px 0; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #27ae60;">
                    ${item}
                </div>`;
            });
            
            text += `</div>
                <div style="margin-top: 10px; padding: 10px; background: #e8f5e8; border-radius: 4px; font-weight: bold; color: #27ae60;">
                    Total Points Earned: ${actualScore}/${maxPoints} (${percentage}%)
                </div>
            </div>`;
            
            return text;
        }

        debugText += formatDebug('Content Quality', debugInfo.content, 30, scoringResults.content);
        debugText += formatDebug('Customer Intelligence', debugInfo.intelligence, 25, scoringResults.intelligence);
        debugText += formatDebug('Automation Setup', debugInfo.automation, 25, scoringResults.automation);
        debugText += formatDebug('Data Quality', debugInfo.quality, 20, scoringResults.quality);

        // Add summary
        debugText += `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0;">🎯 Final Score Summary</h4>
                <div style="font-size: 1.1em;">
                    <strong>Total Score: ${scoringResults.total}/100 points</strong><br>
                    Overall Performance: ${((scoringResults.total / 100) * 100).toFixed(1)}%
                </div>
            </div>
        `;

        debugContent.innerHTML = debugText;
        debugDiv.style.display = 'block';
        button.textContent = '🔧 Hide Debug Info';
    } else {
        debugDiv.style.display = 'none';
        button.textContent = '🔧 Show Debug Info';
    }
}
