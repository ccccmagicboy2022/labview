function [cfar_vote] = cfar_detection(data, secnum, freq_start, freq_end, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm, offset)

%{
Function Name: cfar_detection
Description: cfar检测
Input:
	data: 原始数据
	secnum: 累积时间
	freq_start: 检测起始频率
	freq_end: 检测终止频率
	NumTrainingCells: 训练单元数量
	NumGuardCells: 保护单元数量
	ProbabilityFalseAlarm: 虚警率
	offset: 门限偏置
Output: None
Return:
	cfar_vote: cfar检测判定结果（布尔值）
%}

data = data - mean(data); % 均值滤波
w = window(@hamming, length(data)); % 窗函数
X = data.* w.'; % 加窗
Y = fft(X, length(data)); % FFT
AP_double = abs(Y)/ length(data); % 双边谱
AP_single = AP_double(1: length(data)/ 2); % 单边谱
AP_single(2: end) = 2* AP_single(2: end); % 计算单边谱幅度
xc = AP_single(secnum* freq_start+ 1: end); % 检测频段
XT = cfar_ca(xc, (freq_end- freq_start)* secnum, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm); % CA-CFAR

% % 调参绘图
% figure(2)
% plot(xc, 'b')
% hold on
% plot(XT+ offset, 'r')
% hold on

% cfar判定
for i = 1 : length(XT)
	if xc(i) > XT(i)+ offset
		cfar_vote = 1;
		% plot(length(XT), max(XT+ offset), 'p', 'MarkerSize', 30, 'MarkerEdgeColor', 'r', 'MarkerFaceColor', 'r')
		break
	else
		cfar_vote = 0;
	end
end

% hold off
% title('cfar检测')

end