from rest_framework import serializers
from .models import *
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from vendor.serializers import VendoeSerializer
from authmanagement.serializers import UserSerializer
from stockinventory.serializers import *
User = get_user_model()
# Serializers define the API representation.


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ('image',)


class ProductsSerializer(serializers.ModelSerializer):
    vendor = VendoeSerializer
    images = ImagesSerializer(many=True)

    class Meta:
        model = Products
        fields = '__all__'
        depth = 2


class ReviewsSerializer(serializers.ModelSerializer):
    user = UserSerializer

    class Meta:
        model = Review
        fields = ('text', 'rating', 'user')
        depth = 1


class SubCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    Subcategories = SubCategoriesSerializer(many=True, required=False)

    class Meta:
        model = Category
        fields = '__all__'
        depth = 1


class MainCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCategory
        fields = '__all__'
        depth = 2


class productSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = '__all__'

class productColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = '__all__'


class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = '__all__'
        depth = 2
