#!/bin/bash
echo "🔹 Створюємо необхідні директорії..."

# Паралельні маршрути для нотаток з модалкою
mkdir -p app/@modal
mkdir -p app/@modal/(.)notes/[id]

# Деталі нотатки
mkdir -p app/notes/[id]

# Фільтрація нотаток
mkdir -p app/notes/filter/[...slug]
mkdir -p app/notes/filter/@sidebar

# Створення нотатки
mkdir -p app/notes/action/create

echo "✅ Директорії створені."
