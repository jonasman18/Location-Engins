from rest_framework import serializers

from .models import Utilisateur

class UtilisateurSerializer(serializers.ModelSerializer):

    class Meta:

        model = Utilisateur

        fields = '__all__'

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