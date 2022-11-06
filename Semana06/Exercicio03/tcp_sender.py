import socket
import sys

TCP_IP = '127.0.0.1'    # endereço de ip do host
FILE_PORT = 5005        # porta para o qual o nome do arquivo vai ser enviado
DATA_PORT = 5006        # porta para os quais os dados do arquivo vão ser enviados
buf = 1024
file_name = sys.argv[1] # nome do arquivo a ser enviado, obtido via argumento


try:
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # cria um objeto socket utilizando os argumentos AF_INET para
                                                           #   especificar o endereço de família como IPv4 e SOCK_STREAM
                                                           #   para o tipo de protocolo TCP
  sock.connect((TCP_IP, FILE_PORT))                        # conecta o socket ao endereço de ip e porta especificados
  sock.send(file_name)                                     # envia o nome do arquivo
  sock.close()                                             # fecha a conexão 

  print('Sending %s ...' % file_name)

  f = open(file_name, "rb")                                # abre o arquivo a ser enviado no modo de leitura binário
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #  cria um objeto socket utilizando os argumentos AF_INET para
                                                           #   especificar o endereço de família como IPv4 e SOCK_STREAM
                                                           #   para o tipo de protocolo TCP
  sock.connect((TCP_IP, DATA_PORT))                        # conecta o socket ao endereço de ip e porta especificados
  data = f.read()                                          # realiza a leitura do conteúdo do arquivo
  sock.send(data)                                          # envia o conteúdo do arquivo para o outro lado da conexão

finally:
  sock.close() # fecha a conexão
  f.close()    # fecha o arquivo
