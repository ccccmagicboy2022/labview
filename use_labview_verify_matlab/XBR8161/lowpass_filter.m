function [Hd] = lowpass_filter(Fs, Fpass, Fstop, Dpass, Dstop, dens)

%{
Function Name: lowpass_filter
Description: 返回离散时间滤波器对象
Input: 
	Fs: Sampling Frequency
	Fpass: Passband Frequency
	Fstop: Stopband Frequency
	Dpass: Passband Ripple
	Dstop: Stopband Attenuation
	dens: Density Factor
Output: None
Return:
	Hd: 离散时间滤波器对象
%}

% Calculate the order from the parameters using FIRPMORD.
[N, Fo, Ao, W] = firpmord([Fpass, Fstop]/(Fs/2), [1 0], [Dpass, Dstop]);

% Calculate the coefficients using the FIRPM function.
b  = firpm(N, Fo, Ao, W, {dens});
Hd = dfilt.dffir(b);

end