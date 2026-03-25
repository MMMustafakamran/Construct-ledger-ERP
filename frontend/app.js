const API_BASE_URL = "http://localhost:4000/api";

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function buildAppShell() {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <h1>Barebones Accounting</h1>
          <p>Foundation Build</p>
        </div>
        <nav>
          <a class="active" href="#dashboard">Dashboard</a>
          <a href="#accounts">Accounts</a>
          <a href="#transactions">Transactions</a>
        </nav>
      </aside>

      <main class="content">
        <header class="hero">
          <div>
            <p class="eyebrow">Initial implementation</p>
            <h2>Accounting core foundation</h2>
            <p class="subtitle">
              This first slice wires the frontend to a simple accounting API and shows the core
              ledger concepts the client can build on next.
            </p>
          </div>
        </header>

        <div id="status"></div>

        <section id="dashboard" class="section">
          <h3>Dashboard summary</h3>
          <div class="stat-grid">
            <div class="stat-card"><span>Receivables</span><strong id="receivables">$0</strong></div>
            <div class="stat-card"><span>Payables</span><strong id="payables">$0</strong></div>
            <div class="stat-card"><span>Cash Balance</span><strong id="cashBalance">$0</strong></div>
            <div class="stat-card"><span>Transactions</span><strong id="transactionsCount">0</strong></div>
          </div>
        </section>

        <section id="accounts" class="section">
          <div class="section-header">
            <h3>Chart of accounts foundation</h3>
            <span id="accountsCount">0 accounts</span>
          </div>
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody id="accountsBody"></tbody>
            </table>
          </div>
        </section>

        <section id="transactions" class="section">
          <div class="section-header">
            <h3>Recent transactions</h3>
            <span id="transactionsSeeded">0 seeded</span>
          </div>
          <div class="transaction-list" id="transactionList"></div>
        </section>
      </main>
    </div>
  `;
}

function transactionCard(transaction) {
  const lines = transaction.lines
    .map(
      (line) => `
        <tr>
          <td>${line.accountId}</td>
          <td>${formatAmount(line.debitAmount)}</td>
          <td>${formatAmount(line.creditAmount)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <article class="card">
      <div class="transaction-header">
        <div>
          <h4>${transaction.description}</h4>
          <p>${transaction.referenceNumber} • ${new Date(transaction.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>${lines}</tbody>
      </table>
    </article>
  `;
}

async function render() {
  const app = document.querySelector("#app");
  app.innerHTML = buildAppShell();

  try {
    const [dashboardResponse, accountsResponse, transactionsResponse] = await Promise.all([
      fetchJson("/dashboard"),
      fetchJson("/accounts"),
      fetchJson("/transactions")
    ]);

    const dashboard = dashboardResponse.data;
    const accounts = accountsResponse.data;
    const transactions = transactionsResponse.data;

    document.querySelector("#receivables").textContent = formatAmount(dashboard.receivables);
    document.querySelector("#payables").textContent = formatAmount(dashboard.payables);
    document.querySelector("#cashBalance").textContent = formatAmount(dashboard.cashBalance);
    document.querySelector("#transactionsCount").textContent = dashboard.totalTransactions;
    document.querySelector("#accountsCount").textContent = `${accounts.length} accounts`;
    document.querySelector("#transactionsSeeded").textContent = `${transactions.length} seeded`;

    document.querySelector("#accountsBody").innerHTML = accounts
      .map(
        (account) => `
          <tr>
            <td>${account.code}</td>
            <td>${account.name}</td>
            <td>${account.category}</td>
            <td>${account.status}</td>
            <td>${formatAmount(account.balance)}</td>
          </tr>
        `
      )
      .join("");

    document.querySelector("#transactionList").innerHTML = transactions
      .map(transactionCard)
      .join("");
  } catch (error) {
    document.querySelector("#status").innerHTML = `
      <div class="error-card">
        ${error instanceof Error ? error.message : "Failed to load data."}
      </div>
    `;
  }
}

render();

