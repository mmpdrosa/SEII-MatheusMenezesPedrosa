import socket
import time
import sys

UDP_IP = '127.0.0.1'     # endereço de ip do host
UDP_PORT = 5005          # porta da conexão
buf = 1024               # quantidade máxima de bytes a serem enviados por vez
file_name = sys.argv[1]  # nome do arquivo a ser enviado, obtido via argumento


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # cria um objeto socket utilizando os argumentos AF_INET para
                                                        #   especificar o endereço de família como IPv4 e SOCK_DGRAM
                                                        #   para o tipo de protocolo UDP
sock.sendto(file_name, (UDP_IP, UDP_PORT))              # envia o nome do arquivo para o endereço ip e porta 
                                                        #   especificados
print('Sending %s ...' % file_name)

f = open(file_name, "r")                     # abre o arquivo em modo de leitura
data = f.read(buf)                           # realiza a leitura do arquivo, limitado por 'buf'
while(data):
  if(sock.sendto(data, (UDP_IP, UDP_PORT))): # envia os dados do arquivo para o endereço de ip e portas especificados
    data = f.read(buf)                       # realiza a leitura do arquivo, limitado por 'buf'
    time.sleep(0.02)                         # da ao outro lado da conexão um tempo para salvar os dados enviados

sock.close() # fecha a conexão
f.close()    # fecha o arquivo
