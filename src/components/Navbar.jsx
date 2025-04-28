export default function NavBar({ onOpen }) {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Usuários</a>
      </div>
      <div className="navbar-center">
        <h1 className="text-lg font-semibold">Teste Fullstack</h1>
      </div>
      <div className="navbar-end">
        <button onClick={onOpen} className="btn btn-primary">
          Add Client
        </button>
      </div>
    </div>
  );
}
