import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [filter, setFilter] = useState("all");
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

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const { title, description } = newTodo;
      if (!title) {
        return setError("Title is required");
      }
      const request = await axios.post(
        "http://localhost:8000/api/todo/create-todo",
        newTodo,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(request);
      if (request.data.success) {
        setNewTodo({ title: "", description: "" });
        getTodos();
      }
      setError("");
    } catch (err) {
      return console.log(err.response.data.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const request = await axios.delete(
        `http://localhost:8000/api/todo/delete-todo/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(request.data.message);
      if (request.data.success) {
        getTodos();
      }
    } catch (err) {
      return console.log(err.response.data.message);
    }
  };

  const handleTodoUpdate = async (title, description, id) => {
    setNewTodo({ title, description });
    setUpdate(true);
    setUpdateId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = updateId;
    try {
      const request = await axios.put(
        `http://localhost:8000/api/todo/update-todo/${id}`,
        newTodo,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (request.data.success) {
        setNewTodo({ title: "", description: "" });
        setUpdate(false);
        setUpdateId("");
        getTodos();
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleIsCompleted = async (id) => {
    try {
      const request = await axios.post(
        `http://localhost:8000/api/todo/complete-todo/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Completed : ", request);
      if (request.data.success) {
        getTodos();
      }
    } catch (err) {
      return console.log(err.response.data.message);
    }
  };

  const filteredList = todoList.filter((list) => {
    if (filter === "completed") return list.isCompleted;
    if (filter === "incomplete") return !list.isCompleted;
    return true;
  });
  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between bg-orange-300 px-4 py-3">
        <h1 className="text-3xl font-sans font-bold ml-20 cursor-default">
          Todoist
        </h1>
        {name ? <h1>Welcome back {name}</h1> : ""}
        <button
          onClick={handleLogout}
          className="font-semibold cursor-pointer rounded-md px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Logout
        </button>
      </nav>

      {/* Add Todos */}
      <div className="flex flex-col items-center justify-cente mt-10">
        <form
          onSubmit={update ? handleUpdate : handleAddTodo}
          className="w-1/2 flex flex-col border rounded-2xl shadow border-gray-300 p-4"
        >
          <input
            className="border border-gray-200 shadow px-5 py-2 rounded-lg w-full my-2"
            name="title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Title"
          />
          <input
            className="border border-gray-200 shadow px-5 py-2 rounded-lg w-full my-2"
            name="description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Description"
          />
          {error ? <p className="text-red-500">{error}</p> : ""}
          <button
            type="submit"
            className={`${
              update ? "bg-red-500" : "bg-blue-600"
            } m-auto w-50 border px-4 py-1 rounded-md text-white cursor-pointer font-semibold`}
          >
            {update ? "Update" : "Add"}
          </button>
        </form>

        {/* All Tasks */}
        <div className="w-1/2 mt-10">
          {todoList.length > 0 ?
          <div className="flex justify-between">
            <h1 className="font-semibold">Total Tasks : {todoList.length}</h1>
            <div className="flex gap-2">
              <button
                className={`${filter==='all' ? 'bg-red-500' : 'bg-blue-500' } border px-2  text-white cursor-pointer`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`${filter==='completed' ? 'bg-red-500' : 'bg-blue-500' } border px-2  text-white cursor-pointer`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className={`${filter==='incomplete' ? 'bg-red-500' : 'bg-blue-500' } border px-2  text-white cursor-pointer`}
                onClick={() => setFilter("incomplete")}
              >
                Incomplete
              </button>
            </div>
          </div> : ''}
          {todoList.length > 0 ? (
            filteredList.map((list, index) => {
              return (
                <div
                  key={list._id}
                  className="border border-gray-200 bg-white shadow-md w- flex flex-col p-3 m-3 hover:shadow-xl"
                >
                  <div className="flex justify-between">
                    <p className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        onChange={() => handleIsCompleted(list._id)}
                        checked={list.isCompleted}
                      />
                      {list.title}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleTodoUpdate(
                            list.title,
                            list.description,
                            list._id
                          )
                        }
                        className="border px-2 py-1 rounded bg-blue-600 text-white font-semibold cursor-pointer "
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(list._id)}
                        className="border px-2 py-1 rounded bg-red-600 text-white font-semibold cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div>{list.description}</div>
                </div>
              );
            })
          ) : (
            <p>Tasks Not Found...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
