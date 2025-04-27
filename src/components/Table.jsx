export default function Table({ users, handleOpen }) {
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
                <button className="btn btn-secondary">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
