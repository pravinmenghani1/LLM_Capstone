function toggleDebug() {
    const debugDiv = document.getElementById('debug-info');
    const debugContent = document.getElementById('debug-content');
    const button = event.target;

    if (debugDiv.style.display === 'none') {
        // Enhanced debug formatting with educational insights
        function formatEducationalDebug(categoryName, debugArr, maxPoints, actualScore) {
            const percentage = ((actualScore / maxPoints) * 100).toFixed(1);
            let text = `
                <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 10px 0; border-left: 4px solid #3498db;">
                    <h4 style="color: #2c3e50; margin: 0 0 10px 0;">
                        🔍 ${categoryName} Analysis (${actualScore}/${maxPoints} points - ${percentage}%)
                    </h4>
            `;
            
            debugArr.forEach(item => {
                // Extract points from debug messages and format them nicely
                if (item.includes('score:') || item.includes('Score:')) {
                    const parts = item.split(':');
                    const description = parts[0].trim();
                    const scoreInfo = parts[1].trim();
                    
                    // Color code based on performance
                    let color = '#27ae60'; // green
                    if (scoreInfo.includes('/')) {
                        const [earned, total] = scoreInfo.split('/')[0].split(' ')[0], scoreInfo.split('/')[1].split(' ')[0];
                        const percent = (parseFloat(earned) / parseFloat(total)) * 100;
                        if (percent < 50) color = '#e74c3c';
                        else if (percent < 75) color = '#f39c12';
                    }
                    
                    text += `
                        <div style="margin: 8px 0; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid ${color};">
                            <strong style="color: ${color};">${description}:</strong> ${scoreInfo}
                        </div>
                    `;
                } else {
                    // Handle other debug messages
                    text += `
                        <div style="margin: 5px 0; padding: 5px; background: #ecf0f1; border-radius: 4px; font-size: 0.9em;">
                            • ${item}
                        </div>
                    `;
                }
            });
            
            // Add improvement suggestions
            text += getImprovementSuggestions(categoryName, actualScore, maxPoints);
            text += '</div>';
            
            return text;
        }

        let debugText = '<h3 style="color: #2c3e50; margin-bottom: 20px;">📊 Detailed Scoring Breakdown</h3>';
        
        debugText += formatEducationalDebug('Content Quality', debugInfo.content, 30, scoringResults.content);
        debugText += formatEducationalDebug('Customer Intelligence', debugInfo.intelligence, 25, scoringResults.intelligence);
        debugText += formatEducationalDebug('Automation Setup', debugInfo.automation, 25, scoringResults.automation);
        debugText += formatEducationalDebug('Data Quality', debugInfo.quality, 20, scoringResults.quality);
        
        // Add overall summary
        debugText += `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="margin: 0 0 15px 0;">🎯 Overall Performance Summary</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <strong>Total Score:</strong> ${scoringResults.total}/100<br>
                        <strong>Performance Level:</strong> ${getPerformanceLevel(scoringResults.total)}<br>
                        <strong>Launch Status:</strong> ${getLaunchStatus(scoringResults.total)}
                    </div>
                    <div>
                        <strong>Strongest Area:</strong> ${getStrongestArea()}<br>
                        <strong>Needs Most Work:</strong> ${getWeakestArea()}<br>
                        <strong>Next Steps:</strong> ${getNextSteps()}
                    </div>
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

// Helper functions for educational insights
function getImprovementSuggestions(category, score, maxScore) {
    const percentage = (score / maxScore) * 100;
    let suggestions = '<div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 4px; border-left: 3px solid #ffc107;">';
    suggestions += '<strong>💡 Improvement Tips:</strong><br>';
    
    if (category === 'Content Quality' && percentage < 80) {
        suggestions += '• Include more technical specifications (99.9%, 2.5kg, 10L/hour)<br>';
        suggestions += '• Add cultural adaptations for each language<br>';
        suggestions += '• Ensure all LinkedIn profiles are complete<br>';
    } else if (category === 'Customer Intelligence' && percentage < 80) {
        suggestions += '• Include specific sentiment scores and emotions<br>';
        suggestions += '• Add clear action recommendations for each review<br>';
        suggestions += '• Provide overall summary with key insights<br>';
    } else if (category === 'Automation Setup' && percentage < 80) {
        suggestions += '• Design complete workflows with triggers and steps<br>';
        suggestions += '• Include escalation rules and conditions<br>';
        suggestions += '• Cover both customer support and social media workflows<br>';
    } else if (category === 'Data Quality' && percentage < 80) {
        suggestions += '• Perform systematic consistency checks<br>';
        suggestions += '• Include translation quality scores (X/10 format)<br>';
        suggestions += '• Identify and document any issues found<br>';
    } else {
        suggestions += '• Excellent work! This category is performing well. ✨<br>';
    }
    
    suggestions += '</div>';
    return suggestions;
}

function getPerformanceLevel(totalScore) {
    if (totalScore >= 85) return '🥇 Excellent';
    if (totalScore >= 70) return '🥈 Good';
    if (totalScore >= 55) return '🥉 Needs Work';
    return '❌ Poor';
}

function getLaunchStatus(totalScore) {
    if (totalScore >= 85) return 'Ready to Launch';
    if (totalScore >= 70) return '24-hour Delay';
    if (totalScore >= 55) return '1-week Delay';
    return 'Launch Canceled';
}

function getStrongestArea() {
    const scores = {
        'Content Quality': scoringResults.content / 30,
        'Customer Intelligence': scoringResults.intelligence / 25,
        'Automation Setup': scoringResults.automation / 25,
        'Data Quality': scoringResults.quality / 20
    };
    
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function getWeakestArea() {
    const scores = {
        'Content Quality': scoringResults.content / 30,
        'Customer Intelligence': scoringResults.intelligence / 25,
        'Automation Setup': scoringResults.automation / 25,
        'Data Quality': scoringResults.quality / 20
    };
    
    return Object.keys(scores).reduce((a, b) => scores[a] < scores[b] ? a : b);
}

function getNextSteps() {
    const totalScore = scoringResults.total;
    if (totalScore >= 85) return 'Proceed with launch';
    if (totalScore >= 70) return 'Fix minor issues';
    if (totalScore >= 55) return 'Major improvements needed';
    return 'Complete rework required';
}
