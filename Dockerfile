FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY backend/ ./backend/

ENV PYTHONPATH=/app/backend

# Default command to run tests
CMD ["python", "-m", "unittest", "discover", "backend/tests"]
