; Установщик для Calculator App
; Автор: [RatniyAndreevaCompany]

Unicode true
Name "Calculator"
Caption "Установка Calculator"
BrandingText "Calculator v1.0"

!define VERSION "1.0.0"
!define APPNAME "Calculator"
!define COMPANYNAME "[RatniyAndreevaCompany]"
!define DESCRIPTION "Простой и мощный калькулятор с научными функциями"
!define MAINFILE "calculator.html"
!define ICONFILE "calculator.ico"

; Настройки сжатия
SetCompressor /SOLID lzma
SetCompressorDictSize 32

; Выходной файл
OutFile "Calculator-Setup-${VERSION}.exe"

; Директория установки
InstallDir "$PROGRAMFILES\${APPNAME}"
InstallDirRegKey HKLM "Software\${APPNAME}" "Install_Dir"

; Запрашиваем права администратора
RequestExecutionLevel admin

; Современный интерфейс
!include "MUI2.nsh"

; Настройки интерфейса
!define MUI_ICON "${ICONFILE}"
!define MUI_UNICON "${ICONFILE}"
!define MUI_ABORTWARNING


; Страницы установщика
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; Страницы деинсталлятора
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

; Языки
!insertmacro MUI_LANGUAGE "Russian"

; ==================== СЕКЦИЯ УСТАНОВКИ ====================
Section "Calculator"
  SectionIn RO
  
  ; Устанавливаем файлы
  SetOutPath "$INSTDIR"
  
  ; Основные файлы калькулятора
  File "${MAINFILE}"
  File "style.css"
  File "script.js"
  File "${ICONFILE}"
  File "LICENSE.txt"
  File "README.md"
  
  ; Создаем ярлыки
  CreateDirectory "$SMPROGRAMS\${APPNAME}"
  CreateShortCut "$SMPROGRAMS\${APPNAME}\Calculator.lnk" "$INSTDIR\${MAINFILE}" "" "$INSTDIR\${ICONFILE}" 0
  CreateShortCut "$DESKTOP\Calculator.lnk" "$INSTDIR\${MAINFILE}" "" "$INSTDIR\${ICONFILE}" 0
  
  ; Создаем ярлык для запуска от администратора
  CreateShortCut "$SMPROGRAMS\${APPNAME}\Calculator (Admin).lnk" "$INSTDIR\${MAINFILE}" "" "$INSTDIR\${ICONFILE}" 0
  ; Это для демонстрации, на самом деле HTML файлы не требуют админ прав
  
  ; Записываем информацию в реестр для деинсталляции
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayName" "${APPNAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "Publisher" "${COMPANYNAME}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "URLInfoAbout" "https://github.com/lladrvvne/Calculator"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "DisplayIcon" "$INSTDIR\${ICONFILE}"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "InstallLocation" "$INSTDIR"
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoModify" 1
  WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "NoRepair" 1
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "Comments" "${DESCRIPTION}"
  
  ; Создаем деинсталлятор
  WriteUninstaller "$INSTDIR\uninstall.exe"
  
  ; Создаем файл с версией
  FileOpen $0 "$INSTDIR\version.txt" w
  FileWrite $0 "${APPNAME} v${VERSION}$\r$\n"
  FileWrite $0 "Установлено: $INSTDIR$\r$\n"
  FileWrite $0 "Дата установки: "
  Call GetCurrentDate
  Pop $1
  FileWrite $0 "$1$\r$\n"
  FileClose $0
  
SectionEnd

; ==================== СЕКЦИЯ ДЕИНСТАЛЛЯЦИИ ====================
Section "Uninstall"
  
  ; Удаляем файлы
  Delete "$INSTDIR\*.*"
  RMDir /r "$INSTDIR"
  
  ; Удаляем ярлыки
  Delete "$SMPROGRAMS\${APPNAME}\*.*"
  RMDir "$SMPROGRAMS\${APPNAME}"
  Delete "$DESKTOP\Calculator.lnk"
  
  ; Удаляем записи из реестра
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}"
  DeleteRegKey HKLM "Software\${APPNAME}"
  
SectionEnd

; ==================== ФУНКЦИИ ====================
Function GetCurrentDate
  ; Получаем текущую дату в формате ДД.ММ.ГГГГ
  System::Call '*(&i2, &i2, &i2, &i2, &i2, &i2, &i2, &i2) i .r0'
  System::Call 'kernel32::GetLocalTime(i) i(r0)'
  System::Call '*$0(&i2 .r1, &i2 .r2, &i2, &i2 .r3, &i2 .r4, &i2 .r5, &i2, &i2)'
  System::Free $0
  
  ; Форматируем дату
  IntFmt $1 "%02u" $1  ; день
  IntFmt $2 "%02u" $2  ; месяц
  IntFmt $3 "%04u" $3  ; год
  
  StrCpy $0 "$1.$2.$3"
  Push $0
FunctionEnd

Function .onInit
  ; Проверяем, не установлен ли уже калькулятор
  ReadRegStr $R0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${APPNAME}" "UninstallString"
  StrCmp $R0 "" done
  
  ; Если установлен, спрашиваем
  MessageBox MB_OKCANCEL|MB_ICONEXCLAMATION \
    "${APPNAME} уже установлен. $\n$\nНажмите OK для переустановки или Cancel для отмены." \
    IDOK uninst
  Abort
  
  uninst:
    ; Удаляем старую версию
    ExecWait '"$R0" /S _?=$INSTDIR'
  
  done:
FunctionEnd