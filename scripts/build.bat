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

:: 4100: unreferenced formal parameter
set warning_params=/W4 /wd4100

call "%vc_dir%\Common7\Tools\vsdevcmd.bat" -arch=x64 -host_arch=x64
echo Building libwebview.dll...
cl %warning_params% ^
	/D "WEBVIEW_API=__declspec(dllexport)" ^
	/I "%script_dir%\..\Microsoft.Web.WebView2\build\native\include" ^
	"%script_dir%\..\Microsoft.Web.WebView2\build\native\x64\WebView2Loader.dll.lib" ^
	/std:c++17 /EHsc ^
	"%src_dir%\webview.cc" /link /DLL "/OUT:%build_dir%\libwebview.dll" || exit \b