export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    const entries =
      JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  delete(user) {
    this.entries = this.entries.filter((entry) => entry.login !== user.login);
    this.update();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");
    this.update();
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".remove").onclick = () => {
        const isOK = confirm("Tem certeza que deseja remover essa linha?");
        if (isOK) {
          this.delete(user);
          this.update();
        }
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="user">
        <img
          src="https://github.com/anacnogueira.png"
          alt="Imagem de Ana Claudia Nogueira"
        />
        <a href="https://github.com/anacnogueira" target="_blank">
          <p>Ana Claudia Nogueira</p>
          <span>anacnogueira</span>
        </a>
      </td>
      <td class="repositories">50</td>
      <td class="followers">100</td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
