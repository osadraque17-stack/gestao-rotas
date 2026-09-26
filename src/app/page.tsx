import { importerRegistry } from "@/lib/importers/registry";

export default function Home() {
  const importadores = importerRegistry.list();

  return (
    <main className="container">
      <header className="hero">
        <span className="eyebrow">GESTÃO DE ROTAS</span>
        <h1>Base do sistema criada.</h1>
        <p>
          A aplicação está preparada para receber vários formatos de Excel,
          normalizá-los e gerar diferentes layouts de saída.
        </p>
      </header>

      <section className="card">
        <h2>Importadores disponíveis</h2>
        <div className="grid">
          {importadores.map((item) => (
            <article key={item.id} className="importer">
              <strong>{item.name}</strong>
              <span>{item.id}</span>
              <small>{item.description}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}