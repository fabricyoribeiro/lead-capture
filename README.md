
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
