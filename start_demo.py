#!/usr/bin/env python3
"""
Quick Start Demo Launcher
Run this script to begin the structured demo experience
"""

import os
import webbrowser
from pathlib import Path

def main():
    base_dir = Path(__file__).parent
    
    print("🚀 GPT Demo Quick Start")
    print("=" * 40)
    
    # Check if configuration exists
    config_file = base_dir / "04_Configuration_Files" / "demo_config.json"
    if config_file.exists():
        print("✅ Configuration found")
    else:
        print("❌ Configuration missing - check 04_Configuration_Files/")
    
    print("\n📚 Available Demo Paths:")
    print("1. PDF Demos (01_Demo_PDFs/)")
    print("2. Interactive Tools (03_Interactive_Tools/)")
    print("3. Workshop Materials (02_Workshop_Materials/)")
    print("4. Documentation (05_Documentation/)")
    
    choice = input("\nSelect option (1-4): ").strip()
    
    if choice == "1":
        pdf_dir = base_dir / "01_Demo_PDFs"
        print(f"\n📖 Opening PDF directory: {pdf_dir}")
        os.system(f"open '{pdf_dir}'")
    
    elif choice == "2":
        tools_dir = base_dir / "03_Interactive_Tools"
        interactive_demo = tools_dir / "interactive_demo.py"
        if interactive_demo.exists():
            print(f"\n🔧 Running interactive demo...")
            os.system(f"python3 '{interactive_demo}'")
        else:
            print(f"\n📁 Opening tools directory: {tools_dir}")
            os.system(f"open '{tools_dir}'")
    
    elif choice == "3":
        workshop_dir = base_dir / "02_Workshop_Materials"
        print(f"\n🎯 Opening workshop directory: {workshop_dir}")
        os.system(f"open '{workshop_dir}'")
    
    elif choice == "4":
        docs_dir = base_dir / "05_Documentation"
        print(f"\n📋 Opening documentation directory: {docs_dir}")
        os.system(f"open '{docs_dir}'")
    
    else:
        print("Invalid choice. Opening README...")
        readme = base_dir / "README.md"
        os.system(f"open '{readme}'")

if __name__ == "__main__":
    main()
