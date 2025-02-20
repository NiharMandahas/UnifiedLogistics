from django.http import JsonResponse
from transformers import BartTokenizer, BartForConditionalGeneration
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def text_editor_view(request):
    if request.method == "POST":
        import json
        # Parse JSON input
        data = json.loads(request.body)
        text_content = data.get('text_content', '')

        model_path = "/Users/Dell/Desktop/DBMS_LAB/App/connect/saved_model"
        tokenizer = BartTokenizer.from_pretrained(model_path)
        model = BartForConditionalGeneration.from_pretrained(model_path, early_stopping=True)

        # Tokenize the input query
        inputs = tokenizer(text_content, return_tensors="pt", truncation=True, padding="max_length", max_length=128)
        # Generate SQL
        outputs = model.generate(inputs.input_ids, max_length=60, num_beams=4, early_stopping=True)
        # Decode the output
        sql_query = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Return the generated SQL query as JSON
        return JsonResponse({'sql_query': sql_query}, status=200)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


from django.db import connection
from django.http import JsonResponse

from django.db import connection
from django.http import JsonResponse

@csrf_exempt
def execute_query_view(request):
    if request.method == 'POST':
        import json
        # Parse JSON input
        data = json.loads(request.body)
        query = data.get('sql_query', '')

        # Validate the query
        allowed_queries = ['SELECT']  # Restrict query types for safety
        if not any(query.strip().upper().startswith(allowed) for allowed in allowed_queries):
            return JsonResponse({'error': 'Only SELECT queries are allowed.'}, status=400)

        try:
            with connection.cursor() as cursor:
                cursor.execute(query)  # Execute the query
                columns = [col[0] for col in cursor.description]  # Column names
                rows = cursor.fetchall()  # Fetch all results
                print(rows)
            # Return the result as JSON
            return JsonResponse({'columns': columns, 'rows': rows}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

