@echo off
set relativepath=%~dp0
set lvwspath=%1
set uninstall=%2
start "" /W "%relativepath%NIWebServicePublisher.exe" %lvwspath% %uninstall%
if not exist "%relativepath%ServicePublisherLog.txt" exit 1
set /p error=<"%relativepath%ServicePublisherLog.txt"
exit %error%