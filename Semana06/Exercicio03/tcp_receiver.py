import socket

TCP_IP = '127.0.0.1' # endereço de ip do host
FILE_PORT = 5005     # porta para o qual o nome do arquivo vai ser recebido
DATA_PORT = 5006     # porta para os quais os dados do arquivo vão ser recebidos
timeout = 3
buf = 1024           # quantidade máxima de bytes a serem recebidos por vez


sock_f = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # cria um objeto socket utilizando os argumentos AF_INET para
                                                           #   especificar o endereço de família como IPv4 e SOCK_STREAM
                                                           #   para o tipo de protocolo TCP
sock_f.bind((TCP_IP, FILE_PORT))                           # associa o socket com o endereço de ip do host e a porta 
                                                           #   definida para o nome do arquivo
sock_f.listen(1)                                           # habilita o socket para aceitar conexões

sock_d = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # cria um objeto socket utilizando os argumentos AF_INET para
                                                           #   especificar o endereço de família como IPv4 e SOCK_STREAM
                                                           #   para o tipo de protocolo TCP
sock_d.bind((TCP_IP, DATA_PORT))                           # associa o socket com o endereço de ip do host e a porta 
                                                           #   definida para os dados do arquivo
sock_d.listen(1)                                           # habilita o socket para aceitar conexões


while True:
  conn, addr = sock_f.accept() # bloqueia a execução do código até que a conexão esteja estabelecida e retorna um novo 
                               #   objeto socket usado para enviar e receber dados juntamente ao endereço vinculado ao 
                               #   socket do outro lado da conexão
  data = conn.recv(buf)        # recebe qualquer dado enviado do outro lado da conexão armazenando em uma variável, 
                               #   limitado por 'buf'
  if data:
    print('File name:', data)  # imprime o nome do arquivo recebido, caso exista
    file_name = data.strip()   # armazena o nome do arquivo recebido em uma variável, caso exista

  f = open(file_name, 'wb')    # cria um arquivo (caso não exista), desse lado da conexão, com o nome do arquivo 
                               #   recebido no modo de escrita binário

  conn, addr = sock_d.accept() # bloqueia a execução do código até que a conexão esteja estabelecida e retorna um novo 
                               #   objeto socket usado para enviar e receber dados juntamente ao endereço vinculado ao 
                               #   socket do outro lado da conexão
  while True:
    data = conn.recv(buf)      # recebe qualquer dado enviado do outro lado da conexão armazenando em uma variável, 
                               #   limitado por 'buf'
    if not data:               
      break                    # quebra o laço caso não exista mais dados a serem recebidos
    f.write(data)              # escreve os dados recebidos no arquivo a cada loop

  print('%s Finish!' % file_name)
  f.close()                       # fecha o arquivo
