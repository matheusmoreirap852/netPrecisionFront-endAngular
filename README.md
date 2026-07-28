# NetPrecision Front-end Angular

Front-end Angular para consumir a API Task Manager desenvolvida em Spring Boot.

## Stack

- Angular
- TypeScript
- Signals
- FormsModule
- HttpClient
- CSS responsivo

## Arquitetura

O projeto foi iniciado de forma simples, mas separado por responsabilidade:

- `core/models`: contratos usados pela tela e pela API.
- `core/services`: comunicacao HTTP com o back-end.
- `app`: componente principal, formulario, listagem e estado da tela.

Essa organizacao facilita a leitura do teste: a tela nao conhece detalhes de HTTP alem do `TaskService`, e o service concentra os endpoints do back-end.

## Funcionalidades

- Listar tarefas.
- Criar tarefa.
- Marcar tarefa como concluida ou pendente.
- Excluir tarefa.
- Exibir resumo de total, pendentes e concluidas.
- Tratar erro quando a API nao estiver disponivel.

## Integracao com o back-end

Por padrao, o front chama:

```text
http://localhost:8082/api/tasks
```

Antes de iniciar o Angular, suba a API:

```bash
cd ../TesteJava2
API_PORT=8082 docker compose up --build -d
```

Swagger da API:

```text
http://localhost:8082/swagger-ui.html
```

## Como rodar

Instale as dependencias:

```bash
npm install
```

Inicie o Angular:

```bash
npm start
```

A aplicacao ficara disponivel em:

```text
http://localhost:4200
```

## Build

```bash
npm run build
```

## Testes

```bash
npm test
```

## Observacao sobre Node

Para ambientes de CI/CD e apresentacao, prefira uma versao LTS suportada pelo Angular usado no projeto.
