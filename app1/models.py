from django.db import models

class model1(models.Model):
    city = models.CharField(verbose_name="city name", max_length=50)
    lat = models.CharField(verbose_name="latitude", max_length=50)
    lng = models.CharField(verbose_name="longitude", max_length=50)
    country = models.CharField(verbose_name="country name",default="India",editable=False, max_length=50)
    iso2 = models.CharField(verbose_name="iso2", default="IN",editable=False, max_length=50)
    admin = models.CharField(verbose_name="admin name", max_length=50)
    capital = models.CharField(verbose_name="capital name",null=True ,max_length=50)
    population = models.IntegerField(verbose_name="population",null=True)
    population_proper = models.IntegerField(verbose_name="population proper",null=True)

    def __str__(self):
        return self.city

    class Meta:
        ordering = ["city"]
        verbose_name_plural = "App1"


