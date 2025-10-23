<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Sistema de Cadastro de Leads</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2 {
      color: #2c3e50;
    }
    code {
      background-color: #ecf0f1;
      padding: 2px 5px;
      border-radius: 4px;
    }
    pre {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
    }
    ul {
      margin: 10px 0 10px 20px;
    }
    .note {
      background-color: #dff9fb;
      border-left: 4px solid #00a8ff;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>Sistema de Cadastro de Leads</h1>

  <p>Este projeto é um sistema para <strong>gerenciar Leads</strong>.</p>

  <ul>
    <li>Ao cadastrar um novo Lead, o usuário é redirecionado automaticamente para uma conversa no WhatsApp.</li>
    <li>O sistema possui uma tela de <strong>visualização de Leads cadastrados</strong>, onde é possível:
      <ul>
        <li>Alterar o status dos Leads</li>
        <li>Buscar Leads</li>
        <li>Entrar em contato com os Leads</li>
      </ul>
    </li>
  </ul>

  <h2>🚀 Rodando o projeto com Docker</h2>

  <ol>
    <li>Certifique-se de que o <strong>Docker</strong> e o <strong>Docker Compose</strong> estão instalados na sua máquina.</li>
    <li>No terminal, na raiz do projeto, execute:</li>
  </ol>

  <pre><code>docker compose up --build</code></pre>

  <div class="note">
    <p>Esse comando irá:</p>
    <ul>
      <li>Construir as imagens do projeto</li>
      <li>Subir os containers da API, do frontend e do banco de dados</li>
      <li>Criar automaticamente o banco e as tabelas necessárias</li>
    </ul>
  </div>

  <p>Acesse a aplicação no navegador:</p>
  <ul>
    <li>Frontend: <code>http://localhost:3000</code></li>
    <li>API: <code>http://localhost:3030</code></li>
  </ul>

  <h2>🗂 Estrutura do Docker Compose</h2>
  <ul>
    <li><strong>db</strong> → Container do PostgreSQL</li>
    <li><strong>api</strong> → Container da API Node.js com Prisma</li>
    <li><strong>web</strong> → Container do frontend (Next.js)</li>
  </ul>

</body>
</html>
