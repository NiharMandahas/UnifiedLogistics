# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

@csrf_exempt
def get_table_data(request, table_name):
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {table_name}")
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
            data = [dict(zip(columns, row)) for row in rows]
            return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)




@csrf_exempt
def update_table_row(request, table_name, row_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)

            # Determine the correct ID field based on the table
            id_mapping = {
                'CompanyDetails': 'Company_ID',
                'CustomerDetails': 'Customer_ID',
                'Vehicle': 'Vehicle_ID',
                'Warehouse': 'Warehouse_ID',
                'Orders': 'Order_ID',
                'ProductDetails': 'Order_ID'
            }
            id_field = id_mapping.get(table_name, 'id')  # Default to 'id'

            # Build SQL query dynamically
            set_clause = ", ".join([f"{k} = %s" for k in data.keys()])
            values = list(data.values())

            with connection.cursor() as cursor:
                cursor.execute(
                    f"UPDATE {table_name} SET {set_clause} WHERE {id_field} = %s",
                    values + [row_id]
                )
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
