close;
clc;
clear;

data = csvread('data.csv');
y = data(:, 1);
u = data(:, 3);
t = 0:0.05:(length(y) - 1)*0.05;
t = t';

dt = t(2) - t(1);
data = iddata(y, u, dt);
sys = tfest(data, 2);
simulated_sys = lsim(sys, u, t);

figure;

subplot(2, 1, 1);
plot(t, u);
hold on;
plot(t, y);
legend('Entrada Degrau', 'Saída');
xlabel('Tempo (s)');
ylabel('Ângulo (◦)');
title('Respota ao Degrau da Planta');

subplot(2, 1, 2);
plot(t, u);
hold on;
plot(t, y);
hold on;
plot(t, simulated_sys);
legend('Entrada Degrau', 'Saída', 'Função Estimada');
xlabel('Tempo (s)');
ylabel('Ângulo (◦)');
title('Respota ao Degrau da Função Estimada');

Gs = sys;

%% Criação do Controlador 

rltool(Gs);

%% Discretização do Controlador 

Cz = c2d(C, dt, 'tustin');
