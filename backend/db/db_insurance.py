from fastapi import HTTPException, status
from routers.schemas import *
from sqlalchemy.orm.session import Session
from db.models import Insurance
from datetime import datetime
from sqlalchemy import func,or_

'''
This page is to query the database using ORM
'''

#to get all the insurance policies
def get_all(db: Session):
    return db.query(Insurance).all()

#to search insurance policies by policy number or customer number
def search(db: Session, search_value: int):
    return db.query(Insurance).filter(or_(Insurance.policy_id == search_value,Insurance.customer_id == search_value)).all()

#to upload csv to DB
def insert_to_db(df,db):
    for index,row in df.iterrows():
        date_time_str = row.Date_of_Purchase+" 00:00:00.0000"
        date_time_obj = datetime.strptime(date_time_str, '%m/%d/%Y %H:%M:%S.%f')
        new_policy = Insurance(
            policy_id= row.Policy_id,
            date_of_purchase= date_time_obj,
            customer_id= row.Customer_id,
            fuel= row.Fuel,
            vehicle_segment= row.VEHICLE_SEGMENT,
            premium= row.Premium,
            bodily_injury_liability= row.bodily_injury_liability,
            personal_injury_protection= row.personal_injury_protection,
            property_damage_liability= row.property_damage_liability,
            collision= row.collision,
            comprehensive= row.comprehensive,
            customer_gender= row.Customer_Gender,
            customer_income_group= row.Customer_Income_group,
            customer_region= row.Customer_Region,
            customer_marital_status= row.Customer_Marital_status
        )
        db.add(new_policy)
    db.commit()

#to update premium
def update(db: Session, policy_id: int, row:InsuranceUpdate):
  if row.premium > 1000000:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
    detail=f'premimum is crossing 1M')
  update_policy = {
    "premium": row.premium
  }
  print(update_policy)
  edit = db.query(Insurance).filter(Insurance.policy_id == policy_id).update(update_policy)
  db.commit()
  return "ok"

#for analytics
def get_by_count(db: Session):
    list1 = db.execute("SELECT strftime('%Y-%m',datetime(date_of_purchase)) as policy_date, count(date_of_purchase) as count FROM Insurance group by strftime('%Y-%m',datetime(date_of_purchase))")
    mainlist = []
    for i in list1:
        mainlist.append({"policy_date":i.policy_date,"count":i.count})
    return mainlist
  
def get_by_region(db: Session,region:str):
    #SELECT strftime('%Y-%m',datetime(date_of_purchase)) as policy_date, count(date_of_purchase) as count FROM Insurance WHERE customer_region='North' group by strftime('%Y-%m',datetime(date_of_purchase))
    if region:
        print(region)
        list1 = db.execute(f"SELECT strftime('%Y-%m',datetime(date_of_purchase)) as policy_date, count(date_of_purchase) as count FROM Insurance WHERE customer_region='{region}' group by strftime('%Y-%m',datetime(date_of_purchase))")
    else:
        list1 = db.execute("SELECT strftime('%Y-%m',datetime(date_of_purchase)) as policy_date, count(date_of_purchase) as count FROM Insurance group by strftime('%Y-%m',datetime(date_of_purchase))")
    mainlist = []
    for i in list1:
        mainlist.append({"policy_date":i.policy_date,"count":i.count})
    return mainlist
  
def get_regions(db: Session):
    return db.query(Insurance.customer_region).distinct()
    