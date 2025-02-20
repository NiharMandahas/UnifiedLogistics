from django.db import models

class CompanyDetails(models.Model):
    Company_ID = models.CharField(max_length=255, primary_key=True)
    Name = models.CharField(max_length=255)
    Rating = models.FloatField()
    TypeOfDelivery = models.CharField(max_length=255)
    ModeOfDelivery = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'CompanyDetails'

class CustomerDetails(models.Model):
    customer_id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    pincode = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'CustomerDetails'

class ExpectsFrom(models.Model):
    customer = models.ForeignKey(CustomerDetails, on_delete=models.CASCADE)
    company = models.ForeignKey(CompanyDetails, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'ExpectsFrom'

class Vehicle(models.Model):
    vehicle_id = models.CharField(max_length=255, primary_key=True)
    driver_name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'Vehicle'

class Warehouse(models.Model):
    warehouse_id = models.CharField(max_length=255, primary_key=True)
    capacity = models.IntegerField()
    current_inventory = models.IntegerField()
    status = models.CharField(max_length=255)
    address = models.CharField(max_length=355)

    class Meta:
        managed = False
        db_table = 'Warehouse'

class Orders(models.Model):
    order_id = models.CharField(max_length=50, primary_key=True)
    product_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    estimated_time = models.IntegerField()
    status = models.CharField(max_length=50)
    returned = models.CharField(max_length=6)
    company = models.ForeignKey(CompanyDetails, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'Orders'

class ProductDetails(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    dimensions_cm = models.CharField(max_length=50)
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ProductDetails'
        unique_together = ('order', 'product_name')