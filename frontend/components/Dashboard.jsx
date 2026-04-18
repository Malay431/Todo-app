import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/todo/list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response);
      setName(response.data.user);
      setTodoList(response.data.todoList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <h1>Todoist</h1>
      {name ? <h1>Welcome back {name}</h1> : ""}
      <button onClick={handleLogout}>Logout</button>

      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
      <tbody>
        {todoList.length > 0
        ? todoList.map((list, index) => {
            return (
              <tr key={list._id}>
                <td>{index + 1}</td>
                <td>{list.title}</td>
                <td>{list.description}</td>
              </tr>
            );
          })
        : "No Tasks Found"}
      </tbody>
        </table>
    </div>
  );
};

export default Dashboard;
