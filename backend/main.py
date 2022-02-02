from fastapi import FastAPI
from os import name
from db import models
from db.database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import insurance

app = FastAPI()

@app.get("/")
def root():
  return "Hello world!"

app.include_router(insurance.router)


origins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*']
)


models.Base.metadata.create_all(engine)
