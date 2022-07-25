function [y2_fft] = apFFT(data)

%{
Function Name: apFFT
Description: apFFT
Input:
	data: 奇数点长原始数据
Output: None
Return:
	y2_fft: apFFT结果
%}

N = (length(data)+ 1)/ 2;
win = hanning(N).';
winn = conv(win, win); % apFFT须要卷积窗
win2 = winn/ sum(winn); % 窗归1
y = data.* win2;
y2 = y(N: end)+ [0 y(1: N- 1)]; % 构成长N的apFFT输入数据
y2_pad = [y2, zeros(1, N* 1)];
y2_fft = fftshift(fft(y2_pad));

end