export default function NavBar({ onOpen }) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Usuários</a>
      </div>
      <div className="navbar-center">
        <h1>Teste fullstack</h1>
      </div>
      <div className="navbar-end">
        <button onClick={onOpen} className="btn btn-primary">
          Add Client
        </button>
      </div>
    </div>
  );
}
