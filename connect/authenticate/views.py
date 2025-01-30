import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import os

USERS_FILE = 'users.json'

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    
    users = load_users()
    
    if username in users:
        return JsonResponse({'error': 'Username already exists'}, status=400)
    
    users[username] = password
    save_users(users)
    
    return JsonResponse({'message': 'Registration successful'})

@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    
    users = load_users()
    
    if username in users and users[username] == password:
        return JsonResponse({'message': 'Login successful', 'username': username})
    
    return JsonResponse({'error': 'Invalid credentials'}, status=401)