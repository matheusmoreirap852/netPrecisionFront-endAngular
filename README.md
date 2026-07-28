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

O projeto foi organizado com componentes standalone e uma camada de servico/facade para separar responsabilidades:

- `core/models`: contratos usados pela tela e pela API.
- `core/services`: comunicacao HTTP com o back-end via `TaskService`.
- `core/tokens`: configuracao injetavel da URL da API.
- `tasks/services`: `TaskFacade`, responsavel pelo estado da tela e orquestracao dos casos de uso.
- `tasks/pages`: pagina container `TaskPageComponent`.
- `tasks/components`: componentes de apresentacao (`TaskForm`, `TaskSummary` e `TaskList`).
- `environments`: URLs da API para desenvolvimento e build de producao.

Fluxo da tela:

```text
App -> TaskPageComponent -> TaskFacade -> TaskService -> API Spring Boot
```

Essa organizacao deixa o componente principal limpo, facilita manutencao e mostra separacao entre UI, estado e comunicacao HTTP.

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

## Docker

Build da imagem:

```bash
docker build -t netprecision-task-manager-web .
```

Rodar o container:

```bash
docker run --rm -p 4200:80 --name netprecision-task-manager-web netprecision-task-manager-web
```

Tambem e possivel usar Docker Compose:

```bash
docker compose up --build -d
```

A aplicacao ficara disponivel em:

```text
http://localhost:4200
```

Para parar:

```bash
docker compose down
```

## Testes

```bash
npm test
```

## Observacao sobre Node

Para ambientes de CI/CD e apresentacao, prefira uma versao LTS suportada pelo Angular usado no projeto.
