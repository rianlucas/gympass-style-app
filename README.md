# App

GympPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel se ober o perfil de um usuário logado;
- [x] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas;
- [x] Deve ser possivel o usuario buscar uma academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia só pode ser cadastrado por administradores;

## RNFs (Requisitos funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar pagiandas com 20 items por pagina;
- [ ] O usuario deve ser identificado por um JWT;
