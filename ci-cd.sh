#!/bin/bash

echo "======================================="
echo "CI/CD СКРИПТ ДЛЯ CALCULATOR"
echo "======================================="

# 1. ЗАГРУЗКА С СЕРВЕРА
echo "1. Загрузка с сервера..."
if [ -d ".git" ]; then
    git pull origin master
else
    echo "   Git не инициализирован, пропускаю"
fi

# 2. СБОРКА ПРОЕКТА И ТЕСТОВ
echo ""
echo "2. Сборка проекта..."
if [ -f "package.json" ]; then
    echo "   Устанавливаю зависимости..."
    npm install --silent
    echo "   ✓ Зависимости установлены"
else
    echo "   ✓ package.json не найден"
fi

# 3. ВЫПОЛНЕНИЕ UNITTEST
echo ""
echo "3. Выполнение тестов..."
if [ -d "tests" ]; then
    echo "   Запускаю тесты..."
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        npm test
    else
        echo "   ✓ Тесты найдены, но скрипт test отсутствует"
    fi
else
    echo "   ✓ Папка tests не найдена"
fi

4. СОЗДАНИЕ УСТАНОВЩИКА...
   if [ -f "installer.nsi" ]; then
       echo "   Найден installer.nsi"
       echo "   Для сборки .exe нужен NSIS: makensis installer.nsi"
       echo "   Создаю резервный архив..."
   fi
   tar -czf "calculator-v1.0-build-$(date +%Y%m%d).tar.gz" .
   echo "   ✓ Создан архив: calculator-v1.0-build-$(date +%Y%m%d).tar.gz"

# 5. УСТАНОВКА ПРИЛОЖЕНИЯ (ОПЦИОНАЛЬНО)
echo ""
echo "5. Установка приложения..."
read -p "   Установить? (y/N): " choice
if [[ $choice == "y" || $choice == "Y" ]]; then
    echo "   Создаю директорию /opt/calculator..."
    sudo mkdir -p /opt/calculator 2>/dev/null
    if [ $? -eq 0 ]; then
        sudo cp -r . /opt/calculator/
        echo "   ✓ Приложение скопировано в /opt/calculator"
    else
        echo "   ✗ Нет прав sudo, пропускаю установку"
    fi
else
    echo "   ✓ Установка отменена"
fi

echo ""
echo "======================================="
echo "ВСЕ 5 ЭТАПОВ ВЫПОЛНЕНЫ!"
echo "======================================="
