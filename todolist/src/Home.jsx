import React, { useState } from 'react';
import './Home.css';

export default function Home() {
    const [todoList, setTodoList] = useState([]);
    const [formData, setFormData] = useState({
        tname: '',
        tcheck: false,
        index: ''
    });

    const saveData = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveTodoList = (event) => {
        event.preventDefault();
        const trimmedName = formData.tname.trim();
        if (trimmedName === '') {
            alert("Task name cannot be empty.");
            return;
        }

        const newData = {
            tname: trimmedName,
            tcheck: false
        };

        if (formData.index !== '') {
            const updatedList = [...todoList];
            updatedList[formData.index].tname = trimmedName;
            setTodoList(updatedList);
        } else {
            const isDuplicate = todoList.some(
                item => item.tname.toLowerCase() === trimmedName.toLowerCase()
            );
            if (isDuplicate) {
                alert("This task is already in the list.");
                return;
            }
            setTodoList([...todoList, newData]);
        }

        setFormData({
            tname: '',
            tcheck: false,
            index: ''
        });
    };

    const deleteRow = (indexToDelete) => {
        const updatedData = todoList.filter((_, index) => index !== indexToDelete);
        setTodoList(updatedData);
    };

    const editRow = (indexToEdit) => {
        const selectedTask = todoList[indexToEdit];
        setFormData({
            tname: selectedTask.tname,
            tcheck: selectedTask.tcheck,
            index: indexToEdit
        });
    };

    const toggleCheckbox = (index) => {
        const updatedList = [...todoList];
        updatedList[index].tcheck = !updatedList[index].tcheck;
        setTodoList(updatedList);
    };

    return (
        <div className="container">
            <form onSubmit={saveTodoList} className="form">
                <input
                    type="text"
                    name="tname"
                    value={formData.tname}
                    placeholder="Enter task"
                    onChange={saveData}
                    className="input"
                />
                <button type="submit" className={formData.index !== '' ? "btn btn-warning" : "btn btn-primary"}>
                    {formData.index !== '' ? 'Update' : 'Save'}
                </button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>#</th>
                        <th>Task</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.length > 0 ? (
                        todoList.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td style={{ textDecoration: value.tcheck ? 'line-through' : 'none' }}>
                                    {value.tname}
                                </td>
                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        checked={value.tcheck}
                                        onChange={() => toggleCheckbox(index)}
                                    />
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-info" onClick={() => editRow(index)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteRow(index)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No Tasks Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
