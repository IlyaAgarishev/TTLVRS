FROM python:alpine

WORKDIR /app

RUN apk add build-base

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
CMD [ "python", "./main.py" ]

ENV PORT 8080
EXPOSE 8080
