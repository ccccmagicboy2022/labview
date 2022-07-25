function [freq_vote] = freq_detection(data_fft_rpf, win_size_freq, stride_freq, bottom_noise_freq, freq_times)

%{
Function Name: freq_detection
Description: 根据窗内均值返回频域判定结果
Input: 
	data_fft_rpf: 频域计算并去除工频及其谐波周围xhz频点后的数据
	win_size_freq: 频域窗长
	stride_freq: 频域步长
	bottom_noise_freq: 频域底噪
	freq_times: 频域乘法门限
Output: None
Return: 
	freq_vote: 频域判定结果（布尔值）
%}

freq = zeros((length(data_fft_rpf)- win_size_freq)/ stride_freq+ 1, 1); % 计算窗数量
for i = 1: length(freq)
	freq(i, 1) = mean(data_fft_rpf((i- 1)* stride_freq+ 1: (i- 1)* stride_freq+ win_size_freq));
end
freq_vote = max(freq) > bottom_noise_freq* freq_times; % 根据滑窗数据的最大均值与底噪比较进行频域判定

% figure(6)
% plot(freq, 'b', 'LineWidth', 2)
% hold on
% plot(bottom_noise_freq* freq_times* ones(length(freq)), 'r', 'LineWidth', 2)
% hold off
% title('信号频域检测')

end