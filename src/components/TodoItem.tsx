/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  editHandler: (todoId: number, newTitle: string) => void,
  onEditing: (itemId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
  onEditing,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const setNewTodoTitle = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        editHandler(todo.id, editedTitle);
        onEditing(-1);
        setEditing(false);
      }

      if (event.key === 'Escape') {
        setEditedTitle(todo.title);
        setEditing(false);
      }
    }, [editedTitle, editing],
  );

  return (
    <>
      <li
        className={classNames({
          completed: todo.completed,
          editing,
          'view-2': todo.title !== editedTitle,
        })}
        onDoubleClick={() => setEditing(!editing)}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            onClick={() => completeHandler(todo.id)}
            onChange={() => {}}
            checked={todo.completed}
          />
          <label>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteHandler(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={event => {
            setEditedTitle(event.target.value);
          }}
          onKeyDown={setNewTodoTitle}
        />
      </li>
    </>
  );
};