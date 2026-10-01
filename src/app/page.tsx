"use client";

import { useMemo, useState } from "react";

type Driver = { code: string; name: string; vehicle: string; zone: string; stops: number; status: "Publicado" | "Por validar" | "Sem plano" };

const demoDrivers: Driver[] = [
  { code: "M-001", name: "Miguel Santos", vehicle: "V-104", zone: "Lisboa Norte", stops: 18, status: "Publicado" },
  { code: "M-002", name: "Ana Ferreira", vehicle: "V-208", zone: "Vila Franca", stops: 14, status: "Publicado" },
  { code: "M-003", name: "Rui Costa", vehicle: "V-117", zone: "Lisboa Centro", stops: 22, status: "Por validar" },
  { code: "M-004", name: "João Martins", vehicle: "V-302", zone: "Loures", stops: 16, status: "Publicado" },
  { code: "M-005", name: "Carla Ribeiro", vehicle: "V-221", zone: "Alverca", stops: 0, status: "Sem plano" },
  { code: "M-006", name: "Pedro Oliveira", vehicle: "V-109", zone: "Lisboa Norte", stops: 11, status: "Publicado" },
];

const navItems = [
  { id: "Visão geral", icon: "◫" },
  { id: "Planos diários", icon: "▤" },
  { id: "Motoristas", icon: "♙" },
  { id: "Viaturas", icon: "▰" },
  { id: "Importar Excel", icon: "↑" },
  { id: "Mensagens", icon: "◉" },
];

export default function Home() {
  const [section, setSection] = useState("Visão geral");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [showImportInfo, setShowImportInfo] = useState(false);

  const filteredDrivers = useMemo(() => demoDrivers.filter((driver) => {
    const matchesSearch = [driver.name, driver.code, driver.vehicle, driver.zone].join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Todos" || driver.status === filter;
    return matchesSearch && matchesFilter;
  }), [search, filter]);

  const sectionTitle = section === "Visão geral" ? "Visão geral" : section;
  const sectionDescription: Record<string, string> = {
    "Visão geral": "Acompanhe os planos e a operação diária num só lugar.",
    "Planos diários": "Consulte os planos de distribuição por data e estado.",
    "Motoristas": "Lista de motoristas de demonstração.",
    "Viaturas": "Viaturas fictícias associadas aos planos.",
    "Importar Excel": "Importe um ficheiro e valide os dados antes de publicar.",
    "Mensagens": "Área de preparação das mensagens. O WhatsApp ainda não está ligado.",
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">GR</div>
          <div><strong>Gestão de Rotas</strong><span>Painel operacional</span></div>
        </div>
        <div className="workspace-label">ESPAÇO DE TRABALHO</div>
        <nav className="nav-list" aria-label="Navegação principal">
          {navItems.map((item) => (
            <button key={item.id} className={section === item.id ? "nav-item active" : "nav-item"} onClick={() => setSection(item.id)}>
              <span className="nav-icon">{item.icon}</span>{item.id}
              {item.id === "Mensagens" && <span className="nav-soon">Teste</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-note"><span className="demo-dot" />Modo demonstração<strong>Dados fictícios</strong><p>Nenhum dado real da empresa está a ser utilizado.</p></div>
          <div className="profile"><div className="avatar">SO</div><div><strong>Administrador</strong><span>Ambiente de teste</span></div><span className="profile-menu">•••</span></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Gestão de Rotas <span>/</span> <strong>{section}</strong></div>
          <div className="top-actions"><span className="environment-pill"><span /> Ambiente de teste</span><button className="icon-button" aria-label="Notificações">♧</button><div className="avatar small">SO</div></div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><div className="date-label">QUINTA-FEIRA, 1 DE OUTUBRO DE 2026</div><h1>{sectionTitle}</h1><p>{sectionDescription[section]}</p></div>
            <button className="primary-button" onClick={() => { setSection("Importar Excel"); setShowImportInfo(true); }}><span>＋</span> Nova importação</button>
          </div>

          {section === "Importar Excel" ? (
            <div className="panel import-panel">
              <div className="upload-symbol">↑</div><h2>Importar plano de rotas</h2><p>Esta área está preparada para receber ficheiros Excel. O importador real será implementado e testado com um ficheiro de referência autorizado.</p>
              <div className="upload-drop"><strong>Importação Excel ainda não ativada</strong><span>Formatos previstos: .xlsx e .xlsm</span><small>Os dados serão validados antes de qualquer publicação.</small></div>
              {showImportInfo && <div className="info-banner">Modo de demonstração: nenhum ficheiro será enviado ou processado nesta versão.</div>}
              <button className="secondary-button" onClick={() => setShowImportInfo(!showImportInfo)}>{showImportInfo ? "Ocultar informação" : "Como funciona a importação?"}</button>
            </div>
          ) : section === "Mensagens" ? (
            <div className="panel empty-panel"><div className="empty-icon">◉</div><h2>WhatsApp ainda não ligado</h2><p>Podemos preparar os modelos de mensagem e o histórico nesta fase. A ligação à API oficial será configurada mais tarde, com um número dedicado.</p><span className="status-badge warning">Integração pendente</span></div>
          ) : section === "Viaturas" ? (
            <div className="panel"><div className="panel-heading"><div><h2>Viaturas de demonstração</h2><p>Dados fictícios para validar o funcionamento do painel.</p></div><span className="count-pill">6 viaturas</span></div><div className="vehicle-grid">{["V-104","V-208","V-117","V-302","V-221","V-109"].map((v, i) => <article className="vehicle-card" key={v}><div className="vehicle-icon">▰</div><div><strong>{v}</strong><span>{["Distribuição ligeira","Carrinha","Distribuição ligeira","Pesada","Carrinha","Distribuição ligeira"][i]}</span></div><span className="vehicle-status">Ativa</span></article>)}</div></div>
          ) : (
            <>
              <div className="stats-grid">
                <article className="stat-card"><div className="stat-top"><span>Motoristas</span><span className="stat-icon blue">♙</span></div><div className="stat-value">200</div><div className="stat-foot"><span className="stat-neutral">●</span> Registos fictícios previstos</div></article>
                <article className="stat-card"><div className="stat-top"><span>Planos preparados</span><span className="stat-icon violet">▤</span></div><div className="stat-value">184 <small>/ 200</small></div><div className="stat-foot"><span className="stat-positive">↗ 92%</span> da operação planeada</div></article>
                <article className="stat-card"><div className="stat-top"><span>Por validar</span><span className="stat-icon amber">◷</span></div><div className="stat-value">12</div><div className="stat-foot"><span className="stat-warning">●</span> Aguardam revisão</div></article>
                <article className="stat-card"><div className="stat-top"><span>Sem plano</span><span className="stat-icon rose">!</span></div><div className="stat-value">4</div><div className="stat-foot">Requerem atenção</div></article>
              </div>
              <div className="content-grid">
                <section className="panel drivers-panel">
                  <div className="panel-heading"><div><h2>{section === "Motoristas" ? "Motoristas" : "Estado dos planos"}</h2><p>Resumo dos planos para hoje</p></div><button className="text-button" onClick={() => setSection("Motoristas")}>Ver motoristas <span>→</span></button></div>
                  <div className="table-tools"><label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar motorista, código..." /></label><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filtrar por estado"><option>Todos</option><option>Publicado</option><option>Por validar</option><option>Sem plano</option></select></div>
                  <div className="table-wrap"><table><thead><tr><th>MOTORISTA</th><th>VIATURA</th><th>ZONA</th><th>ENTREGAS</th><th>ESTADO</th></tr></thead><tbody>{filteredDrivers.map((driver) => <tr key={driver.code}><td><div className="driver-cell"><div className="driver-avatar">{driver.name.split(" ").map(n => n[0]).slice(0,2).join("")}</div><div><strong>{driver.name}</strong><span>{driver.code}</span></div></div></td><td>{driver.vehicle}</td><td>{driver.zone}</td><td>{driver.stops || "—"}</td><td><span className={"status-badge " + (driver.status === "Publicado" ? "success" : driver.status === "Por validar" ? "warning" : "muted")}><i />{driver.status}</span></td></tr>)}</tbody></table>{filteredDrivers.length === 0 && <div className="no-results">Não foram encontrados motoristas.</div>}</div>
                  <div className="table-footer">A mostrar {filteredDrivers.length} de 6 registos de demonstração <span>Dados de exemplo</span></div>
                </section>
                <aside className="panel activity-panel"><div className="panel-heading"><div><h2>Atividade recente</h2><p>Eventos de demonstração</p></div><span className="activity-dots">•••</span></div><div className="activity-list"><div className="activity-item"><span className="activity-marker green">✓</span><div><strong>Plano publicado</strong><p>Plano de Miguel Santos preparado para consulta.</p><small>Hoje, 08:42</small></div></div><div className="activity-item"><span className="activity-marker amber">↻</span><div><strong>Importação por validar</strong><p>Um plano aguarda revisão do administrador.</p><small>Hoje, 08:16</small></div></div><div className="activity-item"><span className="activity-marker blue">＋</span><div><strong>Ambiente de teste criado</strong><p>Os dados apresentados são fictícios.</p><small>Hoje, 07:55</small></div></div></div><div className="activity-footer"><span className="demo-dot" />Sem ligação ao WhatsApp</div></aside>
              </div>
              <div className="bottom-banner"><div className="banner-icon">✳</div><div><strong>Próximo passo: ligar os dados reais de teste</strong><p>Vamos preparar o esquema da base de dados e substituir gradualmente os dados de demonstração por registos de teste no Supabase.</p></div><button onClick={() => setSection("Importar Excel")}>Ver importação <span>→</span></button></div>
            </>
          )}
          <footer className="page-footer"><span>Gestão de Rotas <b>·</b> Versão de demonstração</span><span>Portugal <b>·</b> Europe/Lisbon</span></footer>
        </div>
      </section>
    </main>
  );
}
