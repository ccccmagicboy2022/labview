// dll_testerDlg.h : header file
//

#if !defined(AFX_DLL_TESTERDLG_H__C06C436D_2462_4564_959C_F1351559C4C1__INCLUDED_)
#define AFX_DLL_TESTERDLG_H__C06C436D_2462_4564_959C_F1351559C4C1__INCLUDED_

#if _MSC_VER > 1000
#pragma once
#endif // _MSC_VER > 1000

/////////////////////////////////////////////////////////////////////////////
// CDll_testerDlg dialog

class CDll_testerDlg : public CDialog
{
// Construction
public:
	CDll_testerDlg(CWnd* pParent = NULL);	// standard constructor

// Dialog Data
	//{{AFX_DATA(CDll_testerDlg)
	enum { IDD = IDD_DLL_TESTER_DIALOG };
	CEdit	m_edit_file;
	//}}AFX_DATA

	// ClassWizard generated virtual function overrides
	//{{AFX_VIRTUAL(CDll_testerDlg)
	public:
	virtual void WinHelp(DWORD dwData, UINT nCmd = HELP_CONTEXT);
	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support
	//}}AFX_VIRTUAL

// Implementation
protected:
	HICON m_hIcon;

	// Generated message map functions
	//{{AFX_MSG(CDll_testerDlg)
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	afx_msg void OnBnOpen();
	afx_msg void OnMenuAbout();
	afx_msg void OnBnEmbededWin();
	afx_msg void OnSize(UINT nType, int cx, int cy);
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()

public:
	char m_file_name[1024];
	char m_password[1024];
private:
	HWND hParentWnd;
};

//{{AFX_INSERT_LOCATION}}
// Microsoft Visual C++ will insert additional declarations immediately before the previous line.

#endif // !defined(AFX_DLL_TESTERDLG_H__C06C436D_2462_4564_959C_F1351559C4C1__INCLUDED_)
