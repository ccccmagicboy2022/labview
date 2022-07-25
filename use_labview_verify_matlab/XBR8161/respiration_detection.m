function [respiration_vote_1, respiration_vote_2] = respiration_detection(data, rr_threshold, fs, bottom_noise_freq, respiration_times, data_fft_rpf, secnum, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm, offset)

%{
Function Name: respiration_detection
Description: 呼吸检测
Input:
	data: 原始数据
	rr_threshold: 呼吸频率门限
	fs: 采样率
	bottom_noise_freq: 频域底噪
	respiration_times: 呼吸频域乘法门限
	data_fft_rpf: 频域计算并去除工频及其谐波周围xhz频点后的数据
	secnum: 累积时间
	NumTrainingCells: 训练单元数量
	NumGuardCells: 保护单元数量
	ProbabilityFalseAlarm: 虚警率
	offset: 门限偏置
Output: None
Return:
	respiration_vote_1: 呼吸检测判定结果1（布尔值）
	respiration_vote_2: 呼吸检测判定结果2（布尔值）
%}

% czt呼吸检测
data_czt = czt(data.* window(@hamming, length(data)), length(data), exp(-1i* 2* pi* (rr_threshold- 0.1)/ (length(data)* fs)), exp(1i* 2* pi* 0.1/ fs)); % Chirp Z-transform
respiration_vote_1_max = max(abs(data_czt))/ (length(data)/ 2); % rr_threshold内频谱最大值
respiration_vote_1_mean = mean(abs(data_czt))/ (length(data)/ 2); % rr_threshold内频谱均值
respiration_vote_1 = (respiration_vote_1_max > bottom_noise_freq* respiration_times) || (respiration_vote_1_mean > bottom_noise_freq* respiration_times* 0.618); % 根据rr_threshold内频谱最大值均值进行频域判定

% figure(7)
% data_fft_rpf_x = 0: fs/ length(data): (length(data_fft_rpf)- 1)* fs/ length(data);
% plot(data_fft_rpf_x, data_fft_rpf)
% xlabel('Frequency (Hz)')
% ylabel('Amplitude')
% title('信号频域')
% figure(8)
% plot(respiration_vote_1_max* ones(length(data)), 'b', 'LineWidth', 2)
% hold on
% plot(respiration_vote_1_mean* ones(length(data)), 'b', 'LineWidth', 2)
% hold on
% plot(bottom_noise_freq* respiration_times* ones(length(data)), 'r', 'LineWidth', 2)
% hold on
% plot(bottom_noise_freq* respiration_times* 0.618* ones(length(data)), 'r', 'LineWidth', 2)
% hold off
% title('czt呼吸检测')

% cfar呼吸检测
slice = data_fft_rpf(1: 50* secnum); % 取前50Hz频段
slice_flip = flip(slice, 1); % 上下翻转
P = [slice_flip; slice]; % 合成一个矩阵
xc = P.'; % 转置
[index, XT] = cfar_ca_double(xc, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm); % CA-CFAR
xxcc = 10.* log(abs(xc)/ max(abs(xc))+ 1)./ log(10); % 数据对数归一化
XXTT = 10.* log(abs(XT)/ max(abs(XT))+ 1)./ log(10); % 门限对数归一化

% figure(9)
% plot(xxcc, 'b', 'LineWidth', 2)
% hold on
% plot(index, offset+ XXTT, 'r', 'LineWidth', 2)
% hold on

for i = 50* secnum+ 2 : ceil((50+ rr_threshold)* secnum)- 1
	if xxcc(i) > offset + XXTT(i- (NumTrainingCells+ NumGuardCells)/ 2)
		respiration_vote_2 = 1;
		% plot(length(index), max(offset+ XXTT), 'p', 'MarkerSize', 30, 'MarkerEdgeColor', 'r', 'MarkerFaceColor', 'r')
		break
	else
		respiration_vote_2 = 0;
	end
end

% hold off
% title('cfar呼吸检测')

end