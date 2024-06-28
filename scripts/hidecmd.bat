@echo off

set script_dir=%~dp0
set src_dir=%script_dir%..\webview
set build_dir=%script_dir%..\build

echo Looking for vswhere.exe...
set "vswhere=%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe"
if not exist "%vswhere%" set "vswhere=%ProgramFiles%\Microsoft Visual Studio\Installer\vswhere.exe"
if not exist "%vswhere%" (
	echo ERROR: Failed to find vswhere.exe
	exit /b 1
)
echo Found %vswhere%

echo Looking for VC...
for /f "usebackq tokens=*" %%i in (`"%vswhere%" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath`) do (
  set vc_dir=%%i
)
if not exist "%vc_dir%\Common7\Tools\vsdevcmd.bat" (
	echo ERROR: Failed to find VC tools x86/x64
	exit /b 1
)
echo Found %vc_dir%

"%vc_dir%\VC\Tools\MSVC\14.40.33807\bin\Hostx64\x64\editbin.exe" /subsystem:windows %1