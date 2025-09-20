# 🔧 Step-by-Step Zapier Workflow Design Guide
## Customer Support & Social Media Automation

---

## 🎯 **WORKFLOW 1: CUSTOMER SUPPORT AUTOMATION**

### **Step 1: Set Up the Trigger**
```
TRIGGER: New Support Ticket
- Platform: Email (Gmail/Outlook) OR Support System (Zendesk/Freshdesk)
- What it watches: New emails to support@ecotech.com
- When it fires: Immediately when new ticket arrives
```

### **Step 2: Extract Ticket Information**
```
ACTION: Parse Email Content
- Extract: Customer email, subject line, message body
- Store in variables:
  - customer_email = "john@example.com"
  - ticket_subject = "Device stopped working"
  - ticket_body = "My AquaPure Solar stopped working after 2 weeks..."
```

### **Step 3: Analyze Sentiment**
```
ACTION: ChatGPT API Call
Prompt: "Analyze the sentiment of this customer support ticket. 
Provide sentiment score (0.0-1.0) and emotion:

Subject: {{ticket_subject}}
Message: {{ticket_body}}

Return format: Score: X.X, Emotion: [emotion], Urgency: [low/medium/high]"

Expected Output: "Score: 0.2, Emotion: Frustrated, Urgency: high"
```

### **Step 4: Categorize Issue Type**
```
ACTION: ChatGPT API Call
Prompt: "Categorize this support ticket into one category:

Categories: TECHNICAL, BILLING, SHIPPING, GENERAL

Ticket: {{ticket_subject}} - {{ticket_body}}

Return only the category name."

Expected Output: "TECHNICAL"
```

### **Step 5: Set Priority Level**
```
ACTION: Zapier Code (Python)
def determine_priority(sentiment_score, category, urgency):
    if sentiment_score < 0.3 and category == "TECHNICAL":
        return "URGENT"
    elif sentiment_score < 0.4 or urgency == "high":
        return "HIGH"
    elif category in ["BILLING", "SHIPPING"]:
        return "MEDIUM"
    else:
        return "LOW"

priority = determine_priority({{sentiment_score}}, {{category}}, {{urgency}})
```

### **Step 6: Route to Appropriate Team**
```
ACTION: Conditional Logic
IF category == "TECHNICAL" AND priority == "URGENT":
    → Send to: tech-urgent@ecotech.com
    → Slack channel: #tech-emergency
    → Assign to: Senior Technical Support

ELIF category == "TECHNICAL":
    → Send to: tech-support@ecotech.com
    → Assign to: Technical Support Team

ELIF category == "BILLING":
    → Send to: billing@ecotech.com
    → Assign to: Finance Team

ELIF category == "SHIPPING":
    → Send to: logistics@ecotech.com
    → Assign to: Shipping Team

ELSE:
    → Send to: general-support@ecotech.com
    → Assign to: Customer Success Team
```

### **Step 7: Send Auto-Acknowledgment**
```
ACTION: Send Email
To: {{customer_email}}
Subject: "We received your support request - Ticket #{{ticket_id}}"

Email Template:
"Dear {{customer_name}},

Thank you for contacting EcoTech Solutions. We've received your support request and assigned it ticket #{{ticket_id}}.

Priority Level: {{priority}}
Expected Response Time: {{response_time}}
Assigned Team: {{assigned_team}}

{{custom_message_based_on_sentiment}}

Best regards,
EcoTech Support Team"

Response Time Logic:
- URGENT: "within 2 hours"
- HIGH: "within 24 hours"  
- MEDIUM: "within 48 hours"
- LOW: "within 72 hours"
```

### **Step 8: Create Follow-up Reminders**
```
ACTION: Schedule Follow-up
IF priority == "URGENT":
    → Create reminder in 1 hour if no response
    → Escalate to manager if no response in 2 hours

IF priority == "HIGH":
    → Create reminder in 12 hours if no response
    → Escalate to manager if no response in 24 hours

IF priority == "MEDIUM":
    → Create reminder in 24 hours if no response

IF priority == "LOW":
    → Create reminder in 48 hours if no response
```

### **Step 9: Log in CRM**
```
ACTION: Update CRM (HubSpot/Salesforce)
- Create new support case
- Link to customer record
- Set priority and category
- Add sentiment analysis results
- Set follow-up dates
- Track response times
```

---

## 📱 **WORKFLOW 2: SOCIAL MEDIA MONITORING**

### **Step 1: Set Up Social Media Trigger**
```
TRIGGER: Brand Mention Detection
- Platforms: Twitter, Facebook, Instagram, LinkedIn
- Keywords: "AquaPure Solar", "EcoTech Solutions", "@EcoTechSolar"
- Monitoring tool: Mention.com, Hootsuite, or native platform APIs
- Frequency: Real-time monitoring
```

### **Step 2: Extract Mention Details**
```
ACTION: Parse Social Media Post
Extract and store:
- platform = "Twitter"
- username = "@outdoorlover123"
- post_content = "My AquaPure Solar broke during camping trip. Terrible!"
- follower_count = 5000
- post_url = "https://twitter.com/..."
- timestamp = "2024-08-20 14:30"
```

### **Step 3: Analyze Sentiment**
```
ACTION: ChatGPT API Call
Prompt: "Analyze this social media mention of our brand:

Platform: {{platform}}
User: {{username}} ({{follower_count}} followers)
Post: {{post_content}}

Provide:
1. Sentiment score (0.0-1.0)
2. Emotion (excited, satisfied, frustrated, angry, etc.)
3. Influence level (high/medium/low based on follower count)
4. Response needed (yes/no)
5. Urgency (urgent/high/medium/low)

Format: Score: X.X | Emotion: [emotion] | Influence: [level] | Respond: [yes/no] | Urgency: [level]"

Expected Output: "Score: 0.2 | Emotion: angry | Influence: medium | Respond: yes | Urgency: high"
```

### **Step 4: Determine Response Strategy**
```
ACTION: Conditional Logic

IF sentiment_score >= 0.7:
    → Response type: "THANK"
    → Auto-respond: YES
    → Approval needed: NO

ELIF sentiment_score >= 0.4:
    → Response type: "HELPFUL"
    → Auto-respond: YES
    → Approval needed: NO

ELIF sentiment_score < 0.4 AND influence_level == "high":
    → Response type: "DAMAGE_CONTROL"
    → Auto-respond: NO
    → Approval needed: YES (Marketing Manager)

ELIF sentiment_score < 0.4:
    → Response type: "APOLOGIZE"
    → Auto-respond: NO
    → Approval needed: YES (Social Media Manager)

ELSE:
    → Response type: "MONITOR"
    → Auto-respond: NO
    → Approval needed: NO
```

### **Step 5: Generate Response Content**
```
ACTION: ChatGPT API Call
Prompt: "Generate a professional social media response for this mention:

Original Post: {{post_content}}
Platform: {{platform}}
Sentiment: {{emotion}}
Response Type: {{response_type}}
Brand Voice: Professional, helpful, empathetic

Guidelines:
- Keep under 280 characters for Twitter
- Include relevant hashtags
- Offer direct contact for negative issues
- Thank for positive feedback
- Stay on brand

Generate response:"

Example Outputs:
POSITIVE: "Thanks for the amazing feedback! 🌟 We're thrilled AquaPure Solar is working great for your adventures. Feel free to share your clean water stories with #AquaPureSolar!"

NEGATIVE: "We're sorry to hear about your experience. Please DM us your order details so we can help resolve this immediately. Our team is standing by to make this right. 💙"
```

### **Step 6: Route for Approval (if needed)**
```
ACTION: Send for Approval
IF approval_needed == YES:
    → Send Slack message to appropriate manager
    → Include: original post, generated response, sentiment analysis
    → Wait for approval before posting
    → Set 30-minute timeout for urgent issues

Slack Message Template:
"🚨 Social Media Response Needed
Platform: {{platform}}
User: {{username}} ({{follower_count}} followers)
Sentiment: {{sentiment_score}} ({{emotion}})
Original: {{post_content}}
Proposed Response: {{generated_response}}
React with ✅ to approve or ❌ to edit"
```

### **Step 7: Post Response**
```
ACTION: Post to Social Media
IF auto_respond == YES OR approval_received == YES:
    → Post response to original platform
    → Tag original user if appropriate
    → Use brand account
    → Track engagement metrics

IF approval_received == NO:
    → Send back to ChatGPT for revision
    → Include feedback from manager
    → Generate new response
    → Re-submit for approval
```

### **Step 8: Log in CRM**
```
ACTION: Update CRM System
- Create social media interaction record
- Link to customer if identifiable
- Store sentiment analysis results
- Track response metrics
- Set follow-up reminders if needed
- Update customer satisfaction scores
```

### **Step 9: Monitor and Alert**
```
ACTION: Crisis Detection
Track metrics every hour:
- Negative mentions count
- Sentiment trend
- Response rate
- Engagement levels

IF negative_mentions > 5 per hour:
    → Alert marketing team
    → Prepare crisis communication
    → Escalate to PR team

IF sentiment_trend declining:
    → Weekly report to management
    → Analyze root causes
    → Recommend product improvements
```

---

## 🚨 **ESCALATION RULES**

### **Customer Support Escalations:**
```
IMMEDIATE ESCALATION (within 15 minutes):
- Sentiment score < 0.2 AND category = "TECHNICAL"
- Keywords: "broken", "defective", "dangerous", "lawsuit"
- Multiple tickets from same customer in 24 hours
- Mentions of competitors in negative context

MANAGER ESCALATION (within 2 hours):
- Sentiment score < 0.3 AND priority = "HIGH"
- No response from assigned team in SLA timeframe
- Customer requests manager/supervisor
- Billing disputes over $100

EXECUTIVE ESCALATION (within 4 hours):
- Threats of legal action
- Social media mentions with >10K followers
- Product safety concerns
- Media inquiries
```

### **Social Media Escalations:**
```
IMMEDIATE ESCALATION:
- Influencer (>50K followers) posts negative content
- Viral negative content (>100 shares in 1 hour)
- Product safety concerns mentioned publicly
- Competitor comparison posts

PR TEAM ESCALATION:
- Media outlet mentions
- Industry expert criticism
- Trending negative hashtags
- Crisis-level negative sentiment spike
```

---

## 🛠️ **IMPLEMENTATION CHECKLIST**

### **Before Going Live:**
- [ ] Test all API connections (ChatGPT, CRM, Email)
- [ ] Verify team email addresses and Slack channels
- [ ] Set up monitoring dashboards
- [ ] Train team on escalation procedures
- [ ] Create backup manual processes
- [ ] Test with sample data

### **Monitoring & Optimization:**
- [ ] Track response times and accuracy
- [ ] Monitor sentiment analysis accuracy
- [ ] Adjust escalation thresholds based on results
- [ ] Regular team feedback sessions
- [ ] Monthly workflow performance reviews

**These workflows will handle 80% of support tickets and social mentions automatically while ensuring critical issues get immediate human attention!** 🚀
