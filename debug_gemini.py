import google.generativeai as genai
import os
import json
import requests

API_KEY = "AIzaSyDSNEm7pI5HbMAfTyjCZQUjXQJwOXHio1k"
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

print(f"Fetching from {url.replace(API_KEY, 'HIDDEN')}")

try:
    resp = requests.get(url)
    data = resp.json()
    
    with open("models.txt", "w") as f:
        if "models" in data:
            f.write("--- AVAILABLE MODELS ---\n")
            for m in data["models"]:
                is_audio = "outputModalities" in m and "AUDIO" in m["outputModalities"]
                line = f"[{'AUDIO' if is_audio else 'TEXT '}] {m['name']}\n"
                f.write(line)
                print(line.strip())
        else:
            f.write(f"Error/No Models: {json.dumps(data)}")
            print("No models found.")
            
except Exception as e:
    with open("models.txt", "w") as f:
        f.write(f"Script Error: {str(e)}")
    print(f"Error: {e}")
