from django.contrib import admin
from django.urls import path
from . import views as vs

urlpatterns = [
    path("", vs.render_login_createAccout),
    path("home/", vs.render_home),
    path("predict/image/", vs.predict_img),
    path("create/user/algo/", vs.create_user),
    path("user/login/algo", vs.authLogin)


]