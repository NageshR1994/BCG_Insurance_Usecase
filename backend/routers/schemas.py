from itertools import count
from pydantic import BaseModel
from datetime import date, datetime

'''
This page is used to serialize/deserialze querysets
'''

class InsuranceBase(BaseModel):
    policy_id:int
    customer_id:int
    fuel:str	
    vehicle_segment:str	
    premium:int
    bodily_injury_liability:int 
    personal_injury_protection:int	 
    property_damage_liability:int
    collision:int
    comprehensive:int
    customer_gender:str
    customer_income_group:str
    customer_region:str
    customer_marital_status:int
    
class GraphDisplay(BaseModel):
    policy_date:date
    count:int
    
class RegionDisplay(BaseModel):
    region: str
    
class RegionDisplay(BaseModel):
    policy_date:date
    region: str
    count:int
    
class InsuranceUpdate(BaseModel):
    premium:int

class InsuranceDisplay(BaseModel):
    policy_id:int
    date_of_purchase:date
    customer_id:int
    fuel:str	
    vehicle_segment:str	
    premium:int
    bodily_injury_liability:int 
    personal_injury_protection:int	 
    property_damage_liability:int
    collision:int
    comprehensive:int
    customer_gender:str
    customer_income_group:str
    customer_region:str
    customer_marital_status:int
    class Config():
        orm_mode = True