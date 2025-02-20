from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.utils import timezone
from .models import User
from .serializers import RegisterSerializer, LoginSerializer

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully",
            "email": user.email,
            "id": str(user.id)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                
                if user.check_password(serializer.validated_data['password']):
                    user.last_login = timezone.now()
                    user.save()
                    
                    return Response({
                        'message': 'Login successful',
                        'user': {
                            'id': str(user.id),
                            'email': user.email,
                            'name': user.name
                        }
                    }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                pass
            
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
