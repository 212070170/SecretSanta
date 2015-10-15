for /f "tokens=* delims=" %%i in ('dir /s /b /a:d *git') do (
rd /s /q "%%i"
)                     