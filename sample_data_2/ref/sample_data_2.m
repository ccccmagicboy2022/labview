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
s = serialport('com28', 512000); % 创建串行端口对象
s.Timeout = 30000000000; % 300秒未读到串口数据报错
data_index = 1;
noise_index = 1;
index = 0;

data_result = cell(2^20, 2);
noise_result = cell(2^20, 3);
data_cumulation = zeros(16384 * 2, 1);
while(1)
    % 数据获取
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

    if (check_head == 205)
        data = read(s, 512, 'uint16');
        data_result{data_index, 1} = datestr(now, 'HH:MM:SS.FFF');
        data_result{data_index, 2} = data(:);
        data_index = data_index + 1;
        index = index + 1;
    end

    if (index == 66)
        for i = 1:66
            data_cumulation((i - 1) * 512 + 1 : i * 512, 1)= data_result{i, 2};
        end
        filename = strcat(datestr(now, 30), '.mat');
        %dlmwrite(filename, data_cumulation)
        save(filename, 'data_cumulation');
        data_index = 1;
        index = 0;
        figure(1)
        plot(data_cumulation);
    
    end
end
        