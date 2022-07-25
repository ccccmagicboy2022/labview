function [distance_AF] = alpha_filtering(fs, data_length, distance, speed)

%{
Function Name: alpha_filtering
Description: alpha滤波
Input:
	fs: 采样率
	data_length: 数据包数据量
	distance: 距离向量
	speed: 速度值
Output: None
Return:
	distance_AF: 距离值
%}

% alpha滤波
xk = distance(1, 1)- speed* data_length/ fs;
rk = distance(1, 2) - xk;
xk = xk+ 0.2* rk; % alpha = 0.2
% 滤波输出距离预测值
distance_AF = xk- speed* data_length/ fs;
% 距离修正
if distance_AF < 0
	distance_AF = 0;
end

end