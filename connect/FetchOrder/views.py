from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

@csrf_exempt
def search_order(request):
    if request.method == "POST":
        try:
            # Parse the JSON request body
            body = json.loads(request.body)
            order_id = body.get("order_id")

            # Validate the input
            if not order_id:
                return JsonResponse({"error": "Order ID is required."}, status=400)

            # Query the database directly using raw SQL
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT 
                        o.Product_Name,
                        o.Estimated_Time,
                        o.Status,
                        c.Name AS Company_Name,
                        c.Rating
                    FROM 
                        Orders_Data AS o
                    JOIN 
                        Company_Data AS c
                    ON 
                        o.Company_ID = c.Company_ID
                    WHERE 
                        o.Order_ID = %s
                """, [order_id])
                row = cursor.fetchone()

            # Check if the order exists
            if not row:
                return JsonResponse({"error": "Order not found."}, status=404)

            # Prepare the response data
            response_data = {
                "Product_Name": row[0],
                "Estimated_Time": row[1],
                "Status": row[2],
                "Company_Name": row[3],
                "Rating": row[4],
            }

            return JsonResponse(response_data, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)
