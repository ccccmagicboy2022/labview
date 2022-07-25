function [now_phase_info, now_dop_info] = pd_calculation(fs_eq, min_freq, max_freq, secnum, data_1, data_2, pre_phase_info, lamda, coef)

%{
Function Name: pd_calculation
Description: 速度、距离计算
Input:
	fs_eq: 等效采样率
	min_freq: 频段起始
	max_freq: 频段终止
	secnum: 预处理数据长度（时间）
	data_1: 原始数据
	data_2: 原始数据
	pre_phase_info: 历史相位信息
	lamda: 工作波长
	coef: 测距系数
Output: None
Return:
	now_phase_info: 相位信息
	now_dop_info: 多普勒信息
%}

% 数据获取
signal_1 = data_1(1: end- 1);
signal_2 = data_2(1: end- 1);
% 均值滤波
signal_1 = signal_1 - mean(signal_1);
signal_2 = signal_2 - mean(signal_2);
% apFFT
spectrum_1 = apFFT(signal_1);
spectrum_2 = apFFT(signal_2);
% 检测频段索引
freq = linspace(-fs_eq/ 2, fs_eq/ 2- fs_eq/ length(spectrum_1), length(spectrum_1));
zero_index = fix(length(freq)/ 2+ 1);
min_index = fix(length(freq)/ 2+ 1+ min_freq/ (fs_eq/ length(freq)));
max_index = fix(length(freq)/ 2+ 1+ max_freq/ (fs_eq/ length(freq)));
% 多普勒峰值
[low_freq_amp, low_freq_index] = max(abs(spectrum_1(zero_index: min_index))); % 低频幅度
[psor, lsor] = findpeaks(abs(spectrum_1(min_index: max_index)), 'SortStr', 'descend'); % 高频幅度
M1 = psor(1, 1);
I1 = lsor(1, 1);
[psor, lsor] = findpeaks(abs(spectrum_2(min_index: max_index)), 'SortStr', 'descend'); % 高频幅度
M2 = psor(1, 1);
I2 = lsor(1, 1);
if abs(M2) > abs(M1)
	I1 = I2;
    high_freq_amp = abs(M2);
else
	I2 = I1;
	high_freq_amp = abs(M1);
end
% 多普勒频率
dop_freq = freq(min_index+ I1- 1);
% 相位信息
angle_1 = angle(spectrum_1(min_index+ I1- 1));
angle_2 = angle(spectrum_2(min_index+ I2- 1));
delta_phi = angle_2 - angle_1;
% 保证频点高对应的相位大
if delta_phi < 0
	delta_phi = 2* pi+ delta_phi;
end
% 转向判断
now_phase_info = delta_phi* ones(1, 2);
if (pre_phase_info(1, 1) > pi && now_phase_info(1, 1) > pi) || (pre_phase_info(1, 1) < pi && now_phase_info(1, 1) < pi)
    change_dir = 0;
else
	change_dir = 1;
end
freq_snr = high_freq_amp/ low_freq_amp; % 频域信噪比
% 相位计算
if freq_snr > 2
	now_dop_info = dop_freq* ones(1, 2);
	if now_phase_info(1, 1) > pi
		now_dop_info(1, 2) = -now_dop_info(1, 2);
		SE_1 = -(now_dop_info(1, 2)* lamda/ 2)* (secnum+ secnum* 0.17)/ coef;
		now_phase_info(1, 2) = 2* pi- now_phase_info(1, 2)+ SE_1;
	else
		SE_1 = -(now_dop_info(1, 2)* lamda/ 2)* (secnum+ secnum* 0.17)/ coef;
        now_phase_info(1, 2) = now_phase_info(1, 2)+ SE_1;
		if now_phase_info(1, 2) < 0
			SE_2 = -(now_dop_info(1, 2)* lamda/ 2)* (secnum/ 4.0)/ coef;
			if change_dir == 0
                now_phase_info(1, 2) = pre_phase_info(1, 2)- SE_2;
            else
                now_phase_info(1, 2) = pre_phase_info(1, 2)+ SE_2;
            end
		end
	end
else
	now_phase_info = pre_phase_info;
	if freq_snr > 1
		now_dop_info = dop_freq* ones(1, 2);
	else
		now_dop_info = zeros(1, 2);
	end
end

end