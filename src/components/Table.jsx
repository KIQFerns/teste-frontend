import { deleteUser } from "../services/userService";

export default function Table({ users, handleOpen, setUsers }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Você deseja realmente excluir esse usuário?"
    );
    if (confirmDelete) {
      try {
        await deleteUser(id);
        setUsers((prevData) => prevData.filter((client) => client.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="hover">
          {users.map((user) => (
            <tr key={user.id} className="hover">
              <th></th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-primary "
                  onClick={() => handleOpen("update", user)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
