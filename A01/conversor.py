#Método que recebe um valor numérico natural e uma base para conversão:
def decimal_to_base(number, base):
  rest = "0123456789ABCDEF" #Variável para guardar o valor dos restos, cada posição indica um valor para resto
  result = "" #Por poder resultar em um valor que possui letras, o resultado será computado como uma string que passará por uma série de concatenações

  while number > 0:
    result = rest[number%base] + result #Realiza as divisões e "captura" os restos, concatenando-os à string de resultado
    number = number // base #O valor do número recebido será atualizado para o quociente (inteiro) da iteração

  return result

#Método que recebe um valor em uma base b e realiza a conversão para a base decimal:
def base_to_decimal(number, base):
  rest = "0123456789ABCDEF" #Variável para guardar o valor dos restos, cada posição indica um valor para resto
  result = 0 #Diferente da questão anterior, o retorno será um valor composto apenas por números, então ele não precisa ser tipado como string

  index = len(number) - 1 #O index inicial (bit/byte) menos significativo se encontra ao final da string, o -1 é apenas uma correção tendo em vista que a primeira posição é 0 e a última é a tamanho-1
  expoente = 0 #expoente inicial das operações, é 0 por começar do bit/byte menos significativo e vai sendo incrementado ao longo da execução

  while index >= 0: #Enquanto não passarmos por todos os bits/bytes (que na estratégia adotada, termina na primeira posição), a ideração deve ser executada
    result = result + rest.find(number[index])*(base**expoente) #Identificamos qual valor numérico corresponde ao caractere na posição index (utilizando a variável de restos) e realizamos a exponenciação
    expoente = expoente + 1 #Incrementamos o expoente para a próxima iteração
    index = index - 1 #Decrementamos o índice para a próxima iteração

  return result

#Método que recebe um número em uma base A e converte para uma outra base B:
#A estratégia adotada foi a de converter da base A para a base decimal e depois da base decimal para a base B, utilizando as funções construídas nas questões anteriores:
def baseA_to_baseB (number, baseA, baseB):
  return(decimal_to_base(base_to_decimal(str(number),baseA),baseB))


#PROGRAMA PRINCIPAL________________________________________________________________:
print("Seja bem-vindo(a)! Escolha uma operação (digite o número correspondente):")
print("1 - (Questão 4) Converter de uma base B para a base decimal")
print("2 - (Questão 5) Converter da base decimal para uma base B")
print("3 - (Questão 6) Converter entre bases variadas")
resp = int(input("Digite a opção: "))
while resp < 1 or resp > 3:
  print("OPÇÃO INEXISTENTE!")
  resp = int(input("Digite a opção: "))

print()

if resp == 1:
  number = str(input("Digite um valor: "))
  
  base_origin = int(input("Digite a base de origem (2 a 16): "))
  while base_origin < 2 or base_origin > 16:
    print("BASE INVÁLIDA!!!")
    base_origin = int(input("Digite a base de origem (2 a 16): "))
  
  print(f"O resultado na base decimal é: {base_to_decimal(number, base_origin)}")

elif resp == 2:
  number = int(input("Digite um valor: "))

  base_destiny= int(input("Digite a base de destino (2 a 16): "))
  while base_destiny < 2 or base_destiny > 16:
    print("BASE INVÁLIDA!!!")
    base_destiny = int(input("Digite a base de destino (2 a 16): "))
  
  print(f"O resultado na base decimal é: {decimal_to_base(number, base_destiny)}")

else:
  number = int(input("Digite um valor: "))
  
  base_origin = int(input("Digite a base de origem (2 a 16): "))
  while base_origin < 2 or base_origin > 16:
    print("BASE INVÁLIDA!!!")
    base_origin = int(input("Digite a base de origem (2 a 16): "))

  base_destiny= int(input("Digite a base de destino (2 a 16): "))
  while base_destiny < 2 or base_origin > 16:
    print("BASE INVÁLIDA!!!")
    base_destiny = int(input("Digite a base de destino (2 a 16): "))
  
  print(f"O resultado na base {base_destiny} é: {baseA_to_baseB(number, base_origin, base_destiny)}")