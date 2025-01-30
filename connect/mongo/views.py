from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import json

# Configure MongoDB client
client = MongoClient('mongodb://localhost:27017/')
db = client['DBMS_NoSQL']  # Replace with your database name

@csrf_exempt  # Disable CSRF for API calls (ensure proper security for production)
def mongo_query_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON payload
            data = json.loads(request.body.decode('utf-8'))
            user_query = data.get('query', '{}')  # Default to an empty query if not provided
            collection_name = data.get('collection', '')  # Get the collection name

            if not collection_name:
                return JsonResponse({'error': 'Collection name is required.'}, status=400)

            try:
                # Convert the user query string to a Python dictionary
                query = json.loads(user_query)

                # Fetch the results from MongoDB
                mongo_result = list(db[collection_name].find(query))

                # Convert MongoDB ObjectId to string for JSON serialization
                for doc in mongo_result:
                    doc['_id'] = str(doc['_id'])

                return JsonResponse({'result': mongo_result}, status=200)
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    return JsonResponse({'error': 'Only POST method is allowed.'}, status=405)
