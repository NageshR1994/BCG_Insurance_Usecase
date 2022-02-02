from turtle import pd
from fastapi import APIRouter, Depends, status, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from routers.schemas import InsuranceDisplay,InsuranceUpdate,GraphDisplay,RegionDisplay
from db.database import get_db
from db import db_insurance
from typing import List, Optional
import pandas as pd
from db.models import Insurance

'''
This page is to define urls/path/routes
'''

router = APIRouter(
  prefix='/insurance',
  tags=['insurance']
)
#for CRUD operations on insurance model
@router.get('/all', response_model=List[InsuranceDisplay])
def allPolicies(db: Session = Depends(get_db)):
  return db_insurance.get_all(db)

@router.get('/search/{search_value}',response_model=List[InsuranceDisplay])
async def search(search_value: int, db: Session = Depends(get_db)):
  return db_insurance.search(db, search_value)

@router.post('/upload_csv/')
async def uploadCSV(csv_file: UploadFile=File(...), db: Session = Depends(get_db)):
  df = pd.read_csv(csv_file.file)
  return db_insurance.insert_to_db(df,db)

@router.put('/update/{policy_id}')
async def updateInsurance(policy_id: int,row: InsuranceUpdate, db: Session = Depends(get_db)):
  return db_insurance.update(db, policy_id,row)

@router.get('/regions',response_model=List[RegionDisplay])
def allPolicies(db: Session = Depends(get_db)):
  return db_insurance.get_regions(db)

#for insurance analytics
@router.get('/graph')
def allPolicies(db: Session = Depends(get_db)):
  return db_insurance.get_by_count(db)

@router.get('/graph/{region}')
def allPolicies(region: str,db: Session = Depends(get_db)):
  return db_insurance.get_by_region(db,region)
