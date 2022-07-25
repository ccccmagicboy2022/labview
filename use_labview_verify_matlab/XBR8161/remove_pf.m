function [data_remove_pf] = remove_pf(data, secnum, xhz, pf)

%{
Function Name: remove_pf
Description: 暴力去除工频及其谐波周围xHz频点
Input: 
	data: 原始数据
	secnum: 累积时间
	xhz: 去除频点数量
	pf: 工频频点
Output: None
Return: 
	data_remove_pf: 去除工频干扰后的数据
%}

part_1 = data(1: xhz* secnum);
part_3 = data(pf* secnum* fix(length(data)/ (pf* secnum))+ xhz* secnum+ 1: length(data));
part_2 = zeros(pf* secnum- 2* xhz* secnum, fix(length(data)/ (pf* secnum)));
for i  = 1: fix(length(data)/ (pf* secnum))
	part_2(:, i) = data(pf* secnum* (i- 1)+ xhz* secnum+ 1: pf* secnum* i- xhz* secnum);
end
part_2 = reshape(part_2, numel(part_2), 1);
data_remove_pf = [part_1
				  part_2
				  part_3];

end