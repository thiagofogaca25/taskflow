# TaskFlow

Aplicação web para gerenciamento de tarefas, desenvolvida como projeto acadêmico FrontEnd.

## Tecnologias
- HTML5
- CSS3
- JavaScript
- Vite
- Git e GitHub

## Funcionalidades
- Criar tarefas
- Concluir e reabrir tarefas
- Excluir tarefas
- Filtrar por status
- Persistência com localStorage
- Modo claro e escuro
- Navegação por teclado
- Estrutura semântica e recursos de acessibilidade

## Instalação local
1. Clone o repositório.
2. Acesse a pasta do projeto.
3. Instale as dependências com `npm install`.
4. Execute `npm run dev`.
5. Acesse o endereço informado pelo Vite.

## Build de produção
Execute `npm run build`. Os arquivos de produção serão gerados na pasta `dist`.

## Versionamento
O projeto utiliza uma estratégia baseada em GitFlow:
- `main`: versões estáveis.
- `develop`: desenvolvimento contínuo.
- `feature/*`: novas funcionalidades.
- `hotfix/*`: correções urgentes.

Os commits seguem Conventional Commits, como `feat:`, `fix:`, `docs:` e `style:`. As releases utilizam Semantic Versioning.

## Acessibilidade
O projeto utiliza landmarks HTML, labels associados, foco visível, navegação por teclado e atributos ARIA quando necessários. As cores foram escolhidas considerando WCAG 2.1 nível AA.

## Licença
Projeto acadêmico para fins educacionais.
