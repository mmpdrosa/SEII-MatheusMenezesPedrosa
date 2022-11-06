import socket
import select

UDP_IP = '127.0.0.1' # endereço de ip do host
IN_PORT = 5005       # porta da conexão
timeout = 3          # tempo limite para o bloqueio da execução do código


sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # cria um objeto socket utilizando os argumentos AF_INET para
                                                        #   especificar o endereço de família como IPv4 e SOCK_DGRAM
                                                        #   para o tipo de protocolo UDP
sock.bind((UDP_IP, IN_PORT))                            # associa o socket com o endereço de ip do host e a porta 

while True:
  data, addr = sock.recvfrom(1024) # recebe 1024 bytes de dados do outro lado da conexão
  if data:
    print('File name:', data)      # imprime o nome do arquivo, caso exista
    file_name = data.strip()       # armazena o nome do arquivo, caso exista

  f = open(file_name, 'wb')        # cria um arquivo (caso não exista), desse lado da conexão, com o nome do arquivo 

  while True:
    ready = select.select([sock], [], [], timeout) # bloqueia o código até que um descritor de arquivo esteja pronto
    if ready[0]:
      data, addr = sock.recvfrom(1024)             # recebe 1024 bytes de dados enviados pelo outro lado da conexão                                                   #   limitado por 'buf'
      f.write(data)                                # escreve os dados recebidos no arquivo
    else:
      print('%s Finish!' % file_name)
      f.close()                                    # fecha o arquivo
      break                                        # finaliza o loop
