function [index, XT] = cfar_ca(data, NumTrainingCells, NumGuardCells, ProbabilityFalseAlarm)

%{
Function Name: cfar_ca
Description: 恒虚警率检测
Input:
	data: 原始数据
	NumTrainingCells: 训练单元数量
	NumGuardCells: 保护单元数量
	ProbabilityFalseAlarm: 虚警率
Output: None
Return: 
	index: 数据索引
	XT: 门限值
%}

alpha = NumTrainingCells.* (ProbabilityFalseAlarm.^(-1./NumTrainingCells)- 1); % 门限系数
index = 1+ NumTrainingCells/2+ NumGuardCells/2: length(data)- NumTrainingCells/2- NumGuardCells/2; % 中间那一部分
XT = zeros(1, length(index)); % 门限
for i = index
    cell_left = data(1, i- NumTrainingCells/2- NumGuardCells/2: i- NumGuardCells/2- 1);
    cell_right = data(1, i+ NumGuardCells/2+ 1: i+ NumTrainingCells/2+ NumGuardCells/2);
    Z = (sum(cell_left)+ sum(cell_right))./ NumTrainingCells;
    XT(1, i- NumTrainingCells/2- NumGuardCells/2) = Z.* alpha;
end

end