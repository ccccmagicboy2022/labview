; CLW file contains information for the MFC ClassWizard

[General Info]
Version=1
LastClass=CAboutDlg
LastTemplate=CDialog
NewFileInclude1=#include "stdafx.h"
NewFileInclude2=#include "dll_tester.h"

ClassCount=3
Class1=CDll_testerApp
Class2=CDll_testerDlg
Class3=CAboutDlg

ResourceCount=4
Resource1=IDD_ABOUTBOX
Resource2=IDR_MAINFRAME
Resource3=IDD_DLL_TESTER_DIALOG
Resource4=IDR_MENU1

[CLS:CDll_testerApp]
Type=0
HeaderFile=dll_tester.h
ImplementationFile=dll_tester.cpp
Filter=D
BaseClass=CWinApp
VirtualFilter=AC

[CLS:CDll_testerDlg]
Type=0
HeaderFile=dll_testerDlg.h
ImplementationFile=dll_testerDlg.cpp
Filter=D
BaseClass=CDialog
VirtualFilter=dWC
LastObject=ID_MENU_ABOUT

[CLS:CAboutDlg]
Type=0
HeaderFile=dll_testerDlg.h
ImplementationFile=dll_testerDlg.cpp
Filter=D
BaseClass=CDialog
VirtualFilter=dWC
LastObject=CAboutDlg

[DLG:IDD_ABOUTBOX]
Type=1
Class=CAboutDlg
ControlCount=4
Control1=IDC_STATIC,static,1342177283
Control2=IDC_STATIC_VER,static,1342308480
Control3=IDC_STATIC_HOMEPAGE,static,1342308352
Control4=IDOK,button,1342373889

[DLG:IDD_DLL_TESTER_DIALOG]
Type=1
Class=CDll_testerDlg
ControlCount=3
Control1=IDC_BN_OPEN,button,1342242817
Control2=IDC_EDIT_FILE,edit,1352728708
Control3=IDC_BN_EMBEDED_WIN,button,1342242816

[MNU:IDR_MENU1]
Type=1
Class=?
Command1=ID_MENU_ABOUT
CommandCount=1

