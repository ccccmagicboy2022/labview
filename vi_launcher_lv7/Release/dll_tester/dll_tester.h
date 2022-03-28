// dll_tester.h : main header file for the DLL_TESTER application
//

#if !defined(AFX_DLL_TESTER_H__C43802D8_DE26_4031_A84E_340EA76FE37A__INCLUDED_)
#define AFX_DLL_TESTER_H__C43802D8_DE26_4031_A84E_340EA76FE37A__INCLUDED_

#if _MSC_VER > 1000
#pragma once
#endif // _MSC_VER > 1000

#ifndef __AFXWIN_H__
	#error include 'stdafx.h' before including this file for PCH
#endif

#include "resource.h"		// main symbols

/////////////////////////////////////////////////////////////////////////////
// CDll_testerApp:
// See dll_tester.cpp for the implementation of this class
//

class CDll_testerApp : public CWinApp
{
public:
	CDll_testerApp();

// Overrides
	// ClassWizard generated virtual function overrides
	//{{AFX_VIRTUAL(CDll_testerApp)
	public:
	virtual BOOL InitInstance();
	//}}AFX_VIRTUAL

// Implementation

	//{{AFX_MSG(CDll_testerApp)
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};


/////////////////////////////////////////////////////////////////////////////

//{{AFX_INSERT_LOCATION}}
// Microsoft Visual C++ will insert additional declarations immediately before the previous line.

#endif // !defined(AFX_DLL_TESTER_H__C43802D8_DE26_4031_A84E_340EA76FE37A__INCLUDED_)
