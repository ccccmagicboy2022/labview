function [data_window_fft_single] = freq_calculation(data)

%{
Function Name: freq_calculation
Description: 频域计算
Input:
	data: 原始数据
Output: None
Return: 
	data_window_fft_single: 频域单边谱
%}

data_window = data.* window(@hamming, length(data)); % 数据加窗
data_window_fft = abs(fft(data_window, length(data_window)))/ length(data_window); % fft
data_window_fft_single = data_window_fft(1: length(data_window_fft)/ 2); % 单边谱
data_window_fft_single(2: end) = 2* data_window_fft_single(2: end); % 计算单边谱幅度并去除零频放大效应

end