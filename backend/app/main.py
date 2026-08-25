from fastapi import FastAPI

from app.database import Base, engine
from app.models.user import User
from app.models.task import Task


Base.metadata.create_all(bind=engine)


app = FastAPI()


@app.get("/")
def root():
    return {"message": "FocusFlow API is running"}