import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [title, setTitle] = useState(todo.title);

  //edit description function

  const updateIssue = async e => {
    e.preventDefault();
    try {
      const body = { title, description };
      await fetch(`http://localhost:8000/issues/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Update
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Update Issue Details</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>


            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateIssue(e)}
              >
                Update
              </button>

              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(todo.description);
                  setTitle(todo.title);
                }}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
