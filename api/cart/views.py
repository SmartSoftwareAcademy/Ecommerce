from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Cart
from .serializers import CartSerializer
from product.models import ProductSize, ProductColor

class CartList(APIView):
    def get(self, request):
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['product']=request.data['product']['id']
        serializer = CartSerializer(data=request.data)
        print(serializer.validated_data)
        if serializer.is_valid():
            product = serializer.validated_data['product']
            size = serializer.validated_data.get('size')
            price = serializer.validated_data.get('price')
            color = serializer.validated_data.get('color')

            # Check if the same product, size, and color already exist in the cart
            existing_cart_entry = Cart.objects.filter(
                customer=serializer.validated_data['user'],
                product=product.id,
                size=size.id if size else None,
                color=color.id if color else None
            ).first()

            if existing_cart_entry:
                # Update the existing cart entry with the new quantity
                existing_cart_entry.quantity += serializer.validated_data['quantity']
                existing_cart_entry.item_subtotal = existing_cart_entry.quantity * price
                existing_cart_entry.item_total = existing_cart_entry.item_subtotal + existing_cart_entry.tax
                existing_cart_entry.save()
                message="Item quantity updated successfully!"
                return Response({"message":message}, status=status.HTTP_200_OK)
            else:
                # Create a new cart entry
                serializer.save()
                message="Item added to cart successfully!"
                return Response({"message":message}, status=status.HTTP_201_CREATED)
        return Response({"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CartDetail(APIView):
    def get_object(self, pk):
        try:
            return Cart.objects.get(pk=pk)
        except Cart.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        cart = self.get_object(pk)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request, pk):
        cart = self.get_object(pk)
        serializer = CartSerializer(cart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cart = self.get_object(pk)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
