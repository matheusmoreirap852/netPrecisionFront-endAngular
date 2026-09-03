# GitHub Pages

Este frontend Angular pode ser publicado como portfólio estático no GitHub Pages.

## Ativar no GitHub

1. Envie os arquivos para a branch `main`.
2. Acesse o repositório `netPrecisionFront-endAngular`.
3. Entre em **Settings > Pages**.
4. Em **Build and deployment**, selecione **GitHub Actions**.
5. Entre na aba **Actions**.
6. Execute o workflow **Deploy Frontend to GitHub Pages**.

Depois do deploy, a URL esperada será:

```text
https://matheusmoreirap852.github.io/netPrecisionFront-endAngular/
```

## Limitação

O GitHub Pages hospeda somente o Angular estático. Login, cadastro, tarefas e mensagens precisam de uma API publicada em outro lugar, como EC2.
