from rest_framework import serializers

from .models import Utilisateur

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)


# =========================================================
# USER SERIALIZER
# =========================================================

class UtilisateurSerializer(serializers.ModelSerializer):

    class Meta:

        model = Utilisateur

        fields = '__all__'


# =========================================================
# REGISTER SERIALIZER
# =========================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = Utilisateur

        fields = [
            'id',
            'nom',
            'email',
            'telephone',
            'adresse',
            'password',
        ]

    def create(self, validated_data):

        password = validated_data.pop('password')

        user = Utilisateur(**validated_data)

        user.set_password(password)

        user.role = 'client'

        user.save()

        return user


# =========================================================
# LOGIN SERIALIZER JWT
# =========================================================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token['role'] = user.role
        token['email'] = user.email

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        data['role'] = self.user.role
        data['email'] = self.user.email
        data['nom'] = self.user.nom

        return data