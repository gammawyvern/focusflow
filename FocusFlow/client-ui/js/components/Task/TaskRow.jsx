import React, {useState} from 'react';

import { formatSeconds, formatDate } from "../../utils/taskFormatters";
import { TaskModes } from "../../constants/modes";

const TaskRow = ({ task, onUpdate, onDelete, mode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        secondsLogged: task.secondsLogged,
        isCompleted: task.isCompleted
    });

    const handleEditSave = async () => {
        const updatedDto = {
            ...task,
            ...editData
        };
        
        const response = await fetch(`/api/tasks/${updatedDto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDto)
        });

        if (response.ok) {
            onUpdate(updatedDto);
            setIsEditing(false);
        } else {
            console.error('Failed to update task');
        }
    };
    
    const handleEditCancel = () => {
        setEditData({ ...task });
        setIsEditing(false);
    }
    
    const handleDeleteClick = async () => {
        await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
        onDelete(task.id);
    };

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={editData.isCompleted}
                    disabled={!isEditing}
                    onChange={(e) =>
                        setEditData({ ...editData, isCompleted: e.target.checked })
                    }
                />
            </td>
            <td>
                <input
                    type="text"
                    value={editData.title}
                    disabled={!isEditing}
                    onChange={(e) => 
                        setEditData({ ...editData, title: e.target.value })
                    }
                />
                <textarea
                    value={editData.description}
                    disabled={!isEditing}
                    onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                    }
                />
            </td>
            <td>
                <input
                    type="date"
                    value={editData.dueDate}
                    disabled={!isEditing}
                    onChange={(e) =>
                        setEditData({ ...editData, dueDate: e.target.value })
                    }
                />
            </td>
            <td>
                <input
                    type="number"
                    value={editData.secondsLogged}
                    disabled={!isEditing}
                    onChange={(e) =>
                        setEditData({ ...editData, secondsLogged: Number(e.target.value) })
                    }
                />
            </td>
            <td>
                {mode !== TaskModes.VIEW ? (
                    <></>
                ) : mode === TaskModes.VIEW && isEditing ? (
                    <>
                        <button onClick={handleEditCancel}>Cancel</button>
                        <button onClick={handleEditSave}>Save</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    )
}

export default TaskRow;