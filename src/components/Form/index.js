import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './Form.scss';

export default function Form({ handleSubmit, handleInputChange, newTask }) {
  return (
    <form action="#" onSubmit={handleSubmit} className="form">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Nova Tarefa"
        value={newTask}
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};
