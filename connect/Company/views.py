# views.py
import json
import csv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import os
from pathlib import Path

# Get the base directory of your Django project
BASE_DIR = Path(__file__).resolve().parent

# Use Path to create proper file path
CSV_FILE_PATH = BASE_DIR / 'Updated_Company_Summary.csv'

def read_csv_data():
    """Helper function to read data from CSV file"""
    companies = []
    try:
        if os.path.exists(CSV_FILE_PATH):
            with open(CSV_FILE_PATH, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    try:
                        company = {
                            'company_id': str(row['Company_ID']),
                            'company_name': str(row['Company_Name']),
                            'rating': float(row['Rating']),
                            'return_percentage': float(row['Return_Percentage']),
                            'cancelled_percentage': float(row['Cancelled_Percentage']),
                            'average_delivery_time': float(row['Average_Delivery_Time'])
                        }
                        companies.append(company)
                    except (ValueError, KeyError) as e:
                        print(f"Error processing row: {row}. Error: {str(e)}")
                        continue
        return companies
    except Exception as e:
        print(f"Error reading CSV: {str(e)}")
        return []

@csrf_exempt
@require_http_methods(["GET"])
def company_list(request):
    """Get all companies"""
    try:
        companies = read_csv_data()
        # Return only company_id and company_name for list view
        simplified_data = [
            {
                'company_id': company['company_id'], 
                'company_name': company['company_name']
            } 
            for company in companies
        ]
        return JsonResponse(simplified_data, safe=False)
    except Exception as e:
        print(f"Error in company_list: {str(e)}")
        return JsonResponse([], safe=False)

@csrf_exempt
@require_http_methods(["GET"])
def company_detail(request, company_id):
    """Get detailed information for a specific company"""
    try:
        companies = read_csv_data()
        company = next(
            (company for company in companies 
             if company['company_id'] == company_id),
            None
        )
        
        if company:
            return JsonResponse(company)
        return JsonResponse({'error': 'Company not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)