function startAutoScoring() {
    const translations = document.getElementById('translations').value;
    const linkedin = document.getElementById('linkedin').value;
    const sentiment = document.getElementById('sentiment').value;
    const workflows = document.getElementById('workflows').value;
    const validation = document.getElementById('validation').value;

    // Score each category with debug info
    const contentResult = scoreContentQuality(translations, linkedin);
    const intelligenceResult = scoreCustomerIntelligence(sentiment);
    const automationResult = scoreAutomationSetup(workflows);
    const qualityResult = scoreDataQuality(validation);

    const totalScore = Math.round(
        contentResult.score + intelligenceResult.score + automationResult.score + qualityResult.score
    );

    scoringResults = {
        content: Math.round(contentResult.score),
        intelligence: Math.round(intelligenceResult.score),
        automation: Math.round(automationResult.score),
        quality: Math.round(qualityResult.score),
        total: totalScore
    };

    debugInfo = {
        content: contentResult.debug,
        intelligence: intelligenceResult.debug,
        automation: automationResult.debug,
        quality: qualityResult.debug
    };

    displayResults();
    document.getElementById('scoring-results').style.display = 'block';
}

/* -------------------- Content Quality -------------------- */
function scoreContentQuality(translations, linkedin) {
    let score = 0;
    let debug = [];

    // Enhanced language detection with better scoring
    const languagePatterns = [
        { name: 'English', patterns: ['aquapure solar', 'revolutionary', 'water purification', 'device'] },
        { name: 'Spanish', patterns: ['dispositivo', 'purificación', 'agua', 'revolucionario', 'solar'] },
        { name: 'Japanese', patterns: ['革新的', '水質浄化', 'ソーラー', '装置', 'aquapure'] },
        { name: 'German', patterns: ['wasserreinigung', 'revolutionär', 'solar', 'gerät', 'aquapure'] },
        { name: 'Hindi', patterns: ['उपकरण', 'पानी', 'सोलर', 'शुद्धीकरण', 'क्रांतिकारी'] }
    ];

    let languagesFound = 0;
    let detectedLanguages = [];
    
    languagePatterns.forEach(lang => {
        const matches = lang.patterns.filter(pattern => 
            translations.toLowerCase().includes(pattern.toLowerCase())
        ).length;
        
        if (matches >= 2) { // Need at least 2 pattern matches for language detection
            languagesFound++;
            detectedLanguages.push(lang.name);
        }
    });

    // More generous language scoring: 15 points max
    const languageScore = Math.min(15, languagesFound * 3);
    score += languageScore;
    debug.push(`Languages detected: ${languageScore}/15 (${detectedLanguages.join(', ')})`);

    // Technical specifications with weighted importance
    const criticalSpecs = [
        { spec: '99.9', weight: 2, name: 'Purification rate' },
        { spec: '2.5', weight: 2, name: 'Weight' },
        { spec: '10', weight: 1.5, name: 'Capacity' },
        { spec: 'solar', weight: 1.5, name: 'Power source' },
        { spec: 'iot', weight: 1, name: 'IoT features' }
    ];

    let techScore = 0;
    let foundSpecs = [];
    
    criticalSpecs.forEach(item => {
        if (translations.toLowerCase().includes(item.spec.toLowerCase())) {
            techScore += item.weight;
            foundSpecs.push(item.name);
        }
    });
    
    techScore = Math.min(8, techScore);
    score += techScore;
    debug.push(`Technical specs: ${techScore}/8 (${foundSpecs.join(', ')})`);

    // Content quality and completeness
    let qualityScore = 0;
    if (translations.length > 500) qualityScore += 3;
    if (translations.length > 1000) qualityScore += 2;
    if (translations.includes('$') || translations.includes('€') || translations.includes('¥')) qualityScore += 2;
    
    score += qualityScore;
    debug.push(`Content quality: ${qualityScore}/7 (length: ${translations.length} chars)`);

    return { score: Math.min(30, score), debug };
}

/* -------------------- Customer Intelligence -------------------- */
function scoreCustomerIntelligence(sentiment) {
    let score = 0;
    let debug = [];

    // Sentiment analysis depth
    const sentimentIndicators = [
        { patterns: ['score', 'sentiment', 'emotion'], weight: 3, name: 'Sentiment scoring' },
        { patterns: ['positive', 'negative', 'neutral'], weight: 2, name: 'Sentiment categories' },
        { patterns: ['analysis', 'review', 'feedback'], weight: 2, name: 'Analysis depth' }
    ];

    let sentimentScore = 0;
    let foundSentiment = [];
    
    sentimentIndicators.forEach(item => {
        const matches = item.patterns.filter(pattern => 
            sentiment.toLowerCase().includes(pattern.toLowerCase())
        ).length;
        
        if (matches > 0) {
            sentimentScore += item.weight;
            foundSentiment.push(item.name);
        }
    });
    
    sentimentScore = Math.min(10, sentimentScore);
    score += sentimentScore;
    debug.push(`Sentiment analysis: ${sentimentScore}/10 (${foundSentiment.join(', ')})`);

    // Action recommendations
    const actionIndicators = [
        'action', 'recommend', 'priority', 'urgent', 'escalate', 
        'follow', 'response', 'template', 'immediate', 'investigate'
    ];
    
    const foundActions = actionIndicators.filter(word => 
        sentiment.toLowerCase().includes(word.toLowerCase())
    );
    
    const actionScore = Math.min(8, foundActions.length * 1);
    score += actionScore;
    debug.push(`Actions identified: ${actionScore}/8 (${foundActions.length} action words)`);

    // Summary and insights
    const insightScore = sentiment.toLowerCase().includes('overall') ? 3 : 0 +
                        sentiment.toLowerCase().includes('average') ? 2 : 0 +
                        sentiment.toLowerCase().includes('top') ? 2 : 0;
    
    const finalInsightScore = Math.min(7, insightScore);
    score += finalInsightScore;
    debug.push(`Summary insights: ${finalInsightScore}/7`);

    return { score: Math.min(25, score), debug };
}

/* -------------------- Automation Setup -------------------- */
function scoreAutomationSetup(workflows) {
    let score = 0;
    let debug = [];

    // Workflow completeness
    const workflowTypes = ['customer', 'support', 'social', 'media'];
    const foundTypes = workflowTypes.filter(type => 
        workflows.toLowerCase().includes(type.toLowerCase())
    );
    
    const typeScore = foundTypes.length >= 3 ? 10 : foundTypes.length * 3;
    score += typeScore;
    debug.push(`Workflow types: ${typeScore}/10 (${foundTypes.join(', ')})`);

    // Structure and process design
    const structureElements = [
        'trigger', 'step', 'action', 'process', 'route', 'response', 'workflow'
    ];
    
    const foundStructure = structureElements.filter(element => 
        workflows.toLowerCase().includes(element.toLowerCase())
    );
    
    const structureScore = Math.min(8, foundStructure.length * 1.2);
    score += structureScore;
    debug.push(`Structure elements: ${structureScore}/8 (${foundStructure.length} elements)`);

    // Business logic and escalation
    const logicElements = ['escalation', 'rule', 'condition', 'priority', 'alert', 'approval'];
    const foundLogic = logicElements.filter(element => 
        workflows.toLowerCase().includes(element.toLowerCase())
    );
    
    const logicScore = Math.min(7, foundLogic.length * 1.5);
    score += logicScore;
    debug.push(`Business logic: ${logicScore}/7 (${foundLogic.length} logic elements)`);

    return { score: Math.min(25, score), debug };
}

/* -------------------- Data Quality -------------------- */
function scoreDataQuality(validation) {
    let score = 0;
    let debug = [];

    // Quality validation activities
    const validationActivities = [
        'consistent', 'check', 'quality', 'validation', 'accuracy', 'review', 'verify'
    ];
    
    const foundValidation = validationActivities.filter(activity => 
        validation.toLowerCase().includes(activity.toLowerCase())
    );
    
    const validationScore = Math.min(8, foundValidation.length * 1.2);
    score += validationScore;
    debug.push(`Validation activities: ${validationScore}/8 (${foundValidation.length} activities)`);

    // Translation quality assessment
    const hasScoring = validation.includes('/10') || validation.includes('score') || validation.includes('rating');
    const hasAverage = validation.toLowerCase().includes('average');
    const hasTranslation = validation.toLowerCase().includes('translation');
    
    let scoringScore = 0;
    if (hasScoring) scoringScore += 3;
    if (hasAverage) scoringScore += 2;
    if (hasTranslation) scoringScore += 2;
    
    scoringScore = Math.min(7, scoringScore);
    score += scoringScore;
    debug.push(`Quality scoring: ${scoringScore}/7 (scoring: ${hasScoring}, average: ${hasAverage})`);

    // Issue identification and resolution
    const issueWords = ['issue', 'problem', 'error', 'critical', 'fix', 'improve', 'discrepancy'];
    const foundIssues = issueWords.filter(word => 
        validation.toLowerCase().includes(word.toLowerCase())
    );
    
    const issueScore = Math.min(5, foundIssues.length * 0.8);
    score += issueScore;
    debug.push(`Issue identification: ${issueScore}/5 (${foundIssues.length} issue indicators)`);

    return { score: Math.min(20, score), debug };
}
