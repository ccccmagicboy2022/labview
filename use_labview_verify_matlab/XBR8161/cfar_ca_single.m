function [XT] = cfar_ca(data, freq_length, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm)

%{
Function Name: cfar_ca
Description: 恒虚警率检测
Input:
	data: 原始数据
	freq_length: 检测频点长度
	NumTrainingCells: 训练单元数量
	NumGuardCells: 保护单元数量
	ProbabilityFalseAlarm: 虚警率
Output: None
Return: 
	XT: 门限值
%}

alpha = NumTrainingCells.* (ProbabilityFalseAlarm.^(-1./ NumTrainingCells)- 1); % 门限系数
XT = zeros(1, freq_length); % 门限空间
for i = 1: freq_length
    cell = data(1, i+ NumGuardCells+ 1: i+ NumTrainingCells+ NumGuardCells);
    Z = sum(cell)./ NumTrainingCells;
    XT(1, i) = Z.* alpha;
end

end