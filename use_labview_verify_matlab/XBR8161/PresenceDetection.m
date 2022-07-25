close all
clearvars
clear
clc

% 关闭并删除已占用端口
if ~isempty(instrfind)
	fclose(instrfind);
	delete(instrfind);
end
% 端口配置
s = serialport('com3', 512000); % 创建串行端口对象
s.Timeout = 300; % 300秒未读到串口数据报错

% 系统参数
fc = 10.525e9; % 工作频率
lamda = physconst('LightSpeed')/ fc; % 工作波长
freq_offset = 6e6; % 频偏
swave_freq = 2e3; % 方波频率
fs = 4e3; % 采样率
fs_eq = fs/ 2; % 等效采样率
% 信号流分包
data_length = 512; % 数据包数据量（双频）
data_length_eq = data_length/ 2; % 等效数据包数据量（单频）
data_index_distance = 0; % 数据包索引（距离）
div_distance = 2; % 分频数（距离）
secnum_distance = 0.512; % 配置预处理数据时间（距离）
cumulation_num_distance = ceil(fs_eq/ data_length_eq* secnum_distance); % 累积次数（距离）
data_cumulation_distance_1 = zeros(1, data_length_eq/ div_distance* cumulation_num_distance); % 累积数据（距离）
data_cumulation_distance_2 = zeros(1, data_length_eq/ div_distance* cumulation_num_distance); % 累积数据（距离）
data_index_vitalsign = 0; % 数据包索引（生命体征）
div_vitalsign = 4; % 分频数（生命体征）
secnum_bottom_noise = 16.384; % 配置预处理数据时间（底噪）
cumulation_num_bottom_noise = ceil(fs_eq/ data_length_eq* secnum_bottom_noise); % 累积次数（底噪）
bottom_noise_freq_index = 1; % 频域底噪索引
bottom_noise_freq_cache = zeros(3, 1); % 频域底噪缓存区
bottom_noise_freq_array = zeros(cumulation_num_bottom_noise, 1); % 频域底噪队列
bottom_noise_freq_cr = 0.75; % 历史底噪置信率
secnum_vitalsign = 16.384; % 配置预处理数据时间（生命体征）
cumulation_num_vitalsign = fs_eq/ data_length_eq* secnum_vitalsign; % 累积次数（生命体征）
data_cumulation_vitalsign = zeros(data_length_eq/ div_vitalsign/ div_vitalsign* cumulation_num_vitalsign, 1); % 累积数据（生命体征）
colorflag = 'g'; % 状态位初始化
% 触发检测
freq_start = 20; % 检测起始频率
freq_end = 200; % 检测终止频率
NumTrainingCells_single = 50; % 训练单元数量
NumGuardCells_single = 100; % 保护单元数量
ProbabilityFalseAlarm_single = 10^(-2); % 虚警率
offset_single = 1.5; % 门限偏置
% 速度距离检测
min_freq = 10; % 频段起始
max_freq = 200; % 频段终止
pre_phase_info = zeros(1, 2); % 相位初始化
coef = abs(physconst('LightSpeed')/ (4* pi* freq_offset)); % 测距系数
distance = 4; % 距离初始化
speed = 0; % 速度初始化
distance_AF = distance; % 距离初始化
distance_sense = distance; % 门限距离
% 离群点检测
N_sigma = 3.2; % 门限倍数
nbins = 100; % bin数量
N_interval = 50; % 间隔长度
% 生命体征上报周期
secnum_vitalsign_report = 8.192; % 配置上报周期（生命体征）
cumulation_num_vitalsign_report = fs_eq/ data_length_eq* secnum_vitalsign_report; % 上报倒计时（生命体征）
% 大动作检测
win_size_time_vitalsign = data_length_eq* 4/ div_vitalsign/ div_vitalsign; % 时域窗长（0.512s）
stride_time_vitalsign = data_length_eq* 2/ div_vitalsign/ div_vitalsign; % 时域步长（0.256s）
time_times_vitalsign = 3; % 时域乘法门限
time_add_vitalsign = 30; % 时域加法门限
xhz = 2; % 去除频点数量
pf = 50; % 工频频点
win_size_freq_vitalsign = data_length_eq* 4/ div_vitalsign/ div_vitalsign; % 频域窗长
stride_freq_vitalsign = 16; % 频域步长
freq_times_vitalsign = 1.6; % 频域乘法门限
% 呼吸检测
rr_threshold = 0.7; % 呼吸频率截取范围
respiration_times = 12; % 呼吸频域乘法门限
NumTrainingCells_double = 300; % 训练单元数量
NumGuardCells_double = 200; % 保护单元数量
ProbabilityFalseAlarm_double = 10^(-8); % 虚警率
offset_double = 0.55; % 门限偏置
% 延迟预设
delay_time_init = 64; % 延迟时间
if delay_time_init < 32 % 初始延迟时间最短32秒
	delay_time_init = 32;
end
delay_time_num = round(delay_time_init/ secnum_vitalsign_report); % 初始确认无人次数
delay_time_adaptive = delay_time_init; % 自适应延迟时间初始化
delay_time_adaptive_index = 0; % 自适应延迟时间索引初始化
% 距离跟踪图
plot_index = 1; % 绘图索引
figure(1)
subplot(2, 1, 2)
a1 = animatedline('LineWidth', 2, 'LineStyle', '-', 'Color', 'r');
yticks([0.5 1 1.5 2 2.5 3 3.5 4 4.5 5 5.5 6 6.5 7 7.5 8 8.5 9 9.5 10])
ylim([0 10])
xlabel('Time (s)')
ylabel('Distance (m)')
title('Trajectory estimation')
set(gca, 'FontSize', 14)
grid on
grid minor

while(1)
	% 快检测
	while(1)
		% 串口数据获取
		while(1)
			check_head = read(s, 1, 'uint8');
			while check_head ~= 171
				check_head = read(s, 1, 'uint8');
			end
			check_head = read(s, 1, 'uint8');
			if check_head == 205
				break
			end
		end
		data = read(s, data_length, 'uint16');
		data_1 = data(1: 2: end); % 低频数据
		data_2 = data(2: 2: end); % 高频数据
		% 一次降采样（距离）
		if not(data_index_distance)
			fir_pad_1 = data_1(1, end- 128+ 1: end); % pad
			fir_pad_2 = data_2(1, end- 128+ 1: end); % pad
			data_index_distance = data_index_distance + 1; % 索引更新
			continue
		end
		data_pad_1 = [fir_pad_1, data_1]; % 加pad
		data_pad_2 = [fir_pad_2, data_2]; % 加pad
		fir_pad_1 = data_1(1, end- 128+ 1: end); % pad更新
		fir_pad_2 = data_2(1, end- 128+ 1: end); % pad更新
		data_pad_LP_1 = filter(lowpass_filter(fs_eq, 480, 500, 0.057501127785, 0.031622776602, 20), data_pad_1); % 低通滤波
		data_pad_LP_2 = filter(lowpass_filter(fs_eq, 480, 500, 0.057501127785, 0.031622776602, 20), data_pad_2); % 低通滤波
		data_pad_LP_DS_1 = data_pad_LP_1(1, 1:div_distance:end); % 数据降采样
		data_pad_LP_DS_2 = data_pad_LP_2(1, 1:div_distance:end); % 数据降采样
		data_pad_LP_DS_CUT_1 = data_pad_LP_DS_1(1, end- data_length_eq/ div_distance+ 1: end); % 数据截取
		data_pad_LP_DS_CUT_2 = data_pad_LP_DS_2(1, end- data_length_eq/ div_distance+ 1: end); % 数据截取
		% 测距数据累积与滑窗
		if data_index_distance < cumulation_num_distance
			data_cumulation_distance_1(1, data_length_eq/ div_distance* (data_index_distance- 1)+ 1: data_length_eq/ div_distance* data_index_distance) = data_pad_LP_DS_CUT_1; % 数据入窗
			data_cumulation_distance_2(1, data_length_eq/ div_distance* (data_index_distance- 1)+ 1: data_length_eq/ div_distance* data_index_distance) = data_pad_LP_DS_CUT_2; % 数据入窗
			data_index_distance = data_index_distance + 1;
			continue
		elseif data_index_distance == cumulation_num_distance
			data_cumulation_distance_1(1, data_length_eq/ div_distance* (data_index_distance- 1)+ 1: data_length_eq/ div_distance* data_index_distance) = data_pad_LP_DS_CUT_1; % 数据入窗
			data_cumulation_distance_2(1, data_length_eq/ div_distance* (data_index_distance- 1)+ 1: data_length_eq/ div_distance* data_index_distance) = data_pad_LP_DS_CUT_2; % 数据入窗
			data_index_distance = data_index_distance + 1;
		else
			data_cumulation_distance_1(1, 1: data_length_eq/ div_distance* (cumulation_num_distance- 1)) = data_cumulation_distance_1(1, data_length_eq/ div_distance+ 1: end); % 数据移位
			data_cumulation_distance_1(1, end- data_length_eq/ div_distance+ 1: end) = data_pad_LP_DS_CUT_1; % 数据入窗
			data_cumulation_distance_2(1, 1: data_length_eq/ div_distance* (cumulation_num_distance- 1)) = data_cumulation_distance_2(1, data_length_eq/ div_distance+ 1: end); % 数据移位
			data_cumulation_distance_2(1, end- data_length_eq/ div_distance+ 1: end) = data_pad_LP_DS_CUT_2; % 数据入窗
		end
		% 一次降采样（生命体征）
		if not(data_index_vitalsign)
			fir_pad_3 = data_1(1, end- 32+ 1: end); % pad
			data_index_vitalsign = data_index_vitalsign + 1; % 索引更新
			continue
		end
		data_pad_3 = [fir_pad_3, data_1]; % 加pad
		fir_pad_3 = data_1(1, end- 32+ 1: end); % pad更新
		data_pad_LP_3 = filter(lowpass_filter(fs_eq, 125, 250, 0.057501127785, 0.01, 20), data_pad_3); % 低通滤波
		data_pad_LP_DS_3 = data_pad_LP_3(1, 1:div_vitalsign:end); % 数据降采样
		data_pad_LP_DS_CUT_3 = data_pad_LP_DS_3(1, end- data_length_eq/ div_vitalsign+ 1: end); % 数据截取
		data_window_fft_single = freq_calculation(data_pad_LP_DS_CUT_3.'); % 频域计算
		% 频域底噪获取/85.9375-117.1875Hz
		if bottom_noise_freq_index < cumulation_num_bottom_noise
			for index = 1: length(bottom_noise_freq_cache)
				bottom_noise_freq_cache(index, 1) = mean(data_window_fft_single(end- 20+ index- 1: end- 20+ index- 1+ 2));
			end
			bottom_noise_freq_array(bottom_noise_freq_index, 1) = min(bottom_noise_freq_cache); % 数据累积
			bottom_noise_freq_index = bottom_noise_freq_index + 1;
		elseif bottom_noise_freq_index == cumulation_num_bottom_noise
			for index = 1: length(bottom_noise_freq_cache)
				bottom_noise_freq_cache(index, 1) = mean(data_window_fft_single(end- 20+ index- 1: end- 20+ index- 1+ 2));
			end
			bottom_noise_freq_array(bottom_noise_freq_index, 1) = min(bottom_noise_freq_cache); % 数据累积
			bottom_noise_freq_index = bottom_noise_freq_index + 1;
			bottom_noise_freq = min(bottom_noise_freq_array); % 频域底噪
		else
			for index = 1: length(bottom_noise_freq_cache)
				bottom_noise_freq_cache(index, 1) = mean(data_window_fft_single(end- 20+ index- 1: end- 20+ index- 1+ 2));
			end
			bottom_noise_freq = min(bottom_noise_freq_array)* bottom_noise_freq_cr + min(bottom_noise_freq_cache)* (1- bottom_noise_freq_cr); % 频域底噪
			bottom_noise_freq_array(1: cumulation_num_bottom_noise- 1, 1) = bottom_noise_freq_array(2: cumulation_num_bottom_noise, 1); % 数据移位
			bottom_noise_freq_array(cumulation_num_bottom_noise, 1) = min(bottom_noise_freq_cache); % 数据入窗		
		end
		% 二次降采样（生命体征）
		if not(data_index_vitalsign- 1)
			fir_pad_4 = data_pad_LP_DS_CUT_3(1, end- 64+ 1: end); % pad
			data_index_vitalsign = data_index_vitalsign + 1;
			continue
		end
		data_pad_4 = [fir_pad_4, data_pad_LP_DS_CUT_3]; % 加pad
		fir_pad_4 = data_pad_LP_DS_CUT_3(1, end- 64+ 1: end); % pad更新
		data_pad_LP_4 = filter(lowpass_filter(fs_eq/ div_vitalsign, 54, 64, 0.057501127785, 0.031622776602, 20), data_pad_4); % 低通滤波
		data_pad_LP_DS_4 = data_pad_LP_4(1, 1:div_vitalsign:end); % 数据降采样
		data_pad_LP_DS_CUT_4 = data_pad_LP_DS_4(1, end- data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end); % 数据截取
		% 数据累积与滑窗
		if data_index_vitalsign < cumulation_num_vitalsign + 1
			data_cumulation_vitalsign(data_length_eq/ div_vitalsign/ div_vitalsign* (data_index_vitalsign- 2)+ 1: data_length_eq/ div_vitalsign/ div_vitalsign* (data_index_vitalsign- 1), 1) = data_pad_LP_DS_CUT_4;		
			data_index_vitalsign = data_index_vitalsign + 1;
			continue
		elseif data_index_vitalsign == cumulation_num_vitalsign + 1
			data_cumulation_vitalsign(data_length_eq/ div_vitalsign/ div_vitalsign* (data_index_vitalsign- 2)+ 1: data_length_eq/ div_vitalsign/ div_vitalsign* (data_index_vitalsign- 1), 1) = data_pad_LP_DS_CUT_4;		
			data_index_vitalsign = data_index_vitalsign + 1;
		else
			data_cumulation_vitalsign(1: data_length_eq/ div_vitalsign/ div_vitalsign* (cumulation_num_vitalsign- 1), 1) = data_cumulation_vitalsign(data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end, 1); % 数据移位
			data_cumulation_vitalsign(end- data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end, 1) = data_pad_LP_DS_CUT_4; % 数据入窗
		end
		% 速度距离检测
		cfar_vote_distance = cfar_detection(data_cumulation_distance_1, round(secnum_distance, 1), freq_start, freq_end, NumTrainingCells_single, NumGuardCells_single, ProbabilityFalseAlarm_single, offset_single); % cfar检测
		if cfar_vote_distance
			% 速度距离检测
			[pre_phase_info, pre_dop_info] = pd_calculation(fs_eq/ 2, min_freq, max_freq, secnum_distance, data_cumulation_distance_1, data_cumulation_distance_2, pre_phase_info, lamda, coef);
			distance = pre_phase_info(1, 2)* coef; % 距离信息更新
			speed = pre_dop_info(1, 2)* physconst('LightSpeed')/ (2* fc); % 速度信息更新
			[distance_AF] = alpha_filtering(fs, data_length, [distance_AF distance], speed); % alpha滤波
			% 距离判定
			if distance_AF < distance_sense
				colorflag = 'r';
			end
		end
		% 距离跟踪图
		figure(1)
		addpoints(a1, plot_index* data_length_eq/ fs_eq, distance_AF)
		drawnow limitrate
		plot_index = plot_index + 1; % 绘图索引更新
		subplot(2, 1, 1)
		delete(findobj('type', 'text'));
		text(0.1, 0.5, {['Distance: ', num2str(round(distance_AF, 2)), 'm'], ['Speed: ', num2str(round(speed, 2)), 'm/s']}, 'Color', 'red', 'Fontsize', 120)
		axis off
		% 存在状态显示
		figure(2)
		alpha = 0: pi/20: 2*pi; % 角度[0, 2*pi]
		R = 2; % 半径
		xx = R* cos(alpha);
		yy = R* sin(alpha);
		plot(xx, yy, '-')
		axis equal
		fill(xx, yy, colorflag) % 颜色填充
		% 跳出快检测
		if colorflag == 'r'
			pause(0.001)
			break
		end
	end
	% 慢检测
	while(1)
		% 串口数据获取
		while(1)
			check_head = read(s, 1, 'uint8');
			while check_head ~= 171
				check_head = read(s, 1, 'uint8');
			end
			check_head = read(s, 1, 'uint8');
			if check_head == 205
				break
			end
		end
		data = read(s, data_length, 'uint16');
		data_1 = data(1: 2: end); % 低频数据
		data_2 = data(2: 2: end); % 高频数据
		% 一次降采样（距离）
		data_pad_1 = [fir_pad_1, data_1]; % 加pad
		data_pad_2 = [fir_pad_2, data_2]; % 加pad
		fir_pad_1 = data_1(1, end- 128+ 1: end); % pad更新
		fir_pad_2 = data_2(1, end- 128+ 1: end); % pad更新
		data_pad_LP_1 = filter(lowpass_filter(fs_eq, 480, 500, 0.057501127785, 0.031622776602, 20), data_pad_1); % 低通滤波
		data_pad_LP_2 = filter(lowpass_filter(fs_eq, 480, 500, 0.057501127785, 0.031622776602, 20), data_pad_2); % 低通滤波
		data_pad_LP_DS_1 = data_pad_LP_1(1, 1:div_distance:end); % 数据降采样
		data_pad_LP_DS_2 = data_pad_LP_2(1, 1:div_distance:end); % 数据降采样
		data_pad_LP_DS_CUT_1 = data_pad_LP_DS_1(1, end- data_length_eq/ div_distance+ 1: end); % 数据截取
		data_pad_LP_DS_CUT_2 = data_pad_LP_DS_2(1, end- data_length_eq/ div_distance+ 1: end); % 数据截取
		% 测距数据滑窗
		data_cumulation_distance_1(1, 1: data_length_eq/ div_distance* (cumulation_num_distance- 1)) = data_cumulation_distance_1(1, data_length_eq/ div_distance+ 1: end); % 数据移位
		data_cumulation_distance_1(1, end- data_length_eq/ div_distance+ 1: end) = data_pad_LP_DS_CUT_1; % 数据入窗
		data_cumulation_distance_2(1, 1: data_length_eq/ div_distance* (cumulation_num_distance- 1)) = data_cumulation_distance_2(1, data_length_eq/ div_distance+ 1: end); % 数据移位
		data_cumulation_distance_2(1, end- data_length_eq/ div_distance+ 1: end) = data_pad_LP_DS_CUT_2; % 数据入窗
		% 一次降采样（生命体征）
		data_pad_3 = [fir_pad_3, data_1]; % 加pad
		fir_pad_3 = data_1(1, end- 32+ 1: end); % pad更新
		data_pad_LP_3 = filter(lowpass_filter(fs_eq, 125, 250, 0.057501127785, 0.01, 20), data_pad_3); % 低通滤波
		data_pad_LP_DS_3 = data_pad_LP_3(1, 1:div_vitalsign:end); % 数据降采样
		data_pad_LP_DS_CUT_3 = data_pad_LP_DS_3(1, end- data_length_eq/ div_vitalsign+ 1: end); % 数据截取
		data_window_fft_single = freq_calculation(data_pad_LP_DS_CUT_3.'); % 频域计算
		% 频域底噪获取/85.9375-117.1875Hz
		for index = 1: length(bottom_noise_freq_cache)
			bottom_noise_freq_cache(index, 1) = mean(data_window_fft_single(end- 20+ index- 1: end- 20+ index- 1+ 2));
		end
		bottom_noise_freq = min(bottom_noise_freq_array)* bottom_noise_freq_cr + min(bottom_noise_freq_cache)* (1- bottom_noise_freq_cr); % 频域底噪
		bottom_noise_freq_array(1: cumulation_num_bottom_noise- 1, 1) = bottom_noise_freq_array(2: cumulation_num_bottom_noise, 1); % 数据移位
		bottom_noise_freq_array(cumulation_num_bottom_noise, 1) = min(bottom_noise_freq_cache); % 数据入窗
		% 二次降采样（生命体征）
		data_pad_4 = [fir_pad_4, data_pad_LP_DS_CUT_3]; % 加pad
		fir_pad_4 = data_pad_LP_DS_CUT_3(1, end- 64+ 1: end); % pad更新
		data_pad_LP_4 = filter(lowpass_filter(fs_eq/ div_vitalsign, 54, 64, 0.057501127785, 0.031622776602, 20), data_pad_4); % 低通滤波
		data_pad_LP_DS_4 = data_pad_LP_4(1, 1:div_vitalsign:end); % 数据降采样
		data_pad_LP_DS_CUT_4 = data_pad_LP_DS_4(1, end- data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end); % 数据截取
		% 数据累积与滑窗
		data_cumulation_vitalsign(1: data_length_eq/ div_vitalsign/ div_vitalsign* (cumulation_num_vitalsign- 1), 1) = data_cumulation_vitalsign(data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end, 1); % 数据移位
		data_cumulation_vitalsign(end- data_length_eq/ div_vitalsign/ div_vitalsign+ 1: end, 1) = data_pad_LP_DS_CUT_4; % 数据入窗
		% 速度距离检测
		cfar_vote_distance = cfar_detection(data_cumulation_distance_1, round(secnum_distance, 1), freq_start, freq_end, NumTrainingCells_single, NumGuardCells_single, ProbabilityFalseAlarm_single, offset_single); % cfar检测
		if cfar_vote_distance
			% 速度距离检测
			[pre_phase_info, pre_dop_info] = pd_calculation(fs_eq/ div_distance, min_freq, max_freq, secnum_distance, data_cumulation_distance_1, data_cumulation_distance_2, pre_phase_info, lamda, coef);
			distance = pre_phase_info(1, 2)* coef; % 距离信息更新
			speed = pre_dop_info(1, 2)* physconst('LightSpeed')/ (2* fc); % 速度信息更新
			[distance_AF] = alpha_filtering(fs, data_length, [distance_AF distance], speed); % alpha滤波
		end
		% 自适应延迟时间调整
		if distance_AF < distance_sense
			delay_time = delay_time_init* 2;
		else
			delay_time = delay_time_init;
		end
		% 距离跟踪图
		figure(1)
		addpoints(a1, plot_index* data_length_eq/ fs_eq, distance_AF)
		drawnow limitrate
		plot_index = plot_index + 1; % 绘图索引更新
		subplot(2, 1, 1)
		delete(findobj('type', 'text'));
		text(0.1, 0.5, {['Distance: ', num2str(round(distance_AF, 2)), 'm'], ['Speed: ', num2str(round(speed, 2)), 'm/s']}, 'Color', 'red', 'Fontsize', 120)
		axis off
		% 周期上报（生命体征）
		cumulation_num_vitalsign_report = cumulation_num_vitalsign_report - 1;
		if cumulation_num_vitalsign_report == 0
			data_cumulation_vitalsign_MF = data_cumulation_vitalsign - mean(data_cumulation_vitalsign); % 均值滤波
			data_cumulation_vitalsign_MF_RO = remove_outliers(data_cumulation_vitalsign_MF, N_sigma, nbins, N_interval); % 去除离群点
			data_cumulation_vitalsign_MF_RO_window_fft_single_rfp = remove_pf(freq_calculation(data_cumulation_vitalsign_MF_RO), round(secnum_vitalsign), xhz, pf); % 频域计算并去除工频及其谐波周围xhz频点
			% 大动作检测
			time_vote_vitalsign = time_detection(data_cumulation_vitalsign_MF_RO, win_size_time_vitalsign, stride_time_vitalsign, time_times_vitalsign, time_add_vitalsign); % 时域判定
			freq_vote_vitalsign = freq_detection(data_cumulation_vitalsign_MF_RO_window_fft_single_rfp, win_size_freq_vitalsign, stride_freq_vitalsign, bottom_noise_freq, freq_times_vitalsign); % 频域判定
			% 呼吸检测
			[respiration_vote_1, respiration_vote_2] = respiration_detection(data_cumulation_vitalsign_MF_RO, rr_threshold, fs_eq/ div_vitalsign/ div_vitalsign, bottom_noise_freq, respiration_times, data_cumulation_vitalsign_MF_RO_window_fft_single_rfp, round(secnum_vitalsign), NumTrainingCells_double, NumGuardCells_double, ProbabilityFalseAlarm_double, offset_double);
			% 自适应延迟时间调整
			if delay_time_adaptive_index < delay_time/ 8* 16
				delay_time_adaptive_index = delay_time_adaptive_index + 1; % 自适应延迟时间索引
			end
			if delay_time_adaptive_index == delay_time/ 8* 4 % 4倍初始延迟保持呼吸静态
				delay_time_adaptive = delay_time* 2; % 2倍延迟时间调整
			elseif delay_time_adaptive_index == delay_time/ 8* 8 % 8倍初始延迟保持呼吸静态
				delay_time_adaptive = delay_time* 4; % 4倍延迟时间调整
			elseif delay_time_adaptive_index == delay_time/ 8* 16 % 16倍初始延迟保持呼吸静态
				delay_time_adaptive = delay_time* 8; % 8倍延迟时间调整
			% elseif delay_time_adaptive_index == delay_time/ 8* 32 % 32倍初始延迟保持呼吸静态
				% delay_time_adaptive = delay_time* 16; % 16倍延迟时间调整
			end
			% 存在保持检测判定
			if time_vote_vitalsign && freq_vote_vitalsign
				colorflag = 'r';
				respiration_vote_1_num = round(delay_time/ 64); % 重置次数
				delay_time_num = round(delay_time/ 8); % 重置次数
				delay_time_adaptive = delay_time; % 自适应延迟时间初始化
				delay_time_adaptive_index = 0; % 自适应延迟时间索引初始化
			elseif respiration_vote_2
				colorflag = 'y';
				respiration_vote_1_num = round(delay_time_adaptive/ 64); % 重置次数
				delay_time_num = round(delay_time_adaptive/ 8); % 重置次数
			elseif not(time_vote_vitalsign) && not(freq_vote_vitalsign) && respiration_vote_1
				colorflag = 'y';
				respiration_vote_1_num = round(delay_time_adaptive/ 64); % 重置次数
				delay_time_num = round(delay_time_adaptive/ 8); % 重置次数
			elseif not(time_vote_vitalsign) && freq_vote_vitalsign && respiration_vote_1
				respiration_vote_1_num = respiration_vote_1_num - 1;
				if respiration_vote_1_num < 0
					colorflag = 'y';
					respiration_vote_1_num = round(delay_time_adaptive/ 64); % 重置次数
					delay_time_num = round(delay_time_adaptive/ 8); % 重置次数                        
				else
					delay_time_num = delay_time_num - 1;
					if delay_time_num == 0
						colorflag = 'g';
						respiration_vote_1_num = round(delay_time/ 64); % 重置次数
						delay_time_num = round(delay_time/ 8); % 重置次数
						delay_time_adaptive = delay_time; % 自适应延迟时间初始化
						delay_time_adaptive_index = 0; % 自适应延迟时间索引初始化
					end
				end
			else
				delay_time_num = delay_time_num - 1;
				if delay_time_num == 0
					colorflag = 'g';
					respiration_vote_1_num = round(delay_time/ 64); % 重置次数
					delay_time_num = round(delay_time/ 8); % 重置次数
					delay_time_adaptive = delay_time; % 自适应延迟时间初始化
					delay_time_adaptive_index = 0; % 自适应延迟时间索引初始化
				end
			end
			cumulation_num_vitalsign_report = fs_eq/ data_length_eq* secnum_vitalsign_report; % 上报倒计时重置（生命体征）
		else
			time_vote_vitalsign = time_detection(data_cumulation_vitalsign- mean(data_cumulation_vitalsign), win_size_time_vitalsign, stride_time_vitalsign, time_times_vitalsign, time_add_vitalsign); % 即时检测
			if time_vote_vitalsign
				colorflag = 'r';
			end
		end
		% 存在状态显示
		figure(2)
		alpha = 0: pi/20: 2*pi; % 角度[0, 2*pi]
		R = 2; % 半径
		xx = R* cos(alpha);
		yy = R* sin(alpha);
		plot(xx, yy, '-')
		axis equal
		fill(xx, yy, colorflag) % 颜色填充
		% 跳出慢检测
		if colorflag == 'g'
			pause(0.001)
			break
		end
	end
end