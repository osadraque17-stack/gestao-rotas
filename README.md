# Gestão de Rotas

Aplicação para importar planos de rotas a partir de diferentes formatos Excel, normalizar os dados e gerar diferentes layouts de saída para WhatsApp e app.

## Arquitetura

- Importadores independentes: Layout A, B, C, D...
- Modelo central normalizado.
- Registo da versão do importador usado em cada importação.
- Histórico de importações e planos publicados.
- Motor de layouts de saída independente do formato Excel.
- Supabase como backend.
- Next.js como aplicação web.
- Vercel para deploy.

## Regra fundamental

Um novo formato Excel deve ser adicionado como um novo importador, sem alterar o modelo central nem reescrever o restante sistema.

## Estado atual

A fundação técnica foi criada. O parser real do Layout A será implementado usando o Excel de referência fornecido pelo utilizador.
