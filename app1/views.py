from django.shortcuts import render
from django.http import HttpResponse,HttpResponseBadRequest,JsonResponse
from .forms import UploadFileForm
import pandas as pd
from jfuk import settings
from sqlalchemy import create_engine
from django.views import View
from .models import model1

def index(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            # form.save()
            df=request.FILES['file']
            df=pd.read_excel(df)
            # df=df[df.columns]
            # data=data.decode()
            print(df.columns)
            user = settings.DATABASES['default']['USER']
            password = settings.DATABASES['default']['PASSWORD']
            database_name = settings.DATABASES['default']['NAME']

            database_url = 'postgresql://{user}:{password}@localhost:5432/{database_name}'.format(
                user=user,
                password=password,
                database_name=database_name,
            )
            engine = create_engine(database_url, echo=False)
            df.to_sql("app1_model1", con=engine, if_exists='append',index=False)
            # request.FILES['file'].save_to_database(
            #     model=model1,
            #     mapdict=["city","lat","lng","country","iso2","admin","capital","population","population_proper"],)
            return HttpResponse("OK")
        else:
            return HttpResponseBadRequest()
    else:
        # form=UploadFileForm()
        return render(request, 'app1/uploadform.html', {})

# def save_to_database(file,model,mapdict):
#     a=file.read()

class mapView(View):
    template='app1/maps.html'
    context={}

    def get(self,request):
        return render(request,self.template,self.context)

def mapapi(request,search):
    model=model1
    # print(type(search),type(request))
    data=model.objects.all()
    # search=search.lower()
    searches=[search[i] for i in range(1,len(search))]
    data=data.filter(city__istartswith=search[0])
    for string in searches:
        data=data.filter(city__icontains=string)
    # data=list(model.objects.filter(city__icontains__in=[search[0],search[1],search[2]]).values())
    data=list(data.values())[:7]
    # print(data)
    return JsonResponse(data,safe=False)