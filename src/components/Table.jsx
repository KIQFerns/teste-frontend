export default function Table({ users, onOpen }) {
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
          {users.map((item) => (
            <tr key={item.id} className="hover">
              <th></th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.active ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-primary " onClick={onOpen}>
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
