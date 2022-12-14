from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from backend.utils import NORMAL_CNN
from django.core.files.storage import FileSystemStorage
import os 
import numpy as np
from backend.models import userModel


model_cnn = NORMAL_CNN()

# Create your views here.
@csrf_exempt
def render_login_createAccout(request):
    return render(request,"login.html")

@csrf_exempt
def render_home(request):
    if  request.session.get("username"):
        return render(request, "index.html", {
            "username": request.session.get("username")
        })
    else:
        return HttpResponseRedirect("/")

@csrf_exempt
def authLogin(request):
    if request.method == "POST":
        username = request.POST["infor[username]"]
        password = request.POST["infor[password]"]
        logProps = userModel.objects.filter(
            username = username,
            password = password
        )
        if logProps:
            request.session["username"] = username
            return JsonResponse({
                "status": True
            })
        else:
            return JsonResponse({
                "status": False,
            })

@csrf_exempt
def create_user(request):
    if request.method == "POST":            
        userProps = userModel(username = request.POST["infor[username]"],
        email = request.POST["infor[email]"],
        password = request.POST["infor[password]"])        
        
        userProps.save()
        return HttpResponse({
            "response" : True
        })


@csrf_exempt
def predict_img(request):
    if request.method =="POST":
        image = request.FILES["image"]
        
        parentPath = os.path.dirname(__file__)
        dumps = os.listdir(parentPath + "./dumps/")
        
        if len(dumps) != 0:
            for item in dumps:
                os.remove(parentPath + f"./dumps/{item}")

        for  i in request.FILES.getlist("image"):
            fs = FileSystemStorage()
            fs.save(f"{parentPath}/dumps/test_img_{i.name}", i)

        results, PLOT_IMAGES = model_cnn.process_img()

        return render(request, "results.html", {
            "results" :  results,
            "PLOT_IMAGES"  : PLOT_IMAGES,
            "username": request.session.get("username")
        })
            

    