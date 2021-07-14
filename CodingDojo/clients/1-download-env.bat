@echo off
call 0-settings.bat

echo off
echo [44;93m
echo        +-------------------------------------------------------------------------+
echo        !                   Now we are downloading stuff...                       !
echo        +-------------------------------------------------------------------------+
echo [0m
echo on

IF "%LANGUAGE%"=="java" (
    call :jdk
)

IF "%LANGUAGE%"=="pseudo" (
    call :jdk
)

IF "%LANGUAGE%"=="java-script" (
    call :node
)

IF "%LANGUAGE%"=="go" (
    call :go
)

IF "%LANGUAGE%"=="php" (
    call :php
)

echo off
echo [44;93m
echo        +-------------------------------------+
echo        !     Now you can run 2-build.bat     !
echo        +-------------------------------------+
echo [0m
echo on

call :ask

goto :eof

:jdk
    echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !           Installing JDK            !
    echo        +-------------------------------------+
    echo [0m
    echo on

	if "%SKIP_JDK_INSTALL%"=="true" ( goto :eof )
    cd %ROOT%
    rd /S /Q %JAVA_HOME%
    powershell -command "& { set-executionpolicy remotesigned -s currentuser; [System.Net.ServicePointManager]::SecurityProtocol = 3072 -bor 768 -bor 192 -bor 48; $client=New-Object System.Net.WebClient; $client.Headers.Add([System.Net.HttpRequestHeader]::Cookie, 'oraclelicense=accept-securebackup-cookie'); $client.DownloadFile('%ARCH_JDK%','%TOOLS%\jdk.zip') }"
    %ARCH% x -y -o%TOOLS%\.. %TOOLS%\jdk.zip
    rename %TOOLS%\..\%ARCH_JDK_FOLDER% .jdk
    cd %ROOT%
goto :eof

:node
    echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !         Installing Node.js          !
    echo        +-------------------------------------+
    echo [0m
    echo on

    cd %ROOT%
    rd /S /Q %NODE_HOME%
    powershell -command "& { set-executionpolicy remotesigned -s currentuser; [System.Net.ServicePointManager]::SecurityProtocol = 3072 -bor 768 -bor 192 -bor 48; $client=New-Object System.Net.WebClient; $client.Headers.Add([System.Net.HttpRequestHeader]::Cookie, 'oraclelicense=accept-securebackup-cookie'); $client.DownloadFile('%ARCH_NODE%','%TOOLS%\node.zip') }"
    %ARCH% x -y -o%TOOLS%\.. %TOOLS%\node.zip
    rename %TOOLS%\..\%ARCH_NODE_FOLDER% .node
    cd %ROOT%
goto :eof

:go
    echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !            Installing Go            !
    echo        +-------------------------------------+
    echo [0m
    echo on

    cd %ROOT%
    rd /S /Q %TOOLS%\..\.golang
    powershell -command "& { set-executionpolicy remotesigned -s currentuser; [System.Net.ServicePointManager]::SecurityProtocol = 3072 -bor 768 -bor 192 -bor 48; $client=New-Object System.Net.WebClient; $client.Headers.Add([System.Net.HttpRequestHeader]::Cookie, 'oraclelicense=accept-securebackup-cookie'); $client.DownloadFile('%ARCH_GO%','%TOOLS%\go.zip') }"
    %ARCH% x -y -o%TOOLS%\..\.golang %TOOLS%\go.zip
    cd %ROOT%
goto :eof

:php
    @echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !            Installing PHP           !
    echo        +-------------------------------------+
    echo [0m
    echo on

    cd %ROOT%
    rd /S /Q %PHP_HOME%
    @echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !        Downloading PHP.zip          !
    echo        +-------------------------------------+
    echo [0m
    echo on

    IF EXIST %TOOLS%\php.zip (
        ECHO php.zip already loaded
    ) ELSE (
    powershell -command "& { set-executionpolicy remotesigned -s currentuser; [System.Net.ServicePointManager]::SecurityProtocol = 3072 -bor 768 -bor 192 -bor 48; $client=New-Object System.Net.WebClient; $client.Headers['User-Agent']='PoweShell script';  $client.DownloadFile('%ARCH_PHP%','%TOOLS%\php.zip') }"
    )
    %ARCH% x -y %TOOLS%\php.zip -o%PHP_HOME% 
    xcopy /y %TOOLS%\php.ini %PHP_HOME%\

    @echo off
    echo [44;93m
    echo        +-------------------------------------+
    echo        !      Downloading composer.phar      !
    echo        +-------------------------------------+
    echo [0m
    echo on

    powershell -command "& { set-executionpolicy remotesigned -s currentuser; [System.Net.ServicePointManager]::SecurityProtocol = 3072 -bor 768 -bor 192 -bor 48; $client=New-Object System.Net.WebClient; $client.Headers['User-Agent']='PoweShell script';  $client.DownloadFile('%ARCH_PHP_COMPOSER%','%PHP_CLIENT_HOME%\composer.phar') }"

    cd %ROOT%
goto :eof

:ask
    @echo off
    echo Press any key to continue

    pause >nul
goto :eof
