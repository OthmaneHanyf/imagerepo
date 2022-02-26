from rest_framework import decorators, response, status

from main.models import Photo
from main.serializers import PhotoSerializer

@decorators.api_view(['GET'])
def get_photos(request):
    try :
            
        ps = Photo.objects.all()

        serializer = PhotoSerializer(ps, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

@decorators.api_view(['POST'])
def upload_photo(request):
    try :
            
        Photo.objects.create(
            image=request.FILES.get('image'),
        )

        return response.Response(status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)