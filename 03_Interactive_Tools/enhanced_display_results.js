function displayResults() {
    const results = scoringResults;
    const maxScores = { content: 30, intelligence: 25, automation: 25, quality: 20 };

    // Format score with percentage and performance indicator
    function formatScore(score, max) {
        const percentage = ((score / max) * 100).toFixed(1);
        let indicator = '';
        if (percentage >= 80) indicator = ' ✨';
        else if (percentage >= 60) indicator = ' ✅';
        else if (percentage >= 40) indicator = ' ⚠️';
        else indicator = ' ❌';
        
        return `${score}/${max} (${percentage}%)${indicator}`;
    }

    // Update individual scores
    document.getElementById('content-points').textContent = formatScore(results.content, maxScores.content);
    document.getElementById('intelligence-points').textContent = formatScore(results.intelligence, maxScores.intelligence);
    document.getElementById('automation-points').textContent = formatScore(results.automation, maxScores.automation);
    document.getElementById('quality-points').textContent = formatScore(results.quality, maxScores.quality);

    // Update overall score circle
    const totalMax = Object.values(maxScores).reduce((a, b) => a + b, 0);
    const overallPercentage = ((results.total / totalMax) * 100).toFixed(1);
    const scoreCircle = document.getElementById('overall-score');
    
    // Make the circle more readable
    scoreCircle.innerHTML = `
        <div style="font-size: 24px; font-weight: bold;">${results.total}</div>
        <div style="font-size: 12px; margin-top: -5px;">/${totalMax}</div>
        <div style="font-size: 14px; margin-top: 2px;">${overallPercentage}%</div>
    `;

    // Enhanced color coding with better contrast
    if (overallPercentage >= 85) {
        scoreCircle.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        scoreCircle.style.color = 'white';
        scoreCircle.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
    } else if (overallPercentage >= 70) {
        scoreCircle.style.background = 'linear-gradient(135deg, #3498db, #5dade2)';
        scoreCircle.style.color = 'white';
        scoreCircle.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.4)';
    } else if (overallPercentage >= 55) {
        scoreCircle.style.background = 'linear-gradient(135deg, #f39c12, #f4d03f)';
        scoreCircle.style.color = 'white';
        scoreCircle.style.boxShadow = '0 4px 15px rgba(243, 156, 18, 0.4)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #e74c3c, #ec7063)';
        scoreCircle.style.color = 'white';
        scoreCircle.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
    }

    // Enhanced launch decision with more context
    let decision, advice = '';
    if (overallPercentage >= 85) {
        decision = '🥇 LAUNCH HERO - Proceed with launch! $2M secured.';
        advice = 'Excellent work! Your team delivered high-quality results across all categories.';
    } else if (overallPercentage >= 70) {
        decision = '🥈 LAUNCH SAVER - Minor fixes needed, 24-hour delay.';
        advice = 'Good work! Address the highlighted issues and you\'ll be ready to launch.';
    } else if (overallPercentage >= 55) {
        decision = '🥉 CRISIS MANAGER - Major fixes required, 1-week delay.';
        advice = 'Significant improvements needed. Focus on the lowest-scoring categories first.';
    } else {
        decision = '❌ MISSION FAILED - Extensive rework needed.';
        advice = 'Major rework required across multiple categories. Review the debug info for guidance.';
    }
    
    document.getElementById('launch-decision').innerHTML = `
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">${decision}</div>
        <div style="font-size: 14px; font-style: italic; opacity: 0.8;">${advice}</div>
    `;

    // Color code individual items with enhanced feedback
    colorCodeScoreItem('content-score', results.content, maxScores.content);
    colorCodeScoreItem('intelligence-score', results.intelligence, maxScores.intelligence);
    colorCodeScoreItem('automation-score', results.automation, maxScores.automation);
    colorCodeScoreItem('quality-score', results.quality, maxScores.quality);
}

function colorCodeScoreItem(elementId, score, maxScore) {
    const element = document.getElementById(elementId);
    const percentage = (score / maxScore) * 100;

    // Enhanced color coding with better visual feedback
    if (percentage >= 80) {
        element.className = 'score-item score-excellent';
        element.style.borderLeft = '5px solid #27ae60';
    } else if (percentage >= 60) {
        element.className = 'score-item score-good';
        element.style.borderLeft = '5px solid #3498db';
    } else if (percentage >= 40) {
        element.className = 'score-item score-warning';
        element.style.borderLeft = '5px solid #f39c12';
    } else {
        element.className = 'score-item score-poor';
        element.style.borderLeft = '5px solid #e74c3c';
    }
}

// Add this helper function for better user experience
function getPerformanceFeedback(category, score, maxScore) {
    const percentage = (score / maxScore) * 100;
    const categoryNames = {
        content: 'Content Creation',
        intelligence: 'Customer Intelligence', 
        automation: 'Automation Setup',
        quality: 'Data Quality'
    };
    
    let feedback = `${categoryNames[category]}: `;
    
    if (percentage >= 80) {
        feedback += 'Outstanding performance! 🌟';
    } else if (percentage >= 60) {
        feedback += 'Good work, minor improvements possible. ✅';
    } else if (percentage >= 40) {
        feedback += 'Needs improvement in key areas. ⚠️';
    } else {
        feedback += 'Requires significant rework. ❌';
    }
    
    return feedback;
}
