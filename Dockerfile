# build frontend
FROM node:20 AS build-react 
WORKDIR /app 
COPY ./frontend/package*.json ./
COPY ./frontend/ .
RUN npm run build
# get build from frontend

FROM python:3.12-slim AS production
ENV RUNNING_IN_DOCKER=true
WORKDIR /app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=build-react /gui/ /app/dist
COPY ./backend/api_server.py . 

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]

# get data from backend
# cmd app 