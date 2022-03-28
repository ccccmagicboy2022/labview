// dll_testerDlg.cpp : implementation file
//

#include "stdafx.h"
#include "dll_tester.h"
#include "dll_testerDlg.h"
#include "..\vi_launcher_v7.h"
#include "VersionInfo.h"
#include "HyperLink.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#undef THIS_FILE
static char THIS_FILE[] = __FILE__;
#endif

#define IDS_MAILADDR	_T("http://ccccmagicboy.f3322.org:100/?page_id=1832")

/////////////////////////////////////////////////////////////////////////////
// CAboutDlg dialog used for App About

class CAboutDlg : public CDialog
{
public:
	CAboutDlg();

// Dialog Data
	//{{AFX_DATA(CAboutDlg)
	enum { IDD = IDD_ABOUTBOX };
	CStatic	m_ver;
	CHyperLink	m_homepage;
	//}}AFX_DATA

	// ClassWizard generated virtual function overrides
	//{{AFX_VIRTUAL(CAboutDlg)
	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support
	//}}AFX_VIRTUAL

// Implementation
protected:
	//{{AFX_MSG(CAboutDlg)
	virtual BOOL OnInitDialog();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

CAboutDlg::CAboutDlg() : CDialog(CAboutDlg::IDD)
{
	//{{AFX_DATA_INIT(CAboutDlg)
	//}}AFX_DATA_INIT
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialog::DoDataExchange(pDX);
	//{{AFX_DATA_MAP(CAboutDlg)
	DDX_Control(pDX, IDC_STATIC_VER, m_ver);
	DDX_Control(pDX, IDC_STATIC_HOMEPAGE, m_homepage);
	//}}AFX_DATA_MAP
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialog)
	//{{AFX_MSG_MAP(CAboutDlg)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()

/////////////////////////////////////////////////////////////////////////////
// CDll_testerDlg dialog

CDll_testerDlg::CDll_testerDlg(CWnd* pParent /*=NULL*/)
	: CDialog(CDll_testerDlg::IDD, pParent)
{
	//{{AFX_DATA_INIT(CDll_testerDlg)
		// NOTE: the ClassWizard will add member initialization here
	//}}AFX_DATA_INIT
	// Note that LoadIcon does not require a subsequent DestroyIcon in Win32
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}

void CDll_testerDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialog::DoDataExchange(pDX);
	//{{AFX_DATA_MAP(CDll_testerDlg)
	DDX_Control(pDX, IDC_EDIT_FILE, m_edit_file);
	//}}AFX_DATA_MAP
}

BEGIN_MESSAGE_MAP(CDll_testerDlg, CDialog)
	//{{AFX_MSG_MAP(CDll_testerDlg)
	ON_WM_SYSCOMMAND()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
	ON_BN_CLICKED(IDC_BN_OPEN, OnBnOpen)
	ON_COMMAND(ID_MENU_ABOUT, OnMenuAbout)
	ON_BN_CLICKED(IDC_BN_EMBEDED_WIN, OnBnEmbededWin)
	ON_WM_SIZE()
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()

/////////////////////////////////////////////////////////////////////////////
// CDll_testerDlg message handlers

BOOL CDll_testerDlg::OnInitDialog()
{
	CDialog::OnInitDialog();

	// Add "About..." menu item to system menu.

	// IDM_ABOUTBOX must be in the system command range.
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != NULL)
	{
		CString strAboutMenu;
		strAboutMenu.LoadString(IDS_ABOUTBOX);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}

	// Set the icon for this dialog.  The framework does this automatically
	//  when the application's main window is not a dialog
	SetIcon(m_hIcon, TRUE);			// Set big icon
	SetIcon(m_hIcon, FALSE);		// Set small icon
	
	// TODO: Add extra initialization here
	CString temp;
	temp = "c:\\path\\to\\vi\\v7.vi";
	m_edit_file.SetWindowText(temp);
	
	return TRUE;  // return TRUE  unless you set the focus to a control
}

void CDll_testerDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		CDialog::OnSysCommand(nID, lParam);
	}
}

// If you add a minimize button to your dialog, you will need the code below
//  to draw the icon.  For MFC applications using the document/view model,
//  this is automatically done for you by the framework.

void CDll_testerDlg::OnPaint() 
{
	if (IsIconic())
	{
		CPaintDC dc(this); // device context for painting

		SendMessage(WM_ICONERASEBKGND, (WPARAM) dc.GetSafeHdc(), 0);

		// Center icon in client rectangle
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// Draw the icon
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CRect rect;
		GetClientRect(&rect);
		::SetWindowPos(hParentWnd,NULL, 0,100,rect.Width(),rect.Height()-100,NULL);
		CDialog::OnPaint();
	}
}

// The system calls this to obtain the cursor to display while the user drags
//  the minimized window.
HCURSOR CDll_testerDlg::OnQueryDragIcon()
{
	return (HCURSOR) m_hIcon;
}

void CDll_testerDlg::OnBnOpen() 
{
	// TODO: Add your control notification handler code here
	CString temp;

	m_edit_file.GetWindowText(temp);

	strcpy(m_file_name, temp.GetBuffer(temp.GetLength()));

	strcpy(m_password, "");

	long result = Vi_launcher_v7(m_file_name, m_password);

	if (0 == result)
	{
		AfxMessageBox("error in dll");
	}
}

void CDll_testerDlg::WinHelp(DWORD dwData, UINT nCmd) 
{
	OnMenuAbout();
}

void CDll_testerDlg::OnMenuAbout() 
{
	CAboutDlg	dlg;
	dlg.DoModal();
}

BOOL CAboutDlg::OnInitDialog() 
{
	CDialog::OnInitDialog();
	
	CVersionInfo	ver;
	CString version;
	
	ver.GetVersionInfo(AfxGetInstanceHandle());
	
#ifdef _DEBUG
	version	=	_T("debug: v") + ver.m_strFixedProductVersion;
#else
	version	=	_T("release: v") + ver.m_strFixedProductVersion;
#endif
	
	version.Replace(',', '.');	
	m_ver.SetWindowText(version);
	
	m_homepage.SetWindowText(_T("主页"));
	m_homepage.SetURL(IDS_MAILADDR);
	m_homepage.SetUnderline(CHyperLink::ulAlways);
	
	return TRUE;  // return TRUE unless you set the focus to a control
	              // EXCEPTION: OCX Property Pages should return FALSE
}

void CDll_testerDlg::OnBnEmbededWin() 
{
	//hParentWnd  = ::FindWindow(_T("LVDChild"),_T("试验"));
	hParentWnd  = ::FindWindow(_T("LVDChild"), NULL);	//指所有LV的窗体
	::SetWindowPos(hParentWnd, NULL, 0,0,0,0,SWP_NOMOVE|SWP_NOZORDER|SWP_NOSIZE|SWP_FRAMECHANGED);
	LONG style = ::GetWindowLong(hParentWnd, GWL_STYLE);
	style |= WS_CHILD;
    style &= ~WS_CAPTION;
	style &= ~WS_THICKFRAME;
	style &= ~WS_CLIPSIBLINGS;
	style &= ~WS_POPUP;
	style &= ~DS_MODALFRAME;
    style &= ~DS_SETFOREGROUND;
	style &= ~WS_MINIMIZEBOX;
	style &= ~WS_MAXIMIZEBOX;
	style &= ~WS_SYSMENU;
	style &= ~WS_SIZEBOX;

	CRect rec;
	GetClientRect(&rec);

	if ( hParentWnd !=NULL)
	{
		::SetWindowLong(hParentWnd, GWL_STYLE, style);
		::SetParent(hParentWnd, this->GetSafeHwnd());
		::SetWindowPos(hParentWnd, NULL, 0, 100, rec.Width(), rec.Height()-100, NULL);
	}
}

void CDll_testerDlg::OnSize(UINT nType, int cx, int cy) 
{
	CDialog::OnSize(nType, cx, cy);
	
	// TODO: Add your message handler code here
	CRect rec;
	GetClientRect(&rec);
	::SetWindowPos(hParentWnd,NULL, 0,100,rec.Width(),rec.Height()-100,NULL);	
}


