#!/usr/bin/env python3
"""
Workshop Materials Generator
Creates all the materials teams need for the crisis simulation
"""

import json
import random

def generate_crisis_brief():
    """Generate the crisis situation brief"""
    return {
        "company": "EcoTech Solutions",
        "product": "AquaPure Solar",
        "crisis": "Marketing agency canceled 4 hours before global launch",
        "at_risk": "$2M in pre-orders",
        "markets": ["USA", "Spain", "Japan", "Germany", "India"],
        "languages": ["English", "Spanish", "Japanese", "German", "Hindi"],
        "deadline": "4 hours (2 PM launch)",
        "team_size": "3-4 people",
        "success_metric": ">85% launch readiness score"
    }

def generate_product_specs():
    """Generate detailed product specifications"""
    return {
        "name": "AquaPure Solar",
        "category": "Portable Water Purification Device",
        "key_features": [
            "Solar-powered operation (20W panel included)",
            "99.9% bacteria, virus, and parasite removal",
            "Portable design - only 2.5kg total weight",
            "10 liters per hour processing capacity",
            "IoT connectivity for remote monitoring",
            "Works in temperatures from -10°C to 50°C",
            "No electricity or batteries required",
            "2-year international warranty"
        ],
        "target_markets": {
            "primary": ["Off-grid communities", "Emergency response", "Outdoor recreation"],
            "secondary": ["Rural healthcare", "Disaster relief", "Military operations"]
        },
        "pricing": {
            "USD": 299,
            "EUR": 279,
            "GBP": 259,
            "JPY": 32000,
            "INR": 24999
        },
        "certifications": ["NSF International", "EPA approved", "CE marking", "ISO 9001"]
    }

def generate_customer_reviews():
    """Generate realistic customer reviews for analysis"""
    reviews = [
        {
            "id": 1,
            "text": "This device is absolutely life-changing! Used it during our 3-week trek in Nepal. Crystal clear water every time, even from muddy streams. The solar charging works perfectly even on cloudy days. Worth every penny!",
            "rating": 5,
            "country": "USA",
            "use_case": "Outdoor recreation"
        },
        {
            "id": 2,
            "text": "Good product overall but the purification takes longer than advertised. Claims 10L/hour but I'm getting about 7L/hour in real conditions. Still reliable though, just manage expectations.",
            "rating": 3,
            "country": "Germany",
            "use_case": "Emergency preparedness"
        },
        {
            "id": 3,
            "text": "Complete waste of money! Device stopped working after just 2 weeks of use. Customer service is terrible - no response to my emails for 10 days. Very disappointed with this purchase.",
            "rating": 1,
            "country": "USA",
            "use_case": "Camping"
        },
        {
            "id": 4,
            "text": "Perfect solution for our remote village clinic! We've been using it for 6 months now and it's provided clean water for over 200 patients. The IoT monitoring helps us track usage and maintenance needs.",
            "rating": 5,
            "country": "India",
            "use_case": "Healthcare"
        },
        {
            "id": 5,
            "text": "Decent product but quite expensive for our market. The technology is impressive but the price point makes it difficult for average families to afford. Maybe consider a budget version?",
            "rating": 3,
            "country": "India",
            "use_case": "Household"
        },
        {
            "id": 6,
            "text": "Excelente producto para nuestras expediciones. Funciona perfectamente en condiciones extremas. La batería solar dura todo el día. Muy recomendado para aventureros.",
            "rating": 4,
            "country": "Spain",
            "use_case": "Adventure sports"
        },
        {
            "id": 7,
            "text": "Instructions are completely unclear! Took me 3 hours to figure out how to set it up properly. The device works fine once you know how, but the manual needs serious improvement.",
            "rating": 2,
            "country": "Germany",
            "use_case": "Household"
        },
        {
            "id": 8,
            "text": "素晴らしい製品です！キャンプで使用しましたが、どんな水源からでもきれいな水が作れます。ソーラーパネルの効率も良く、曇りの日でも問題ありません。",
            "rating": 5,
            "country": "Japan",
            "use_case": "Camping"
        },
        {
            "id": 9,
            "text": "The solar panel is too small for consistently cloudy weather. Works great on sunny days but struggles during monsoon season. Need a larger panel or backup power option.",
            "rating": 2,
            "country": "India",
            "use_case": "Rural community"
        },
        {
            "id": 10,
            "text": "Outstanding build quality and performance! We've deployed 50 units across refugee camps and they're still working perfectly after 8 months of heavy use. Highly recommended for humanitarian applications.",
            "rating": 5,
            "country": "Germany",
            "use_case": "Humanitarian aid"
        },
        {
            "id": 11,
            "text": "It's okay, does what it promises. Nothing spectacular but gets the job done. Build quality seems decent for the price point. Would buy again if needed.",
            "rating": 3,
            "country": "USA",
            "use_case": "Emergency preparedness"
        },
        {
            "id": 12,
            "text": "Love the IoT features! I can monitor water quality and device status from my phone even when I'm not at the campsite. The app is user-friendly and provides useful insights.",
            "rating": 4,
            "country": "USA",
            "use_case": "RV travel"
        },
        {
            "id": 13,
            "text": "Producto caro pero vale la pena. La calidad del agua es excelente y el diseño es muy robusto. Perfecto para nuestras actividades de montañismo en los Andes.",
            "rating": 4,
            "country": "Spain",
            "use_case": "Mountaineering"
        },
        {
            "id": 14,
            "text": "Heavy to carry for long hikes. At 2.5kg it's manageable for car camping but too much for backpacking. Consider making a lighter version for hikers.",
            "rating": 3,
            "country": "Germany",
            "use_case": "Hiking"
        },
        {
            "id": 15,
            "text": "यह उपकरण हमारे गांव के लिए वरदान है। साफ पानी की समस्या हल हो गई है। सोलर पैनल बहुत अच्छा काम करता है। सभी को सुझाऊंगा।",
            "rating": 5,
            "country": "India",
            "use_case": "Village water supply"
        }
    ]
    return reviews

def generate_sales_team_data():
    """Generate sales team member data for LinkedIn profiles"""
    return [
        {
            "name": "Maria Santos",
            "country": "Spain",
            "role": "Regional Sales Manager - Southern Europe",
            "experience_years": 5,
            "background": "Water technology sales",
            "education": "MBA Marketing, Universidad de Barcelona",
            "languages": ["Spanish", "English", "Portuguese"],
            "achievements": [
                "Increased regional sales by 150% in previous role",
                "Managed €2M territory for water treatment company",
                "Built partnerships with 25+ distributors across Spain and Portugal"
            ],
            "specialties": ["B2B sales", "Channel partnerships", "Mediterranean markets"]
        },
        {
            "name": "Hiroshi Tanaka",
            "country": "Japan",
            "role": "Regional Sales Manager - Asia Pacific",
            "experience_years": 8,
            "background": "Sustainable technology sales",
            "education": "Engineering degree, Tokyo Institute of Technology",
            "languages": ["Japanese", "English", "Mandarin"],
            "achievements": [
                "Led $5M solar technology rollout across Japan",
                "Established partnerships with 15 major retailers",
                "Expert in Japanese regulatory compliance for water products"
            ],
            "specialties": ["Technical sales", "Regulatory compliance", "Asian markets"]
        },
        {
            "name": "Priya Sharma",
            "country": "India",
            "role": "Regional Sales Manager - South Asia",
            "experience_years": 6,
            "background": "Rural development and water access",
            "education": "MS Environmental Engineering, IIT Delhi",
            "languages": ["Hindi", "English", "Bengali", "Tamil"],
            "achievements": [
                "Implemented water solutions for 100+ rural communities",
                "Managed $3M government contract for clean water initiative",
                "Built network of 50+ NGO partnerships"
            ],
            "specialties": ["Rural markets", "Government relations", "NGO partnerships"]
        }
    ]

def generate_workflow_templates():
    """Generate automation workflow templates"""
    return {
        "customer_support_workflow": {
            "name": "Emergency Customer Support Automation",
            "trigger": "New support ticket received",
            "steps": [
                "Analyze ticket sentiment and urgency",
                "Categorize issue type (technical, billing, general)",
                "Route to appropriate team based on category",
                "Send auto-acknowledgment to customer",
                "Set priority level and SLA timer",
                "Create follow-up reminders",
                "Update customer satisfaction tracking"
            ],
            "escalation_rules": [
                "Negative sentiment + technical issue = Immediate escalation",
                "Billing issues = Route to finance team within 2 hours",
                "General questions = Standard queue, 24-hour response"
            ]
        },
        "social_media_monitoring": {
            "name": "Launch Day Social Media Response",
            "trigger": "Brand mention detected on social platforms",
            "steps": [
                "Analyze mention sentiment and context",
                "Identify if response is needed",
                "Generate appropriate response template",
                "Route for approval if negative/complex",
                "Auto-respond to positive mentions with thanks",
                "Log interaction in CRM system",
                "Alert marketing team of trending topics"
            ],
            "response_templates": {
                "positive": "Thank you for the great feedback! We're thrilled AquaPure Solar is working well for you. 🌟",
                "neutral": "Thanks for mentioning AquaPure Solar! Feel free to reach out if you have any questions.",
                "negative": "We're sorry to hear about your experience. Please DM us so we can help resolve this immediately."
            }
        }
    }

def generate_quality_checklist():
    """Generate data quality validation checklist"""
    return {
        "content_quality": {
            "translation_accuracy": [
                "Technical terms translated correctly",
                "Cultural context appropriate for each market",
                "Brand voice consistent across languages",
                "No grammatical errors or awkward phrasing"
            ],
            "brand_consistency": [
                "Product name spelled correctly everywhere",
                "Key features described identically",
                "Brand colors and fonts used consistently",
                "Messaging aligned with company values"
            ]
        },
        "data_integrity": {
            "product_specifications": [
                "Weight consistent across all materials (2.5kg)",
                "Capacity consistent (10L/hour)",
                "Temperature range accurate (-10°C to 50°C)",
                "Purification rate consistent (99.9%)"
            ],
            "pricing_validation": [
                "Currency conversions accurate within 5%",
                "Regional pricing strategy appropriate",
                "No pricing conflicts between channels",
                "Warranty terms consistent globally"
            ]
        },
        "workflow_validation": [
            "All trigger conditions clearly defined",
            "Action sequences logically ordered",
            "Escalation paths properly configured",
            "Response templates professionally written"
        ]
    }

def create_workshop_package():
    """Create complete workshop materials package"""
    package = {
        "crisis_brief": generate_crisis_brief(),
        "product_specs": generate_product_specs(),
        "customer_reviews": generate_customer_reviews(),
        "sales_team_data": generate_sales_team_data(),
        "workflow_templates": generate_workflow_templates(),
        "quality_checklist": generate_quality_checklist(),
        "workshop_timeline": {
            "total_duration": "90 minutes",
            "phase_1_assessment": "10 minutes",
            "phase_2_content_creation": "25 minutes",
            "phase_3_customer_intelligence": "20 minutes", 
            "phase_4_automation_setup": "20 minutes",
            "phase_5_quality_assurance": "10 minutes",
            "phase_6_presentation": "5 minutes"
        }
    }
    return package

def print_workshop_materials():
    """Print all workshop materials in organized format"""
    package = create_workshop_package()
    
    print("🏢 ECOTECH CRISIS WORKSHOP - MATERIALS PACKAGE")
    print("=" * 60)
    
    print("\n📋 CRISIS BRIEF:")
    crisis = package["crisis_brief"]
    for key, value in crisis.items():
        print(f"   {key.replace('_', ' ').title()}: {value}")
    
    print(f"\n🔧 PRODUCT SPECIFICATIONS:")
    specs = package["product_specs"]
    print(f"   Product: {specs['name']}")
    print(f"   Category: {specs['category']}")
    print("   Key Features:")
    for feature in specs["key_features"]:
        print(f"     • {feature}")
    
    print(f"\n💬 CUSTOMER REVIEWS TO ANALYZE:")
    reviews = package["customer_reviews"]
    for review in reviews[:5]:  # Show first 5 as examples
        print(f"   Review {review['id']}: {review['text'][:80]}... ({review['rating']}⭐)")
    print(f"   ... and {len(reviews)-5} more reviews")
    
    print(f"\n👥 SALES TEAM DATA:")
    team = package["sales_team_data"]
    for member in team:
        print(f"   {member['name']} ({member['country']}) - {member['experience_years']} years experience")
    
    print(f"\n⚡ WORKFLOW TEMPLATES:")
    workflows = package["workflow_templates"]
    for name, workflow in workflows.items():
        print(f"   {workflow['name']}: {len(workflow['steps'])} steps defined")
    
    print(f"\n✅ QUALITY CHECKLIST:")
    checklist = package["quality_checklist"]
    total_checks = sum(len(section) if isinstance(section, list) else sum(len(subsection) for subsection in section.values()) for section in checklist.values())
    print(f"   Total validation points: {total_checks}")
    
    print(f"\n⏰ WORKSHOP TIMELINE:")
    timeline = package["workshop_timeline"]
    for phase, duration in timeline.items():
        if phase != "total_duration":
            print(f"   {phase.replace('_', ' ').title()}: {duration}")
    
    print(f"\n🎯 SUCCESS CRITERIA:")
    print("   • >85% Launch Readiness Score = Launch proceeds")
    print("   • 70-84% = 1-day delay for fixes")
    print("   • 55-69% = 1-week delay")
    print("   • <55% = Launch canceled ($2M lost)")
    
    print(f"\n🚀 READY TO START THE CRISIS SIMULATION!")

if __name__ == "__main__":
    print_workshop_materials()
