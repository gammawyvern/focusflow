import React, { useEffect, useState } from 'react';

import { formatSeconds, formatDate } from "../../utils/taskFormatters";
import { TaskModes } from "../../constants/modes";

const TaskRow = ({ task, onUpdate, onDelete, mode }) => {
    const [isSelfEditing, setIsSelfEditing] = useState(false);
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
            setIsSelfEditing(false);
        } else {
            console.error('Failed to update task');
        }
    };
    
    const handleEditCancel = () => {
        setEditData({ ...task });
        setIsSelfEditing(false);
    }
    
    const handleDelete = async () => {
        await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
        onDelete(task.id);
    };

    useEffect(() => {
        if (mode !== TaskModes.VIEW && isSelfEditing) {
            setIsSelfEditing(false);
        }
        
        if (mode !== TaskModes.EDIT) {
            setEditData({ ...task });
        }
    }, [mode]);

    const isEditable = mode === TaskModes.EDIT || isSelfEditing;

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={editData.isCompleted}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setEditData({ ...editData, isCompleted: e.target.checked })
                    }
                />
            </td>
            <td>
                <input
                    type="text"
                    value={editData.title}
                    disabled={!isEditable}
                    onChange={(e) => 
                        setEditData({ ...editData, title: e.target.value })
                    }
                />
                <textarea
                    value={editData.description}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                    }
                />
            </td>
            <td>
                <input
                    type="date"
                    value={editData.dueDate}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setEditData({ ...editData, dueDate: e.target.value })
                    }
                />
            </td>
            <td>
                <input
                    type="number"
                    value={editData.secondsLogged}
                    disabled={!isEditable}
                    onChange={(e) =>
                        setEditData({ ...editData, secondsLogged: Number(e.target.value) })
                    }
                />
            </td>
            <td>
                {mode === TaskModes.VIEW && isSelfEditing ? (
                    <>
                        <button onClick={handleEditSave} className="accent-1">Confirm</button>
                        <button onClick={handleEditCancel} className="accent-2">Cancel</button>
                    </>
                ) : mode === TaskModes.VIEW && !isSelfEditing ? (
                    <>
                        <button onClick={() => setIsSelfEditing(true)} className="accent-3">Edit</button>
                        <button onClick={handleDelete} className="accent-2">Delete</button>
                    </>
                ) : (
                    <></>
                )}
            </td>
        </tr>
    )
}

export default TaskRow;