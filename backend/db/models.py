from sqlalchemy.sql.schema import ForeignKey
from .database import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

'''
This page is to define models(tables)
'''

#isurance model
class Insurance(Base):
  __tablename__ = 'insurance'
  id = Column(Integer, primary_key=True, index=True)
  policy_id	= Column(Integer)
  date_of_purchase	= Column(DateTime)
  customer_id = Column(Integer)	
  fuel = Column(String)	
  vehicle_segment = Column(String)	
  premium	= Column(Integer)
  bodily_injury_liability	= Column(Integer) 
  personal_injury_protection= Column(Integer)	 
  property_damage_liability	 = Column(Integer)
  collision	 = Column(Integer)
  comprehensive	= Column(Integer)
  customer_gender	= Column(String)
  customer_income_group	= Column(String)
  customer_region	= Column(String)
  customer_marital_status= Column(Integer)